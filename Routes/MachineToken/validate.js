const jwt = require("jsonwebtoken");

exports.act = (req,res) => {
    const token = req.query.jwt;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const resp = {
            issuer: decoded.appId,
            recipient: decoded.targetId,
            permission: decoded.permission
        }
            res.send(resp);
    }
    catch(err) {
        res.sendStatus(403);
    }
}