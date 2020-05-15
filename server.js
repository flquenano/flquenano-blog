const mongoose = require("mongoose");
const dotenv = require("dotenv").config({ path: "./config.env" });

const app = require("./app");

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`App runnning at port ${process.env.PORT}`);
});

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION!\n Server Shutting Down!");
  console.log(err);
  console.log(err.name, err.message);
  process.exit();
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION!\n Server Shutting Down!");
  console.log(err.stack);
  console.log(err.name, err.message);
  process.exit();
});

server.on("close", () => console.log("Server now turned off!"));
