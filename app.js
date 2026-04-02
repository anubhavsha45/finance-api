const express = require("express");
const app = express();
const globalErrorController = require("./controllers/errorController");
const userRoutes = require("./routes/userRoutes");
const recordRoutes = require("./routes/recordRoutes");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");

//HELMET

app.use(helmet());

//bodyparser
app.use(express.json());

//DATA SANITIZATION AGAINST NOSQL QUERY INJECTION
app.use(mongoSanitize());

//LIMIT REQUEST FROM THE SAME IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP,please try again in an hour",
});
app.use("/api", limiter);
//mounted routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/records", recordRoutes);

//error controller
app.use(globalErrorController);

module.exports = app;
