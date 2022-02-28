const express = require("express");
const router = express.Router();
const verifyToken = require("../Middleware/verifyToken");
const {
  AuthUser,
  RegisterUser,
  LoginUser,
} = require("../Controller/UserController");

router.route("/").get(verifyToken, AuthUser);
router.route("/register").post(RegisterUser);
router.route("/login").post(LoginUser);

module.exports = router;
