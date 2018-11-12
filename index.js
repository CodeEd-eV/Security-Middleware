const express = require("express");
const app = express();
const request = require("request");
require('dotenv').config();

//TODO: Validate
//TODO: Refresh token

var stateCache = {};

app.get("/", (req, res) => {
    const state = createId();

    stateCache[state] = req.query.cb;
    res.send("https://login.microsoftonline.com/codeed.onmicrosoft.com/oauth2/authorize?client_id="+process.env.CLIENT_ID+"&response_type=code&redirect_uri=http://localhost:3000/callback&response_mode=query&state="+state);
});
app.get("/callback", (req, res) => {
    const code = req.query.code;
    console.log(code);
    console.log(!code);
    if(!code) {
        res.send(req.query);
        return;
    }

    var options = {
        method: 'POST',
        url: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
        form:
        {
            grant_type: 'authorization_code',
            code: code,
            client_secret: process.env.CLIENT_SECRET,
            redirect_uri: 'http://localhost:3000/callback',
            client_id: process.env.CLIENT_ID,
            scope: 'user.read'
        }
    };

    request(options, function (error, response, body) {
        const state = req.query.state;
        if (error) throw new Error(error);
        const json = JSON.parse(body);
        console.log(body);
        const cbUrl = stateCache[state];
        res.redirect(cbUrl+"?token="+json.access_token);
    });
})

function createId() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 20; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

app.listen(process.env.PORT || 3000);