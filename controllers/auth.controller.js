const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const UserModel = require("../models/user.model");

const catchAsync = require("../utils/catchAsync.util");
const send_email = require("../utils/email.util");

const sign_token = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

const send_token = (user, status_code, req, res) => {
  const token = sign_token(user.id);
  const cookie_options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  if (process.env.NODE_ENV === "production") cookie_options.secuure = true;
  res.cookie("jwt", token, cookie_options);
  user.password = undefined;
  res.status(status_code).json({
    status: "success",
    token,
    user
  });
};

exports.register = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const new_user = await UserModel.create(req.body, function (error, doc) {
    if (error || doc === undefined) {
      return next(error);
    }
    send_token(doc, 201, req, res);
  });
});

exports.login = catchAsync(async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Please Provide Email Or Password!"
    });
  }

  const user = await UserModel.findOne({ email }).select("+password");
  if (!user || !(await user.correct_password(password, user.password))) {
    return res.status(401).json({
      message: "Incorrect Email or Password"
    });
  }
  send_token(user, 200, req, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401).json({
      message: "Please Login!"
    });
  }

  //Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const current_user = await UserModel.findById(decoded.id);

  if (current_user.change_password_after(decoded.iat)) {
    return res.status(401).json({
      message: "User recently changed password! Please login again!"
    });
  }
  req.user = current_user;
  next();
});

exports.forget_password = catchAsync(async (req, res, next) => {
  const user = await UserModel.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json({
      message: "Email doesn't Exists!"
    });
  }

  const token = await user.create_reset_token();

  const reset_token = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/reset_password/${token}`;
  const message = `Forgot Password? Please click:\n ${reset_token} \nto set a new password.
                  \n\nIf you didn't forgot your password, please ignore this email`;
  try {
    const email = await send_email({
      email: user.email,
      subject: "Password Reset Token (Valid for 10 Minutes)",
      message
    });
    user.save();
    res.status(201).json({
      status: "success",
      message: "Email Sent Successfully!"
    });
  } catch (error) {
    console.log(error);
    user.password_reset_token = undefined;
    user.password_reset_expires = undefined;
    await user.save({ validateBeforeSave: false });
    res.status(500).json({
      error
    });
  }
});

exports.reset_password = catchAsync(async (req, res, next) => {
  /**
   * 1. Create Hash from token
   * 2. Find Document based from hash
   * 3. Update Document
   * 4. return new token
   * {
   *    "password": "newPassword"
   * }
   */

  const hash = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await UserModel.findOne({
    password_reset_token: hash,
    password_reset_expires: { $gt: Date.now() }
  });

  if (!user) {
    res.status(404).json({
      message: "User Doesn't Exist!"
    });
  }

  user.password = req.body.password;
  user.password_reset_token = undefined;
  user.password_reset_expires = undefined;
  //await user.save();
  send_token(user, 201, req, res);
});

exports.update_password = catchAsync(async (req, res, next) => {
  const user = await UserModel.findOne({ _id: req.user.id }).select(
    "+password"
  );

  if (!(await user.correct_password(req.body.password, user.password))) {
    return res.status(401).json({
      message: "Password is Incorrect!"
    });
  }

  user.password = req.body.new_password;
  await user.save();

  send_token(user, 200, req, res);
});

exports.deactivate_account = catchAsync(async (req, res, next) => {
  // Must Enter password to deactivate account!
  const user = await UserModel.findOne({ _id: req.user.id }).select(
    "+password"
  );

  if (!(await user.correct_password(req.body.password, user.password))) {
    return res.status(401).json({
      message: "Password is Incorrect!"
    });
  }

  user.active = false;
  // Send Response to Deactivate account
  res.status(200).json({
    message: "Account Deactivated Successfully!"
  });
});

exports.restrict_to = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.privilege)) {
      return res.status(403).json({
        message: "You dont have the permission to perform this action!"
      });
    }
    next();
  };
};
