const jwt = require("jsonwebtoken");

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

    //Just for Demo purposes
    const key = 
"-----BEGIN CERTIFICATE-----\ntVKUtcx_n9rt5afY_2WFNvU6PlFMggCatsZ3l4RjKxH0jgdLq6CScb0P3ZGXYbPz\nXvmmLiWZizpb-h0qup5jznOvOr-Dhw9908584BSgC83YacjWNqEK3urxhyE2jWjw\nRm2N95WGgb5mzE5XmZIvkvyXnn7X8dvgFPF5QwIngGsDG8LyHuJWlaDhr_EPLMW4\nwHvH0zZCuRMARIJmmqiMy3VD4ftq4nS5s8vJL0pVSrkuNojtokp84AtkADCDU_BU\nhrc2sIgfnvZ03koCQRoZmWiHu86SuJZYkDFstVTVSR0hiXudFlfQ2rOhPlpObmku\n68lXw-7V-P7jwrQRFfQVXw\n-----END CERTIFICATE-----";
    if(!token || !key) {
        res.sendStatus(403);
        return;
    }
    console.log(key);
    const decToken = jwt.decode(token);
    
    jwt.verify(token,key, {algorithms: ["RS256"]} , (err,dec) => {
        if(err) {
            console.log("Err:"+err);
            res.send(err);
        } 
        else {
            console.log("Answer");
            res.send(dec);
        } 
    })
}