const request = require("request");

const refreshToken = "xVWzTY4D6QuzyORWksSdiBrRHBuvO2x-35OT2cjjbgalo";

const options = {
  method: "POST",
  url: "https://dev-vhjl4amz310prjx7.us.auth0.com/oauth/token",
  headers: {
    "content-type": "application/x-www-form-urlencoded",
  },
  form: {
    grant_type: "refresh_token",
    client_id: "cSMzSml5SCuJjXc1wCeTr2iuyLmBm9Kv",
    client_secret:
      "OEVrzG8LF4ybNG6d7GV7nuOBoBscwNIZNDXn-6RMtah2KjFZQWj8whvp_4Q3doLu",
    refresh_token: refreshToken,
    scope: "update:users"
  },
};

request(options, (error, response, body) => {
  if (error) throw new Error(error);

  console.log(body);
});
