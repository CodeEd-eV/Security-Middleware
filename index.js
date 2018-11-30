const express = require("express");
const bodyParser = require("body-parser");
const router = require("./Routes/handler");
const app = express();
require('dotenv').config();

//TODO: Validate AAD tokens

app.set("view engine", "ejs");
app.set("views", __dirname + "/Pages");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req,res) => {
    router.route(req,res);
});

app.listen(process.env.PORT || 3000);