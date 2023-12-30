const request = require("request");

const token =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlBVODZwZTdRWUtRcGE1d3JjcXBhaSJ9.eyJpc3MiOiJodHRwczovL2Rldi12aGpsNGFtejMxMHByang3LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJjU016U21sNVNDdUpqWGMxd0NlVHIyaXV5TG1CbTlLdkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYtdmhqbDRhbXozMTBwcmp4Ny51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTcwMzk1NjUwOSwiZXhwIjoxNzA0MDQyOTA5LCJhenAiOiJjU016U21sNVNDdUpqWGMxd0NlVHIyaXV5TG1CbTlLdiIsInNjb3BlIjoicmVhZDpjbGllbnRfZ3JhbnRzIGNyZWF0ZTpjbGllbnRfZ3JhbnRzIGRlbGV0ZTpjbGllbnRfZ3JhbnRzIHVwZGF0ZTpjbGllbnRfZ3JhbnRzIHJlYWQ6dXNlcnMgdXBkYXRlOnVzZXJzIGRlbGV0ZTp1c2VycyBjcmVhdGU6dXNlcnMgcmVhZDp1c2Vyc19hcHBfbWV0YWRhdGEgdXBkYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBkZWxldGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgcmVhZDpjbGllbnRzIHVwZGF0ZTpjbGllbnRzIGRlbGV0ZTpjbGllbnRzIGNyZWF0ZTpjbGllbnRzIHJlYWQ6Y2xpZW50X2tleXMgdXBkYXRlOmNsaWVudF9rZXlzIGRlbGV0ZTpjbGllbnRfa2V5cyBjcmVhdGU6Y2xpZW50X2tleXMgcmVhZDpyZWZyZXNoX3Rva2VucyBkZWxldGU6cmVmcmVzaF90b2tlbnMgcmVhZDpjbGllbnRfY3JlZGVudGlhbHMgY3JlYXRlOmNsaWVudF9jcmVkZW50aWFscyB1cGRhdGU6Y2xpZW50X2NyZWRlbnRpYWxzIGRlbGV0ZTpjbGllbnRfY3JlZGVudGlhbHMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.BpxIQjDreNvz75HlgMmH7okkcx7U5lZi-Ey2o9Hg8b6Fh0HwL49l993SyFlf1HOiXcpupF5rkIiSly2Wj_xDbh3irXTkgx8o8Wgx26AoVV3xB1NgGF1AjpJQDpaQUggWrcVTNnZo34SgC-8rR7yrg6ZLbi5AHr5EtXG9Z7y24kSWk2HLsff9d_PwShL2NncMblfEBbp1kSLM-257yNpIW6sdQmD9yV79Po1YMOIfzUsptvZ3uyTrVqEHxEwzas0OiTgx7K4-cG1WuzgUjM4rtqQGVvABc6vVYh3z6jNQv-tFfsqqbmTO9y61fki85Fc6Swrey90hLxdNZbd58XaCGQ";

const options = {
  method: "POST",
  url: "https://dev-vhjl4amz310prjx7.us.auth0.com/api/v2/users",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  },
  body: JSON.stringify({
    email: "user@example.com",
    blocked: false,
    email_verified: false,
    given_name: "Name",
    family_name: "Surname",
    name: "User",
    user_id: "1",
    connection: "Username-Password-Authentication",
    password: "Password123456789",
    verify_email: false,
  }),
};

request(options, (error, response, body) => {
  if (error) throw new Error(error);

  console.log(body);
});
