const express = require("express");
var verifyToken = require("../middleware/authadm");
const {
  adminLogin,
  addmovies,
  getAllMovies,
  getUsers,
  getUserss,
  unblockStaff,
  blockStaff,
  getAllTheater,
  getAllTheaters,
  deleteMovie,
  editMovie,
  getMovie
} = require("../controllers/admin");
const { Admin } = require("../models/admin");
const router = express.Router();

router.post("/login", adminLogin);
router.post("/addmovies", verifyToken, addmovies); 
router.get("/movieList",verifyToken, getAllMovies);
router.get("/getAllUsers",verifyToken, getUsers);
router.get("/getAllUserss",verifyToken, getUserss);
router.patch("/unblock/:id",verifyToken, unblockStaff); 
router.patch("/block/:id",verifyToken, blockStaff); 
router.get("/getAllTheater",verifyToken, getAllTheater);
router.get("/getAllTheaters",verifyToken, getAllTheaters);
router.delete("/deleteMovie/:id", verifyToken, deleteMovie); 
router.post("/editMovie/:id",verifyToken, editMovie);
router.get("/getMovie/:id",verifyToken, getMovie);
module.exports = router;
