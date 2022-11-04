const {google} = require("googleapis");
const jwt = require("jsonwebtoken");
const DBConnection = require("../DB/Connection");
const middleWare = require("../middleware/index");

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
);

// Uses the given auth code to retrieve the access token
const authHandler = async (req, res) => {
    let code = req["query"]["code"];
    let { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    const user = await middleWare.hasCredentials(tokens.access_token);
    if (user) {
        res.sendFile("/static/home.html", {"root": "./"});
    } else {
        console.log("Not verified user");
    }
}

module.exports = authHandler;