const express = require("express");
const router = express.Router();

const {
  login,
  register,
  forget_password,
  reset_password,
  update_password,
  protect,
  deactivate_account
} = require("../controllers/auth.controller");

console.log("going good!");
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forget_password);
router.post("/reset-password/:token", reset_password);

router.post("/update-password", protect, update_password);
router.post("/deactivate-account", protect, deactivate_account);

module.exports = router;
