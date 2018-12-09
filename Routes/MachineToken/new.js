const util = require("../../util");
const sql = require("mssql");
const jwt = require("jsonwebtoken");

exports.act = (req, res) => {
    const requester = req.query.from;
    const respondent = req.query.to;
    if(requester && respondent) {
        const settings = util.dataBaseSettings();
    sql.connect(settings).then(pool => {
        return pool.request()
            .input("fromId", requester)
            .input("toId", respondent)
            .query('SELECT permission FROM permissions WHERE fromId=@fromId AND toId=@toId AND approved=1')
    }).then(result => {
        sql.close();
        if (result.recordset.length == 0) {
            res.status(403).send("NoPermissionFound");
        }
        else if (result.recordset.length > 1) {
            res.status(403).send("MultipleRecordsFound");
        }
        else {
            const permission = result.recordset[0].permission;
            const payload = {
                iss: "CodeEd Security Server",
                sub: "Middleware Authentication token",
                iat: Date.now(),
                appId: requester,
                targetId: respondent,
                permission: permission
            };
            const token = jwt.sign(payload,
                process.env.JWT_SECRET);
            res.status(200).send(token);
        }
    })
    }
    else {
        res.sendStatus(403);
    }

    
}