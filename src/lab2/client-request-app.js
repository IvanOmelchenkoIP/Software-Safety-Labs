const request = require("request");

const options = {
  method: "POST",
  url: "https://dev-vhjl4amz310prjx7.us.auth0.com/oauth/token",
  headers: { "content-type": "application/x-www-form-urlencoded" },
  form: {
    client_id: "cSMzSml5SCuJjXc1wCeTr2iuyLmBm9Kv",
    client_secret:
      "OEVrzG8LF4ybNG6d7GV7nuOBoBscwNIZNDXn-6RMtah2KjFZQWj8whvp_4Q3doLu",
    audience: "https://dev-vhjl4amz310prjx7.us.auth0.com/api/v2/",
    grant_type: "client_credentials",
  },
};

request(options, (error, response, body) => {
  if (error) throw new Error(error);

  console.log(body);
});
