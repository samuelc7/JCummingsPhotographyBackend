const express = require("express");
const bodyParser = require("body-parser");
const swaggerAutogen = require('swagger-autogen')();

// Set up documentation for project
/*
const doc = {
    info: {
      title: 'JCummings Photography API',
      description: 'API for JCummings Photography',
    },
    host: 'jcummingsphotographybackend.onrender.com',
    schemes: ['http', 'https'],
};
const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];
swaggerAutogen(outputFile, endpointsFiles, doc);
*/

// initialize our express app
const app = express();

// Set up app to read json
app.use(bodyParser.json());

const port = 3000;

// Connect to the database
const DBConnection = require("./DB/Connection");
const DB = new DBConnection();
// Test DB Conection
DB.testConnection();

// Get the login page
app.get("/", (req, res) => { res.sendFile(__dirname + "/static/index.html")});
// Get the home page
app.get("/home", (req, res) => { res.sendFile(__dirname + "/static/home.html")});

app.use("/", require("./routes"));
app.listen(port, () => {
    console.log("Listening on port " + port);
});