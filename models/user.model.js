const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: [validator.isEmail, "Please enter a valid email"]
  },
  privilege: {
    type: String,
    default: "user",
    enum: ["user", "moderator", "admin"]
  },
  account_name: {
    type: String,
    required: [true, "Account Name Required!"]
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Minimum password length is 8 chararacters"],
    maxLength: [25, "Maximum password length is 25"],
    select: false
  },
  password_changed_at: {
    type: Date,
    select: false
  },
  password_reset_token: String,
  password_reset_expires: Date,
  active: {
    type: Boolean,
    default: true
  }
});

// Add Saved Articles
//

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 8);
  this.password_changed_at = Date.now() - 1000;
  next();
});

userSchema.methods.correct_password = async function (candidate, password) {
  return await bcrypt.compare(candidate, password);
};

userSchema.methods.create_reset_token = async function () {
  const reset_token = crypto.randomBytes(32).toString("hex");
  this.password_reset_token = crypto
    .createHash("sha256")
    .update(reset_token)
    .digest("hex");
  this.password_reset_expires = Date.now() + 10 * 60 * 1000; // 10 minutes
  return reset_token;
};

userSchema.methods.change_password_after = function (JWTTimestamp) {
  if (this.password_changed_at) {
    const changed_timestamp = parseInt(
      this.password_changed_at.getTime() / 1000,
      10
    );
    return JWTTimestamp < changed_timestamp;
  }
  return false;
};

module.exports = mongoose.model("user", userSchema);
