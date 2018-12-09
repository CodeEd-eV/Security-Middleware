const request = require("request");
const util = require("../../util");

exports.act = async (req, res) => {
  const jwt = req.query.token;

  if (!jwt || !util.validateJWT(jwt)) {
    res.redirect(util.createLoginLink(req.protocol + '://' + req.get('host') + req.originalUrl));
  }
  else {
    const options = {
      method: 'GET',
      url: 'https://graph.microsoft.com/v1.0/me',
      headers:
      {
        'cache-control': 'no-cache',
        Authorization: 'Bearer ' + jwt,
        'Content-Type': 'application/json'
      }
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      body = JSON.parse(body);
      console.log(body);
      res.send(body);
    });
  }
}