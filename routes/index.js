const router = require("express").Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

// Connect to the database
const DBConnection = require("../DB/Connection");
const DB = new DBConnection();

// Resource calls
router.post("/new", require("../controllers/add_new"));
router.get("/inquiries", require("../controllers/get_inquiries"));
router.put("/update" , require("../controllers/update_inquiry"));
router.delete("/delete", require("../controllers/delete"));

// OAuth routes
router.get("/glogin", require("../controllers/auth"));
router.get("/oauth2callback", require("../controllers/authHandler"))

// Documentation calls
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;
