const sql = require("mssql");
const util = require("../../util");

exports.act = (req, res) => {
    const token = req.query.token;
    if(token && util.validateJWT(token)) {
        const settings = util.dataBaseSettings();
        const user = util.decodeJWT(token).oid;
        console.log(user);

        sql.connect(settings).then(pool => {
            return pool.request()
                .query("SELECT p.permission, p.approved, a.ClearName AS FromApp, a2.ClearName AS ToApp, a.ID AS FromId, a2.ID AS ToId FROM permissions p LEFT JOIN apps a on p.fromId = a.ID LEFT JOIN apps a2 on p.toId = a2.ID WHERE a.Owner='"+user+"' OR a2.Owner='"+user+"'")
        }).then(result => {
            sql.close();
            result.recordset.forEach(el => {
                el.approved = JSON.parse(JSON.stringify(el.approved)).data[0];
            });
            var perms = result.recordset;
            sql.connect(settings).then(pool => {
                return pool.request().query("SELECT * FROM apps WHERE Owner='"+user+"'").then(result => {
                    sql.close();
                    var apps = result.recordset;
                    apps.forEach(el => {
                        el.received = [];
                        el.granted = [];
                        perms.forEach(e => {
                            if(el.ID == e.FromId) {
                                el.granted.push([e.ToApp, e.permission, e.approved,e.ToId])
                            }
                            else if(el.ID == e.ToId) {
                                el.received.push([e.FromApp, e.permission, e.approved,e.FromId])
                            }
                        })
                    })
                    console.log(apps[0].granted);

                    res.render("viewApps", {
                        apps: apps
                    });
                })

        })
    })
}
    else res.redirect(util.createLoginLink(req.protocol + '://' + req.get('host') + req.originalUrl));
}