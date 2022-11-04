const DBConnection = require("../DB/Connection");
const fetch = require("node-fetch");
const dotenv = require("dotenv");
dotenv.config();


async function hasCredentials(token) {
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

module.exports =  {hasCredentials};