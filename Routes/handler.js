const sql = require("mssql");

exports.route = function (req,res) {
    
    
    let urlArr = req.url.toLowerCase().split("/");
    urlArr.shift();

    if(urlArr[0] == "get") {
        switch(urlArr[1]) {
            case "mt": require("./MachineToken/handler").route(req,res); break;
            case "ad": require("./ActiveDirectory/handler").route(req,res); break;
            case "apps": require("./Applications/handler").route(req,res); break;
            default: res.sendStatus(404);
        }
    }
    else if (urlArr[0] == "post") {
        switch(urlArr[1]) {
            case "apps": require("./Applications/handler").route(req,res); break;
        }
    }
    else res.sendStatus(404);
}