const express = require("express");
const winston = require("winston");
const app = express();

require("./startup/config")();
require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info("listing on port 3000..."));

module.exports = server;
