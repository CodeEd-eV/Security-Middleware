const util = require("./../../util");

exports.act = (req,res) => {
    /*
    Theoretic way:
        Decode Token
        Get kid
        Get https://login.microsoftonline.com/common/discovery/keys
        Take key that accords to the kid of the token
        Verify token with key
        Send user response
    */
    const token = req.query.token;

    if(util.validateJWT(token)) res.sendStatus(200);
    else res.sendStatus(403);
}