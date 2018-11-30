const express = require("express");
const bodyParser = require("body-parser");
const router = require("./Routes/handler");
const app = express();
require('dotenv').config();

//TODO: Validate
//TODO: Refresh token

//TODO: Wir brauchen AppID zur Validierung
//TODO: Get Profile

app.set("view engine", "ejs");
app.set("views", __dirname + "/Pages");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req,res) => {
    router.route(req,res);
});
/*

app.get("/GET/user", (req,res) => {
    const code = req.query.bearer;
    if(!code) {
        res.sendStatus(403);
    }
    else {
        request.get("https://graph.microsoft.com/v1.0/me").auth(null,null,true,code)
        .on("response", (resp) => {
            res.send(resp);
        })
    }
})
*/

app.listen(process.env.PORT || 3000);