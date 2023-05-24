require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const adminRoutes = require("./routes/admin");
const theaterRoutes =require('./routes/theater');


// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/theater",theaterRoutes)
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);




const port = process.env.PORT || 1000;
app.listen(port, console.log(`Listening on port ${port}...`));