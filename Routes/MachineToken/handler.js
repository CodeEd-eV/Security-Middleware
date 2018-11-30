exports.route = (req,res) => {
    if (req.url.includes("/mt/new")) {
        require("./new").act(req,res);
    }
    else if (req.url.includes("/mt/validate")) {
        require("./validate").act(req,res);
    }
}