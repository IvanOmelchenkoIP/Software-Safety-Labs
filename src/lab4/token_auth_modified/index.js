const uuid = require('uuid');
const express = require('express');
const onFinished = require('on-finished');
const bodyParser = require('body-parser');
const path = require('path');
const port = 3000;
const fs = require('fs');
const request = require('request');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const SESSION_KEY = 'Authorization';
let TOKEN = null;

const FIVE_MINUTES = 5 * 60 * 1000;

const AUTH0_CONFIG = {
    BASE_URL: "https://dev-vhjl4amz310prjx7.us.auth0.com",
    TOKEN_URL: "/oauth/token",
    AUDIENCE_URL: "/api/v2/",
    USERS_URL: "users",
    CLIENT_ID: "cSMzSml5SCuJjXc1wCeTr2iuyLmBm9Kv",
    CLIENT_SECRET: "OEVrzG8LF4ybNG6d7GV7nuOBoBscwNIZNDXn-6RMtah2KjFZQWj8whvp_4Q3doLu",
}

class Session {
    #sessions = {}

    constructor() {
        try {
            this.#sessions = fs.readFileSync('./sessions.json', 'utf8');
            this.#sessions = JSON.parse(this.#sessions.trim());

            console.log(this.#sessions);
        } catch(e) {
            this.#sessions = {};
        }
    }

    #storeSessions() {
        fs.writeFileSync('./sessions.json', JSON.stringify(this.#sessions), 'utf-8');
    }

    set(key, value) {
        if (!value) {
            value = {};
        }
        this.#sessions[key] = value;
        this.#storeSessions();
    }

    get(key) {
        return this.#sessions[key];
    }

    init(res) {
        const sessionId = uuid.v4();
        this.set(sessionId);

        return sessionId;
    }

    destroy(req, res) {
        const sessionId = req.sessionId;
        delete this.#sessions[sessionId];
        this.#storeSessions();
    }
}

const sessions = new Session();

app.use((req, res, next) => {
    let currentSession = {};
    let sessionId = req.get(SESSION_KEY);

    if (sessionId) {
        currentSession = sessions.get(sessionId);
        if (!currentSession) {
            currentSession = {};
            sessionId = sessions.init(res);
        }
    } else {
        sessionId = sessions.init(res);
    }

    req.session = currentSession;
    req.sessionId = sessionId;

    onFinished(req, () => {
        const currentSession = req.session;
        const sessionId = req.sessionId;
        sessions.set(sessionId, currentSession);
    });

    next();
});

app.get('/', (req, res) => {
    const login = req.session.username;
    if (login) {
        const payload = req.session.access_token.toString().split(".")[1];
        const payloadParsed = JSON.parse(atob(payload));
        const expireTime = Number(payloadParsed["exp"]);
        const timeNow = new Date().getTime();
        const fiveMinsFromNow = timeNow + FIVE_MINUTES;
        const fiveMinutesPriorToExpire = expireTime - FIVE_MINUTES
        if (expireTime <= timeNow) {
            return res.json({
                username: login,
                expired: true,
                refresh: false,
            });
        }
        if (fiveMinutesPriorToExpire <= fiveMinsFromNow) {
            return res.json({
                username: login,
                expired: false,
                refresh: true,
            });
        }
        return res.json({
            username: login,
            expired: false,
            refresh: false,
        });
    }
    res.sendFile(path.join(__dirname+'/index.html'));
})

app.get('/logout', (req, res) => {
    sessions.destroy(req, res);
    res.redirect('/');
});

app.post('/refresh', (req, res) => {
    const options = {
        method: "POST",
        url: "https://dev-vhjl4amz310prjx7.us.auth0.com/oauth/token",
        headers: {
            "content-type": "application/x-www-form-urlencoded",
        },
        form: {
            grant_type: "refresh_token",
            client_id: AUTH0_CONFIG.CLIENT_ID,
            client_secret: AUTH0_CONFIG.CLIENT_SECRET,
            refresh_token: req.session.refresh_token,
            scope: "update:users"
        }
    }

    request(options, (error, response, body) => {
        if (error) {
            res.status(401).send();
            return;
        } else {
            const bodyParsed = JSON.parse(body);
            const bodyError = bodyParsed["error"];
            if (bodyError) {
                res.status(401).send();
                return;
            } else {
                const accessToken = bodyParsed["access_token"];
                req.session.access_token = accessToken;
                res.status(200).send();
            }
        }
    });
});


app.post('/api/login', (req, res) => {
    const { login, password } = req.body;

    const options = {
        method: "POST",
        url: AUTH0_CONFIG.BASE_URL + AUTH0_CONFIG.TOKEN_URL,
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        form: {
          grant_type: "password",
          username: login,
          password: password,
          audience: AUTH0_CONFIG.BASE_URL + AUTH0_CONFIG.AUDIENCE_URL,
          scope: "offline_access",
          client_id: AUTH0_CONFIG.CLIENT_ID,
          client_secret: AUTH0_CONFIG.CLIENT_SECRET,
        },
    };

    request(options, (error, response, body) => {
        if (error) {
            res.status(401).send();
            return;
        } else {
            const bodyParsed = JSON.parse(body);
            const bodyError = bodyParsed["error"];
            if (bodyError) {
                res.status(401).send();
                return;
            } else {
                req.session.username = login;
                req.session.access_token = bodyParsed["access_token"];
                req.session.refresh_token = bodyParsed["refresh_token"];
                res.json({ token: req.sessionId });
            }
        }
    }); 
});

app.post('/api/register', (req, res) => {
    const { email, login, password } = req.body;
    const id = uuid.v4();
    
    const options = {
        method: "POST",
        url: AUTH0_CONFIG.BASE_URL + AUTH0_CONFIG.AUDIENCE_URL + AUTH0_CONFIG.USERS_URL,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + TOKEN,
        },
        body: JSON.stringify({
            email: email,
            blocked: false,
            email_verified: false,
            name: login,
            user_id: id,
            connection: "Username-Password-Authentication",
            password: password,
            verify_email: false,
        }),
    };

    request(options, (error, response, body) => {
        if (error) {
            console.log(error);
            res.status(401).send();
            return;
        } else {
            const bodyParsed = JSON.parse(body);
            const bodyError = bodyParsed["error"];
            if (bodyError) {
                res.status(401).send();
                return;
            } else {
                res.json({ login: email, password: password });
            }
        }
    });
})

app.listen(port, () => {
    const options = {
        method: "POST",
        url: AUTH0_CONFIG.BASE_URL + AUTH0_CONFIG.TOKEN_URL,
        headers: { "content-type": "application/x-www-form-urlencoded" },
        form: {
          client_id: AUTH0_CONFIG.CLIENT_ID,
          client_secret: AUTH0_CONFIG.CLIENT_SECRET,
          audience: AUTH0_CONFIG.BASE_URL + AUTH0_CONFIG.AUDIENCE_URL,
          grant_type: "client_credentials",
        },
    };
    request(options, (error, response, body) => {
        if (error) throw new Error(error);

        const bodyParsed = JSON.parse(body);
        const bodyError = bodyParsed["error"];
        if (bodyError) throw new Error(bodyError);
        TOKEN = bodyParsed["access_token"];
    });
    console.log(`Example app listening on port ${port}`)
})
