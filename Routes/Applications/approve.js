const sql = require("mssql");
const util = require("../../util");

exports.act = (req,res) => {
    const token = req.query.token;
    
    if(token && util.validateJWT(token)) {
        const from = req.query.from;
        const to = req.query.to;
        const settings = util.dataBaseSettings();
        sql.connect(settings).then(pool => {
            return pool.request()
                .query("UPDATE permissions SET approved=1 WHERE toId='"+to+"' AND fromId='"+from+"'")
        }).then(result => {
            sql.close();
            res.status(200).send("Successful");
        })
    }
    else {
        res.redirect(util.createLoginLink(req.protocol + '://' + req.get('host') + req.originalUrl));
    }

}