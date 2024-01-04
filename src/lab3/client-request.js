const request = require("request");

const options = {
  method: "POST",
  url: "https://dev-vhjl4amz310prjx7.us.auth0.com/oauth/token",
  headers: {
    "content-type": "application/x-www-form-urlencoded",
  },
  form: {
    grant_type: "password",
    username: "user@example.com",
    password: "Password123456789",
    audience: "https://dev-vhjl4amz310prjx7.us.auth0.com/api/v2/",
    //scope: "offline_access",
    client_id: "cSMzSml5SCuJjXc1wCeTr2iuyLmBm9Kv",
    client_secret:
      "OEVrzG8LF4ybNG6d7GV7nuOBoBscwNIZNDXn-6RMtah2KjFZQWj8whvp_4Q3doLu",
  },
};

request(options, (error, response, body) => {
  if (error) throw new Error(error);

  console.log(body);
});
