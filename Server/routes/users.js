


const express = require("express");
const {
  UserSignup,
  userLogin,
  getMovies,
  googleSignup,
  otpLogin,
  userOtpSend
} = require("../controllers/user");
const { User } = require("../models/user");
const router = express.Router();

router.post("/", UserSignup);
router.post("/login", userLogin);
router.get("/MovieList", getMovies);
router.post("/googleSignup", googleSignup);
router.post("/otplogin/:email", otpLogin);
router.post("/sendOtp", userOtpSend);
module.exports = router;
