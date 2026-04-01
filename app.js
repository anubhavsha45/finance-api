const express = require("express");
const app = express();
const globalErrorController = require("./controllers/errorController");
const userRoutes = require("./routes/userRoutes");
const recordRoutes = require("./routes/recordRoutes");
//bodyparser
app.use(express.json());

//mounted routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/records", recordRoutes);
//error controller
app.use(globalErrorController);

module.exports = app;
