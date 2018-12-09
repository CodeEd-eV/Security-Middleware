

exports.route = (req, res) => {
    if (req.url.includes("/ad/login")) {
        require("./login").act(req,res);
    }
    else if (req.url.includes("/ad/callback")) {
        require("./callback").act(req,res);
    }
    else if (req.url.includes("/ad/validate")) {
        require("./validate").act(req,res);
    }
    else if (req.url.includes("ad/profile")) {
        require("./profile").act(req,res);
    }
}