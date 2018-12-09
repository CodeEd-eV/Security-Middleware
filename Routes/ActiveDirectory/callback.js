const request = require("request");
const util = require("../../util");

exports.act = (req,res) => {
    const code = req.query.code;
    console.log(code);
        if (!code) {
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
                redirect_uri: process.env.BASE_URL+'/GET/ad/callback',
                client_id: process.env.CLIENT_ID
            }
        };

        request(options, function (error, response, body) {         
            const state = req.query.state;
            if (error) throw new Error(error);
            const json = JSON.parse(body);
            const cbUrl = util.getStateUrl(state);
            if(json.error) res.redirect(403,cbUrl + "?error="+json.error);
            else {
                if(cbUrl.includes("?")) res.redirect(cbUrl + "&token=" + json.access_token);
                else res.redirect(cbUrl + "?token=" + json.access_token);
            }
        });
}