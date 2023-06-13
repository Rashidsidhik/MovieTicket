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
  categorymovie,
  getAllCity,
  getScreenShows,
  seatReserved,
  reservation,
  getQrCode,
  addWishlist,
  getUserHistory,
  cancelTicket,
  removeWishlist
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
router.get("/categorymovie/:id/:userId?",categorymovie);
router.get("/getAllCity", getAllCity);
router.get("/getScreenShows/:id/:title",verifyToken, getScreenShows);
router.get("/seatReserved/:id/:time/:movieId/:date",verifyToken, seatReserved);
router.post("/reservation/:id/:total/", verifyToken, reservation);
router.get("/getQrcode",verifyToken, getQrCode);
router.post("/addWishlist",verifyToken,addWishlist);
router.post("/removeWishlist",verifyToken,removeWishlist);
router.get("/history/:id", verifyToken, getUserHistory);
router.delete("/cancelTicket/:id", verifyToken, cancelTicket); 
module.exports = router;
