require("winston-mongodb");
const express = require("express");

const app = express();

// Logging
require("./startup/logging")();
// Routes
require("./startup/routes")(app);
// DB
require("./startup/db")();

app.listen(3000, () => console.log("listing on port 3000..."));
