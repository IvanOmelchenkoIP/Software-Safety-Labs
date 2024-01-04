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

const AUTH0_CONFIG = {
    BASE_URL: "https://dev-vhjl4amz310prjx7.us.auth0.com",
    TOKEN_URL: "/oauth/token",
    AUDIENCE_URL: "/api/v2/",
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
    if (req.session.username) {
        return res.json({
            username: req.session.username,
            logout: 'http://localhost:3000/logout'
        })
    }
    res.sendFile(path.join(__dirname+'/index.html'));
})

app.get('/logout', (req, res) => {
    sessions.destroy(req, res);
    res.redirect('/');
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
          client_id: AUTH0_CONFIG.CLIENT_ID,
          client_secret: AUTH0_CONFIG.CLIENT_SECRET,
        },
    };

    request(options, (error, response, body) => {
        if (error) {
            res.status(401).send();
        } else {
            const bodyParsed = JSON.parse(body);
            const bodyError = bodyParsed["error"];
            if (bodyError) res.status(401).send();
            req.session.username = login;
            req.session.access_token = bodyParsed["access_token"];
            res.json({ token: req.sessionId });
        }
    }); 
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
