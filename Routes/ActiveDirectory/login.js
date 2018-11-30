const util = require("./../../util");

exports.act = (req,res) => {
    res.send(util.createLoginLink(req.query.cb));

}