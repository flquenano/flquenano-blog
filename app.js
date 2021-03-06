const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

//Routes
const user_routes = require("./routes/user.routes");
const post_routes = require("./routes/post.routes");
const upload_routes = require("./routes/uploads.route");
//Error Handler
const Global_error_handler = require("./controllers/error.controller");

app.set("view engine", "html");
app.use("/uploads/", express.static("uploads")); // to be able to display image

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(morgan("dev"));

app.use("/api/v1/user", user_routes);
app.use("/api/v1/posts", post_routes);
app.use("/api/v1/upload", upload_routes);

if (process.env.NODE_ENV === "production") {
  app.use(morgan("common"));
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.all("*", (req, res) => {
  res.status(404).send(`Can't Find ${req.originalUrl} on this server`);
});

app.use(Global_error_handler);

module.exports = app;
