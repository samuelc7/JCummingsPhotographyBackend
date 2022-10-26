const DBConnection = require("../DB/Connection");
const DB = new DBConnection();

const deleteInquiry = async (req, res) => {
    const jsonBody = req.body;
    const dbResults = await DB.deleteInquiry(jsonBody);

    if (dbResults == 500 || dbResults["value"] == null) {
        res.statusCode = 500;
        res.send("Cannot delete non-existing inquiry from DB. Please check id and try again.");
    } else {
        res.send(dbResults["value"]["_id"] + " has been deleted.");
    }
}
module.exports = deleteInquiry;