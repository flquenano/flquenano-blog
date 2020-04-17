const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

//Routes
const user_routes = require("./routes/user.routes");

app.set("view engine", "html");
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(process.env.URL_BASE + "/user");
app.all("*", (req, res, next) => {
  res.status(404).send(`Can't Find ${req.originalUrl} on this server`);
});
app.get("/", (req, res, next) => {
  res.status("200").json({
    message: "Request Accepted!"
  });
});

module.exports = app;
