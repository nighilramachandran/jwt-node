const express = require("express");
const winston = require("winston");

const app = express();

require("./startup/config")();
require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();

app.listen(3000, () => winston.info("listing on port 3000..."));
