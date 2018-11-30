const request = require("request");

exports.act = (req, res) => {
    const jwt = req.query.token;

    if (!jwt) {
        res.sendStatus(403);
    }
    else {
        const options = {
            method: 'GET',
            url: 'https://graph.microsoft.com/v1.0/me',
            headers:
            {
                'cache-control': 'no-cache',
                Authorization: 'Bearer '+jwt,
                'Content-Type': 'application/json'
            }
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            body = JSON.parse(body);
            const profile = {
                "id": body.id,
                "name": body.givenName
            }
            res.send(profile);
        });

    }
}