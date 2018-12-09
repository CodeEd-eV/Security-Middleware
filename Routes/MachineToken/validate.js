const jwt = require("jsonwebtoken");

exports.act = (req,res) => {
    const token = req.query.token;
    if(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const resp = {
                from: decoded.appId,
                to: decoded.targetId,
                permission: decoded.permission
            }
                res.status(200).send(resp);
        }
        catch(err) {
            console.log(err);
            res.status(500).send("JWTDecodingError");
        }
    }
    else res.status(403).send("NoTokenProvided");
    
}