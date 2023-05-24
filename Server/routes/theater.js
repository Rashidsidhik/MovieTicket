
const express = require("express");
const {
  theaterSignup,
  theaterLogin,

} = require("../controllers/theater");
const { Theater } = require("../models/Theater");
const router = express.Router();

router.route("/").post(theaterSignup);
router.post("/login", theaterLogin);



module.exports = router;
