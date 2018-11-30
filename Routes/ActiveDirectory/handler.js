var stateCache = {};

exports.route = (req, res) => {
    if (req.url.includes("/ad/login")) {
        require("./login").act(req,res,stateCache);
    }
    else if (req.url.includes("/ad/callback")) {
        require("./callback").act(req,res,stateCache);
    }
    else if (req.url.includes("/ad/verify")) {
        require("./validate").act(req,res);
    }
}