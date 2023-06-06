var verifyToken = require("../middleware/authusr");


const express = require("express");
const {
  UserSignup,
  userLogin,
  getMovies,
  googleSignup,
  otpLogin,
  userOtpSend,
  getAllPoster,
  addprofileinfo,
  getMovie,
  addReview,
  getReview,
  deleteReview,
  searchMovie,
  categorymovie
} = require("../controllers/user");
const { User } = require("../models/user");
const router = express.Router();

router.post("/", UserSignup);
router.post("/login", userLogin);
router.get("/MovieList", getMovies);
router.post("/googleSignup", googleSignup);
router.post("/otplogin/:email", otpLogin);
router.post("/sendOtp", userOtpSend);
router.get("/getAllPoster", getAllPoster);
router.post("/editprofile",verifyToken,addprofileinfo);
router.get("/getMovie/:id", getMovie);
router.post("/reviews", verifyToken, addReview);
router.delete("/deleteReview/:id/:date",verifyToken, deleteReview);
router.get("/getAllReview/:id",verifyToken, getReview);
router.get("/searchMovie/:key", searchMovie);
router.get("/categorymovie/:id",categorymovie);
module.exports = router;
