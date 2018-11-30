const util = require("../../util");

exports.act = (req,res,stateCache) => {
    const state = util.createId();
    const cb = "http://localhost:3000/GET/ad/callback";

    stateCache[state] = cb;
    res.redirect("https://login.microsoftonline.com/codeed.onmicrosoft.com/oauth2/v2.0/authorize?client_id=" + process.env.CLIENT_ID + "&response_type=code&redirect_uri=http://localhost:3000/GET/ad/callback&response_mode=query&state=" + state+"&scope=user.read offline_access");
}