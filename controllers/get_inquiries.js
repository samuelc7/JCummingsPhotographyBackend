// Connect to the database
const DBConnection = require("../DB/Connection");
const DB = new DBConnection();

const inquiries = async (req, res) => {
    const data = await DB.showAllInquiries();
    res.send(data);
}

module.exports = inquiries;