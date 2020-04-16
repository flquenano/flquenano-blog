const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.set("view engine", "html");
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res, next) => {
  res.status("200").json({
    message: "Request Accepted!"
  });
});

module.exports = app;
