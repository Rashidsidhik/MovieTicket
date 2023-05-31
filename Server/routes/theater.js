var verifyToken = require("../middleware/autThe");
const express = require("express");
const {
  theaterSignup,
  theaterLogin,
  addApplication,
  getAllTheater,
  addscreens,
  getMovies,
  editScreen,
  addShow,
  editSreenShow,
  deleteShowInfo,
  deletScreen,
  getAdmin,
  getscreen,
} = require("../controllers/theater");
const { Theater } = require("../models/Theater");
const router = express.Router();

router.route("/").post(theaterSignup);
router.post("/login", theaterLogin);
router.post("/application", verifyToken, addApplication); 
router.get("/getAllTheater",getAllTheater);
router.post("/addscreen", verifyToken, addscreens); 
router.post("/Screeninfo", verifyToken, getMovies); 
router.post("/editScreen", verifyToken, editScreen); 
router.post("/addShow", verifyToken,addShow); 
router.post("/editSreenShow/:id/:screenName/:moviName",verifyToken, editSreenShow); 
router.get("/getAdmin",verifyToken, getAdmin);
router.get("/listMoveTheater",verifyToken, getMovies);
router.delete("/deleteShowInfo/:id/:theaterID", verifyToken, deleteShowInfo); 
router.delete("/deletScreen/:id/:screenname", verifyToken, deletScreen); 
router.get("/getscreen/:id",getscreen);

module.exports = router;
