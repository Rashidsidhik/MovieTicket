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
  getMovie,
  addPoster,
  getAllPoster,
  deletePoster,
  getOneTheater,
  approve,
  reject,
  addgenre,
  getgenre,
  deleteGenre,
  getGenreone,
  editGenre
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
router.post("/addPoster",verifyToken, addPoster); 
router.get("/getAllPoster",verifyToken, getAllPoster);
router.delete("/deletePoster/:id", verifyToken, deletePoster); 
router.get("/getOneTheater/:id", getOneTheater);
router.patch("/approveTheater/:id",verifyToken, approve); 
router.patch("/rejectTheater/:id",verifyToken, reject); 
router.post("/addgenre", verifyToken, addgenre); 
router.get("/getgenre", verifyToken, getgenre);
router.delete("/deleteGenre/:id", verifyToken, deleteGenre); 
router.get("/getGenreone/:id",verifyToken, getGenreone);
router.post("/editGenre",verifyToken, editGenre);
module.exports = router;
