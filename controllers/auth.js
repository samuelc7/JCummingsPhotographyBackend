const {google} = require("googleapis");
const dotenv = require("dotenv");
dotenv.config();

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
);

const scopes = ["https://www.googleapis.com/auth/userinfo.profile"]

// Generate url that asks permissions
const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    include_granted_scopes: true
});

const response = (req, res) => {
    res.writeHead(301, { "Location" : authorizationUrl }).end();
}

module.exports = response;