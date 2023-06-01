var Loginvalidate = require("../utils/validate");
const { Admin, validate } = require("../models/admin");
const Movie = require("../models/Movie");
const { User } = require("../models/user");
const { Theater } = require("../models/Theater");
const poster = require("../models/Poster");
const genre = require("../models/genre");
const bcrypt = require("bcrypt");
module.exports = {
  adminSignup: async (req, res) => {
    try {
      const { error } = validate(req.body);
      if (error)
        return res.status(400).send({ message: error.details[0].message });

      const admin = await Admin.findOne({ email: req.body.email });
      if (admin)
        return res
          .status(409)
          .send({ message: "Admin with given email already Exist!" });

      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      await new Admin({ ...req.body, password: hashPassword }).save();
      res.status(201).send({ message: "Admin created successfully" });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" + error });
    }
  },

  adminLogin: async (req, res) => {
    try {
      var { error } = Loginvalidate(req.body);
      if (error)
        return res.status(400).send({ message: error.details[0].message });

      var admin = await Admin.findOne({ email: req.body.email });
      if (!admin)
        return res.status(401).send({ message: "Invalid Email or Password" });

      var validPassword = await bcrypt.compare(
        req.body.password,
        admin.password
      );
      if (!validPassword)
        return res.status(401).send({ message: "Invalid Emailor Password" });

      var token = admin.generateAuthToken();
      res.status(200).json({ token, admin });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" + error });
    }
  },

  addmovies: async (req, res) => {
    console.log(req.body)
    try {
      const movieExists = await Movie.findOne({
        title: req.body.title,
      });

      if (movieExists) {
        return res.status(400).json({ message: "Movie already exists" });
      }
      const caseSensitiveExists = await Movie.findOne({
        title: {
          $regex: new RegExp("^" + req.body.title + "$", "i"),
        },
      });

      if (caseSensitiveExists) {
        return res.status(400).json({ message: "Movie already exists" });
      }

      const moviedata = await Movie(req.body).save();
      res.json({ moviedata, status: true });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" + error });
    }
  },
  getAllMovies: async (req, res) => {
    try {
      const movies = await Movie.find().sort("-createdAt");

      res.json(movies);
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" + error });
    }
  },
  getUsers: async (req, res) => {
    const pageNo = req.query.page;
    const options = {
      page: Number(pageNo) ?? 1,
      limit: 3,
      projection: {
        password: 0,
      },
    };
    try {
      // const user = await User.find().select("-password");
      const user = await User.paginate({}, options);
      if (!user)
        return res
          .status(500)
          .json({ message: "didnt got users from database" });

      res.status(200).json({ message: "Success", user });
    } catch (error) {
      res.status(500).json({ message: "something went wrong" });
    }
  },

  getUserss: async (req, res) => {
    try {
      const user = await User.find().select("-password");

      if (!user)
        return res
          .status(500)
          .json({ message: "didnt got users from database" });

      res.status(200).json({ message: "Success", user });
    } catch (error) {
      res.status(500).json({ message: "something went wrong" });
    }
  },
  blockStaff: async (req, res) => {
    const pageNo = req.query.page;
    const options = {
      page: Number(pageNo) ?? 1,
      limit: 3,
      projection: {
        password: 0,
      },
    };
    try {
      let id = req.params.id;

      const user = await User.findByIdAndUpdate(
        { _id: Object(id) },
        { $set: { Block: true } }
      );
      console.log(user);
      const users = await User.paginate({}, options);
      console.log(users,'oooooo');
      res.json(users);
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" + error });
      //try later
    }
  },

  unblockStaff: async (req, res) => {
    const pageNo = req.query.page;
    const options = {
      page: Number(pageNo) ?? 1,
      limit: 3,
      projection: {
        password: 0,
      },
    };
    let id = req.params.id;
    try {
      // const {id} = req.body
      const user = await User.findByIdAndUpdate(
        { _id: Object(id) },
        { $set: { Block: false } }
      );
      const users = await User.paginate({}, options);
      res.json(users);
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" + error });
      //try later
    }
  },
  getAllTheater: async (req, res) => {
    try {
      const companyData = await Theater.find().sort("-createdAt");

      res.json(companyData);
    } catch (error) {
      res.status(error.status).json(error.message);
    }
  },

  getAllTheaters: async (req, res) => {
    const pageNo = req.query.page;
    const options = {
      page: Number(pageNo) ?? 1,
      limit: 3,
      projection: {
        password: 0,
      },
    };
    try {
      const companyData = await Theater.paginate({}, options);
      res.json(companyData);
    } catch (error) {
      res.status(error.status).json(error.message);
    }
  },
  deleteMovie: async (req, res) => {
    let id = req.params.id;

    try {
      const data = await Movie.findByIdAndRemove({ _id: id });
      const update=await Movie.find().sort("-createdAt");
      res.status(200).json(update);
    } catch (error) {}
  },
  editMovie: async (req, res) => {
    const id = req.params.id;
    const output = {};

    if (req.body.datas.title) output.title = req.body.datas.title;
    if (req.body.datas.description)
      output.description = req.body.datas.description;
    if (req.body.datas.genre) output.genre = req.body.datas.genre;
    if (req.body.datas.director) output.director = req.body.datas.director;
    if (req.body.datas.duration) output.duration = req.body.datas.duration;
    if (req.body.datas.releasedate)
      output.releasedate = req.body.datas.releasedate;
    if (req.body.datas.imageUrl) output.imageUrl = req.body.datas.imageUrl;

    try {
      const movie = await Movie.findByIdAndUpdate(id, output);

      res.status(200).json(movie);
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" + error });
    }
  },
  getMovie: async (req, res) => {
    const movieId = req.params.id;
    try {
      const movies = await Movie.findOne({ _id: Object(movieId) });

      res.json(movies);
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" + error });
    }
  },
  addPoster: async (req, res) => {
    try {
      const newPoster = new poster({
        posterImageUrl: req.body.PosterImageUrl,
        PosterUrl: req.body.PosterUrl,
      });
      const savedPoster = await newPoster.save();
      const Allposter = await poster.find().sort({ createdAt: -1 });

      res.json({ Allposter, status: true });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" + error });
    }
  },
  getAllPoster: async (req, res) => {
    try {
      const Allposter = await poster.find().sort({ createdAt: -1 });
      res.json(Allposter);
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" + error });
    }
  },
  deletePoster: async (req, res) => {
    let id = req.params.id;
    try {
      const data = await poster.findByIdAndRemove({ _id: id });
      const Allposter = await poster.find().sort({ createdAt: -1 });
      res.status(200).json(Allposter);
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" + error });
    }
  },
  getOneTheater: async (req, res) => {
    try {
      const theater = await Theater.findById(req.params.id);
      if (!theater) {
        return res.status(404).json({ message: "Theater not found" });
      }
      console.error(theater);
      res.json(theater);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  approve: async (req, res) => {
    const pageNo = req.query.page;
    const options = {
      page: Number(pageNo) ?? 1,
      limit: 3,
      projection: {
        password: 0,
      },
    };
    try {
      let id = req.params.id;
      const user = await Theater.findByIdAndUpdate(
        { _id: Object(id) },
        { $set: { isApproved: true } }
      );
      const companyData = await Theater.paginate({}, options);
      res.json(companyData);

    
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" + error });
      //try later
    }
  },

  reject: async (req, res) => {
    const pageNo = req.query.page;
    const options = {
      page: Number(pageNo) ?? 1,
      limit: 3,
      projection: {
        password: 0,
      },
    };
    try {
      let id = req.params.id;

      const user = await Theater.findByIdAndUpdate(
        { _id: Object(id) },
        { $set: { isApproved: false } }
      );
      const companyData = await Theater.paginate({}, options);
      res.json(companyData);
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" + error });
      //try later
    }
  },
  addgenre: async (req, res) => {
    console.log(req.body,">>>>>>>>>>>>>>>>>>>>")
    try {
      const genreExists = await genre.findOne({
        genre: req.body.datas.genrename,
      });

      if (genreExists) {
        return res.status(400).json({ message: "Genre already exists" });
      }
    
      const newgenre = new genre({
        genre: req.body.datas.genrename,
        
      });
      const savedgenre = await newgenre.save();
      const Allgenre = await genre.find().sort({ createdAt: -1 });

      res.json({ Allgenre, status: true });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" + error });
    }
  },
  getgenre: async (req, res) => {
   
    try {
      const genreres = await genre.find().sort("-createdAt");

      res.json(genreres);
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" + error });
    }
  },
  deleteGenre: async (req, res) => {
    console.log(req.params.id,">>>>>>1<<<<<<<<<<<<<<<<<<<")
    let id = req.params.id;

    try {
      const data = await genre.findOneAndRemove({ genre: id });
      const update=await genre.find().sort("-createdAt");
      res.status(200).json(update);
      
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal Server Error" + error });
    }
  },
  getGenreone: async (req, res) => {
    
    const genreId = req.params.id;
    try {
      const genres = await genre.findOne({ genre:genreId });
      
      res.json(genres);
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" + error });
    }
  },
  editGenre: async (req, res) => {
    console.log(req.body, ">>>>>>>>>>>>>>>>>>>>");
    const genreId = req.body.genrenameId;
    try {
      const updatedGenre = await genre.findByIdAndUpdate(
        genreId,
        { genre: req.body.datas.genrename },
        { new: true }
      );
  
      if (!updatedGenre) {
        return res.status(400).json({ message: "Genre not found" });
      }
      
      const Allgenre = await genre.find().sort({ createdAt: -1 });
  
      res.json({ Allgenre, status: true });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" + error });
    }
  },
  
  
};
