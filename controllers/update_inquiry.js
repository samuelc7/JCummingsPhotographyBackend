const DBConnection = require("../DB/Connection");
const DB = new DBConnection();

const update = async (req, res) => {
    const jsonBody = req.body;
    const dbResult = await DB.updateInquiry(jsonBody);

    if (dbResult == 500 || dbResult["value"] == null) {
        res.statusCode = 500;
        res.send("Cannot update non-existing inquiry. Please check the id and try again.")
    } else {
        res.sendStatus(204);
    }
}

module.exports = update;