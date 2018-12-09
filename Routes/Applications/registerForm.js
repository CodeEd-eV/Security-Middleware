const sql = require("mssql");
const util = require("../../util");

exports.act = (req, res) => {
    sql.close();
    const token = req.query.token;
    if(token && util.validateJWT(token)) {
        const settings = util.dataBaseSettings();

        sql.connect(settings).then(pool => {
            return pool.request()
                .query('select * from apps')
        }).then(result => {
            sql.close();

            const apps = []

            for (var i = 0; i < result.recordset.length; i++) {
                apps.push(result.recordset[i].ClearName);
            }

            res.render("registerApp", {
                apps: apps
            });

        })
    }
    else res.redirect(util.createLoginLink(req.protocol + '://' + req.get('host') + req.originalUrl));
}