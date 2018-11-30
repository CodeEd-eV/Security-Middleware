const sql = require("mssql");
const util = require("../../util");

exports.act = (req, res) => {
    const settings = util.dataBaseSettings();
    if (req.query.appName != "") {
        let applications = [];
        sql.connect(settings).then(pool => {
            return pool.request()
                .query('SELECT * FROM apps')
        }).then(result => {
            sql.close();
            result.recordset.forEach(element => {
                applications.push(
                    {
                        name: element.ClearName,
                        ID: element.ID
                    })
            });

            let appId = util.createId();
            const user = req.query.userId;
            const appName = req.query.appName;
            applications.forEach(el => {
                if (el.name == appName) {
                    res.send("Duplicate!");
                    console.log("Dodged a duplicate bullet here");
                }
            })
            appId = checkId("9HPKUXpS3Y6DQ8ipHS2H", applications);

            var permissionStringArray = req.query.perms.split("],[");
            permissionStringArray[0] = permissionStringArray[0].substring(1, permissionStringArray[0].length);
            permissionStringArray[permissionStringArray.length - 1] = permissionStringArray[permissionStringArray.length - 1].substring(0, permissionStringArray[permissionStringArray.length - 1].length - 1);

            var permissions = [];
            permissionStringArray.forEach(el => {
                var splitArr = el.split(",");
                splitArr[1] == "true" ? splitArr[1] = 1 : splitArr[1] = 0;
                splitArr[2] == "true" ? splitArr[2] = 1 : splitArr[2] = 0;
                permissions.push(splitArr);
            })

            var sqlPermissions = [];
            var permSqlString = "";

            permissions.forEach(el => {
                var perm = "";
                if (el[1] == 1 && el[2] == 1) perm = "rw";
                else if (el[1] == 1) perm = "r";
                else perm = "w";

                var permSqlArr = [appId, el[0], perm, 0];
                applications.forEach(el => {
                    if (el.name == permSqlArr[1])
                        permSqlArr[1] = el.ID;
                })
                permSqlString += "('" + permSqlArr[0] + "','" + permSqlArr[1] + "','" + permSqlArr[2] + "'," + permSqlArr[3] + "),"; sqlPermissions.push(permSqlArr);
            })
            permSqlString = permSqlString.substring(0, permSqlString.length - 1);
            sql.connect(settings).then(pool => {
                return pool.request()
                    .input('appName', sql.VarChar, appName)
                    .input('appId', sql.VarChar, appId)
                    .input('user', sql.VarChar, user)
                    .query('INSERT INTO apps(ID,Owner,ClearName) VALUES(@appId,@user,@appName)')
            }).then(result => {
                sql.close();
                sql.connect(settings).then(pool => {
                    return pool.request()
                        .query("INSERT INTO permissions(fromId,toId,permission,approved) VALUES " + permSqlString)
                }).then(result => {
                    sql.close();
                    res.sendStatus(200);
                    //TODO: Send E-Mails to App Owners
                    //TODO: Encrypt from and to adress
                })
            })

        })
    }
    else res.send("Error");
}

function checkId(generatedId, apps) {
    for (var i = 0; i < apps.length; i++) {
        if (generatedId == apps[i].ID) {
            const newId = util.createId();
            return checkId(newId, apps);
        }
    }

    return generatedId;

}