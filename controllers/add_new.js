const DBConnection = require("../DB/Connection");
const DB = new DBConnection();

const newInquiry = async (req, res) => {
    const jsonBody = req.body;

    if (jsonBody["firstName"] && jsonBody["lastName"] && 
        jsonBody["phone"] && jsonBody["serviceType"] &&
        jsonBody["email"] && jsonBody["eventDate"] && 
        jsonBody["dateFlexible"]) {

            const dbResults = await DB.addInquiry(req.body);

            if (dbResults == 500) {
                res.sendStatus(dbResults);
            } else {
                res.status(201);
                res.send(dbResults["insertedId"]);
            }
    } else {
        res.status(400);
        res.send("firstName, lastName, email, phone, serviceType, eventDate, and dateFlexible fields are required.");
    }
}

module.exports = newInquiry;