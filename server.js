/**
 * Loading .env config file.
 */

require('custom-env').env();


/**
 * Include all dependencies
 */

const express = require("express");
const parser = require("body-parser");


/**
 * Initializing express server instance and include body-parser,
 * then export it as global varable
 */

const server = express();
server.use(parser.json());
module.exports = server


/**
 * Connection feedback, optional
 */

//server.listen(process.env.SERVER_PORT, console.log("\nEndpoint Active..."));
server.get('/', (req, res) => res.json({
    message: "STEAM API Endpoint",
}));


/**
 * Add any additional api routes from api folder
 */

server.use('/steam/user', require('./api/user')); // Steam Auth API
server.use('/steam/item', require('./api/item')); // Steam Item API


/**
 * Automatically send error code 404 for unmatched links
 */

server.use(function(req, res) {
    res.sendStatus(404);
});