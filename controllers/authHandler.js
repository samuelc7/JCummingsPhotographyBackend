const {google} = require("googleapis");
const dotenv = require("dotenv");
dotenv.config();

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
    res.writeHead(301, { "Location" : "http://localhost:3000/home"}).end();
}

module.exports = authHandler