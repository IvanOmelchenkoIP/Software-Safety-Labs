const request = require("request");
const dotenv = require('dotenv');

dotenv.config();

const token =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjVCZTlBZFhrMERaUjhmR1dZYjdkViJ9.eyJpc3MiOiJodHRwczovL2twaS5ldS5hdXRoMC5jb20vIiwic3ViIjoiSkl2Q081YzJJQkhsQWUycGF0bjZsNnE1SDM1cXh0aTBAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8va3BpLmV1LmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNzA0NzUwOTExLCJleHAiOjE3MDQ4MzczMTEsImF6cCI6IkpJdkNPNWMySUJIbEFlMnBhdG42bDZxNUgzNXF4dGkwIiwic2NvcGUiOiJyZWFkOnVzZXJzIGNyZWF0ZTp1c2VycyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.B3R80fPcPER84Oc4AlfpgH2OkfgtrBp_dN1DRdHsfA93hlrU8quMHtR51OP0vhXk8aKawhzQDI2N0W4u-kxcQmXd2QJ15d0an-nkJs52xfQij7oDnVuCmmZkpvC0tc39g4T1aGU1wnDVji7A20vXVWrDrPkfo577uEY8Gr4hAj65_wZtgzDmIi-OZOSijdDkE5uUSRlxa-i0MG3SRreEC_nFzMfUL1q3tqOwRCv0kGr-nUqfA5_7RHUJUT-ZzdYUrDkqXWeGczxoLK4NYI-jPDCxtQk7WTLeq4Be61R5bhaKbSXkWeSlPtK62_ag4K_QsvmDnxkrVh9Jlm6EOhrkgg";

const options = {
  method: "POST",
  url: "https://kpi.eu.auth0.com/api/v2/users",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  },
  body: JSON.stringify({
    email: `${process.env.EMAIL}`,
    blocked: false,
    email_verified: false,
    given_name: "Ivan-IP04-User1",
    family_name: "Omelchenko-IP04-User1",
    name: "IvanOmelchenkoIP04Usr1",
    user_id: "675b59c5-a2ce-41b3-88f3-f289d4983d2c",
    connection: "Username-Password-Authentication",
    password: "Password123456789",
    verify_email: false,
  }),
};

request(options, (error, response, body) => {
  if (error) throw new Error(error);

  console.log(body);
});