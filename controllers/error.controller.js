const ErrorBody = require("../utils/app_error.util");

const handle_cast_error_db = (error) => {
  const message = `Invalid ${error.path}: ${error.value}`;
  return new ErrorBody(message, 404);
};

const handle_duplicate_field_db = (error) => {
  const value = error.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value ${value}. Please use another value!`;
  return new ErrorBody(message, 400);
};

const handle_validation_error = (error) => {
  const errors = Object.values(error.erros).map((err) => err.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new ErrorBody(message, 400);
};

const handleJWTError = () =>
  new ErrorBody("Invalid Token. Please login Again", 401);

const handleJWtExpiredError = () =>
  new ErrorBody("Your session has expired! Please login again.", 401);

const send_error_development = (err, req, res) => {
  const { statusCode, status, errmsg, stack } = err;
  res.status(statusCode).json({
    status,
    message: errmsg,
    stack: stack
  });
};

const sendErrorProd = (err, req, res) => {
  // API
  if (req.originalUrl.startsWith("/api")) {
    //Operational Error
    if (err.isOperational) {
      res.status(err.statusCode).json({
        message: err.message,
        stack: err.stack,
        error: err
      });
    }
  } else {
    //Programming/Unknown Error
    //console.log("ERROR!", err);

    // END of API Err Handler

    // RENDERED WEBSITE
    if (err.isOperational) {
      return res.status(err.statusCode).render("error", {
        title: "Something went wrong!",
        msg: err.message
      });
    }
    //console.error("ERROR 💥", err);
    // 2) Send generic message
    return res.status(err.statusCode).render("error", {
      title: "Something went wrong!",
      msg: "Please try again later."
    });
  }
};

module.exports = (err, req, res, next) => {
  console.log(err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    send_error_development(err, req, res);
  } else {
    let error = { ...err };
    error.message = err.message;
    if (error.code === 11000) error = handle_duplicate_field_db(error);
    if (error.name === "CastError") error = handle_cast_error_db(error);
    if (error.name === "ValidationError")
      error = handle_validation_error(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError(error);
    if (error.name === "TokenExpiredError")
      error = handleJWtExpiredError(error);
    sendErrorProd(error, req, res);
  }
};
