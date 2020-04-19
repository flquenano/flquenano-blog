const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

//Routes
const user_routes = require("./routes/user.routes");
const article_routes = require("./routes/article.routes");
//Error Handler
const Global_error_handler = require("./controllers/error.controller");

app.set("view engine", "html");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("common"));
}

app.use(process.env.URL_BASE + "/user", user_routes);
app.use(process.env.URL_BASE + "/article", article_routes);

app.all("*", (req, res, next) => {
  res.status(404).send(`Can't Find ${req.originalUrl} on this server`);
});

app.get("/", (req, res, next) => {
  res.status("200").json({
    message: "Request Accepted!"
  });
});

app.use(Global_error_handler);

module.exports = app;
