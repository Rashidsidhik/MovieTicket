


const express = require("express");
const {
  UserSignup,
  userLogin,
  getMovies,
  //  payment,
} = require("../controllers/user");
const { User } = require("../models/user");
const router = express.Router();

router.post("/", UserSignup);
router.post("/login", userLogin);
router.get("/MovieList", getMovies);

module.exports = router;
