const util = require("../../util");
const jwt = require("jsonwebtoken");

exports.act = (req,res) => {
    const payload = {
        iss: "CodeEd Security Server",
        sub: "Middleware Authentication token",
        iat: Date.now(),
        appId: "34532234",
        targetId: "112563124",
        permission: "r"
    };
    const encryption = util.createHash(payload.appId);
    const token = jwt.sign(payload,
    process.env.JWT_SECRET);
    console.log(encryption);    
    res.send(token);
}