var Loginvalidate = require("../utils/validate");
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const Movie = require("../models/Movie");
const jwt = require("jsonwebtoken");
const userotp = require("../models/userOtp");
const nodemailer = require("nodemailer");
//Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAIL_USER,
    pass: process.env.NODEMAIL_PASS,
  },
});

module.exports = {
  UserSignup: async (req, res) => {
    try {
      const { error } = validate(req.body);
      if (error)
        return res.status(400).send({ message: error.details[0].message });

      const user = await User.findOne({ email: req.body.email });

      if (user)
        return res
          .status(409)
          .send({ message: "User with given email already Exist!" });

      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      await new User({ ...req.body, password: hashPassword }).save();
      res.status(201).send({ message: "User created successfully" });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" + error });
    }
  },
  userLogin: async (req, res) => {
    try {
      var { error } = Loginvalidate(req.body);
      if (error)
        return res.status(400).send({ message: error.details[0].message });

      var user = await User.findOne({ email: req.body.email });
      if (!user)
        return res.status(401).send({ message: "Invalid Email or Password" });

      if (user.Block) return res.status(409).send({ message: "User Blocked!" });

      var validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword)
        return res.status(401).send({ message: "Invalid Emailor Password" });

      var token = user.generateAuthToken();

      res.status(200).json({ token, user });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" + error });
    }
  },
  googleSignup: async (req, res) => {
    try {
      var user = await User.findOne({ email: req.body.email });
      if (!user)
        return res.status(401).send({ message: "Invalid Email or Password" });

      if (user.Block) return res.status(409).send({ message: "User Blocked!" });

      var token = user.generateAuthToken();

      res.status(200).json({ token, user });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" + error });
    }
  },
  getMovies: async (req, res) => {
    try {
      const movies = await Movie.find();
      res.json(movies);
    } catch (error) {
      res.status(500).json({ message: "something went wrong" + error });
    }
  },
  searchMovie: async (req, res) => {
    try {
      const movie = await Movie.find({ title: { $regex: req.params.key } });
      res.status(200).json({ message: "Sucess", movie });
    } catch (error) {
      res.status(500).json({ message: "something went wrong" + error });
    }
  },
  otpLogin: async (req, res) => {
    
    try {
    
      const email = req.params.email;
      console.log(email);
      var user = await User.findOne({ email: email });

      if (!user)
        return res.status(401).send({ message: "Invalid Email or Password" });

      if (user.Block)
        return res.status(401).send({ message: "You are Blocked !" });

      var token = user.generateAuthToken();
      res.status(200).json({ token, user });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" + error });
    }
  },
   //User Send Otp
   userOtpSend: async (req, res) => {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>");
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ message: "Please enter your email" });
    }

    try {
      const user = await User.findOne({ email: req.body.email });

      if (user) {
        const OTP = Math.floor(100000 + Math.random() * 900000);

        const existEmail = await userotp.findOne({ email: email });

        if (existEmail) {
          const updateData = await userotp.findByIdAndUpdate(
            { _id: existEmail._id },
            {
              otp: OTP,
            },
            { new: true }
          );
          await updateData.save();

          const mailOptions = {
            from: process.env.Email,
            to: email,
            subject: "Sending Email for Otp Validation",
            text: `OTP:-${OTP}`,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              res.status(400).json({ message: "Email not Send" });
            } else {
              res
                .status(200)
                .json({ message: "Email sent Successfully", otp: OTP });
            }
          });
        } else {
          const saveOtpData = new userotp({ email, otp: OTP });
          await saveOtpData.save();
          const mailOptions = {
            from: process.env.NODEMAIL_USER,
            to: email,
            subject: "Sending Email for Otp Validation",
            text: `OTP:-${OTP}`,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              res.status(400).json({ message: "Email not Send" });
            } else {
              res
                .status(200)
                .json({ message: "Email sent Successfullyy", otp: OTP });
            }
          });
        }
      } else {
        res.status(400).json({ message: "This user is not exist in our db" });
      }
    } catch (error) {
      res.status(400).json({ message: "Invalid Details", error });
    }
  },
};
