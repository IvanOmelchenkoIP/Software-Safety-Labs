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
    BASE_URL: "https://kpi.eu.auth0.com",
    TOKEN_URL: "/oauth/token",
    AUDIENCE_URL: "/api/v2/",
    CLIENT_ID: "JIvCO5c2IBHlAe2patn6l6q5H35qxti0",
    CLIENT_SECRET: "ZRF8Op0tWM36p1_hxXTU-B0K_Gq_-eAVtlrQpY24CasYiDmcXBhNS6IJMNcz1EgB",
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
    const url = req.originalUrl;
    if (url == '/') {
        const redirectUrl = `https://kpi.eu.auth0.com/authorize?client_id=${AUTH0_CONFIG.CLIENT_ID}&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=code&response_mode=query`
        res.redirect(redirectUrl);
    } else {
        req.session.code = url.split("code=")[1];
        res.sendFile(path.join(__dirname+'/index.html'));
    }
});

app.get('/logout', (req, res) => {
    const logoutUrl = "https://kpi.eu.auth0.com/v2/logout?";
    sessions.destroy(req, res);
    res.redirect(logoutUrl);;
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
