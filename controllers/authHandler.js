const fetch = require("node-fetch");
const {google} = require("googleapis");
const jwt = require("jsonwebtoken");
const DBConnection = require("../DB/Connection");
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
    const user = await login(tokens.access_token);
    if (user) {
        res.sendFile("/static/home.html", {"root": "./"});
    } else {
        console.log("Not verified user");
    }
}

const login = async (token) => {
    const response = await fetch(process.env.GOOGLE_PEOPLE_ENDPOINT, {
        headers: { Authorization: `Bearer ${token}`}
    });
    const authUserInfo = await response.json();
    return await findOrCreateUser(authUserInfo);
}

const findOrCreateUser = async (authUserInfo) => {
    if (!authUserInfo) return;
    const DB = new DBConnection();

    const existingUser = await DB.findUser(authUserInfo.resourceName.replace("people/", ""));
    if (existingUser) return existingUser;

    await DB.createUser(
        authUserInfo.resourceName.replace("people/", ""),
        authUserInfo.emailAddresses[0].value,
        authUserInfo.names[0].givenName,
        authUserInfo.names[0].familyName
    );

    return await DB.findUser(authUserInfo.resourceName.replace("people/", ""));
}

module.exports = authHandler