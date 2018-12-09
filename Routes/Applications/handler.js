exports.route = (req,res) => {
    console.log(req.query)
        if(req.url.includes("apps/register")) {
            require("./registerForm").act(req,res);
        }
        else if(req.url.includes("apps/new")) {
            require("./store").act(req,res);
        }
        else if(req.url.includes("apps/approve")) {
            require("./approve").act(req,res);
        }
        else if(req.url.includes("apps/view")) {
            require("./view").act(req,res);
        }
        else res.sendStatus(404);

}