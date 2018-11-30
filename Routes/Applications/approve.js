const sql = require("mssql");
const util = require("../../util");

exports.act = (req,res) => {
    const token = req.query.token;
    
    if(token) {
        const from = req.query.from;
        const to = req.query.to;
        const settings = util.dataBaseSettings();
        sql.connect(settings).then(pool => {
            return pool.request()
                .query("UPDATE permissions SET p.approved=1 WHERE toId='"+to+"' AND fromId='"+from+"'")//TODO Update database on right spot
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

}