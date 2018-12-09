const crypto = require("crypto");
const jwt = require("jsonwebtoken");

var stateCache = {};

function createId() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 20; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

exports.createId = createId;

exports.createHash = (appId) => {
  return crypto.createHash("sha256").update("secret" + appId).digest('hex');
}

exports.dataBaseSettings = () => {
  return settings = {
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_SECRET,
    server: process.env.DATABASE_URL,
    database: "Applications",
    options: {
      encrypt: true // Use this if you're on Windows Azure
    }
  };
}

exports.decodeJWT = token => {
  if(validateJWT(token)) return jwt.decode(token);
  else return false;
}

exports.validateJWT = token => {
  return validateJWT(token);
}

exports.getStateUrl = state => {
  const cbUrl = stateCache[state];
  delete stateCache[state];
  return cbUrl;
}

exports.createLoginLink = (cb) => {
  const state = createId();

  stateCache[state] = cb;
  return "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=" + process.env.CLIENT_ID + "&response_type=code&redirect_uri="+process.env.BASE_URL+"/GET/ad/callback&response_mode=query&state=" + state + "&scope=user.read offline_access";
}

function validateJWT(token) {
  const jwtToken = jwt.decode(token);
  if(
    jwtToken.iss == "https://sts.windows.net/84c31ca0-ac3b-4eae-ad11-519d80233e6f/" &&
    jwtToken.app_displayname == "CodeEd User Authentication" &&
    jwtToken.appid == "02b94afd-99a6-4167-a39a-f7f06a2f410f"
  ) return true;
  else return false;
}