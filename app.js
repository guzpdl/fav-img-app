require("dotenv").config();

require("./db");

const express = require("express");

const app = express();

require("./config")(app);

const projectName = "My Favorite Images";

app.locals.appTitle = projectName;

const allRoutes = require("./routes/index.routes");
app.use("/", allRoutes);

require("./error-handling")(app);

module.exports = app;
