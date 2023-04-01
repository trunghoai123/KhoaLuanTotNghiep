require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const { default: helmet } = require("helmet");
const cors = require("cors");
const app = express();

//init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  })
);
app.use(cors());

//init db
require("./dbs/init.mongodb");
// const { checkOverload } = require("./helpers/check.connect")
// checkOverload()

//init routes
app.use("", require("./routes"));

module.exports = app;
