var Loginvalidate = require("../utils/validate");
const { Theater, validate } = require("../models/Theater");
const bcrypt = require("bcrypt");

module.exports = {
  theaterSignup: async (req, res) => {
    try {
      const { error } = validate({
        Name: req.body.Name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone, // Add the phone field to the validation data
      });
      if (error)
        return res.status(400).send({ message: error.details[0].message });
      const theater = await Theater.findOne({ email: req.body.email });
      if (theater)
        return res
          .status(409)
          .send({ message: "Theater with given email already Exist!" });
      const theaters = await Theater.findOne({ phone: req.body.phone });
      if (theaters)
        return res
          .status(409)
          .send({ message: "Theater with given phone already Exist!" });

      if (error)
        return res.status(400).send({ message: error.details[0].message });

      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      await new Theater({ ...req.body, password: hashPassword }).save();
      res.status(201).send({ message: "theater created successfully" });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" + error });
    }
  },

  theaterLogin: async (req, res) => {
    try {
      var { error } = Loginvalidate(req.body);
      if (error)
        return res.status(400).send({ message: error.details[0].message });

      var theater = await Theater.findOne({ email: req.body.email });
      if (!theater)
        return res.status(401).send({ message: "Invalid Email or Password" });

      var validPassword = await bcrypt.compare(
        req.body.password,
        theater.password
      );
      if (!validPassword)
        return res.status(401).send({ message: "Invalid Emailor Password" });

      var token = theater.generateAuthToken();

      res.status(200).json({ token, theater });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" + error });
    }
  },

  
};
