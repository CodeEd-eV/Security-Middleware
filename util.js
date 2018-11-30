const crypto = require("crypto");
const jwt = require("jsonwebtoken");

exports.createId = () => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 20; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

exports.createHash = (appId) => {
    return crypto.createHash("sha256").update("secret"+appId).digest('hex');
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
  return jwt.decode(token);
}