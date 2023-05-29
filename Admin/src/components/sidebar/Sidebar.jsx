import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MovieIcon from "@mui/icons-material/Movie";
import TheatersIcon from "@mui/icons-material/Theaters";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { Button } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../Redux/store";
import Swal from "sweetalert2";
import axios from "../../utils/axios";
import CreditCardIcon from "@mui/icons-material/CreditCard";


import { toast, ToastContainer } from "react-toastify";
const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
 
  const dispatchs = useDispatch();

  function handleLogout() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
    })
      .then((result) => {
        if (result.isConfirmed) {
          dispatchs(setLogout());
        }
      })
      .catch((error) => {
        if (error.response) {
          generateError(error.response.data.message);
        } else {
          generateError("Network error. Please try again later.");
        }
      });
  }
 
  

  // Map over the unread messages to get their text content



  const generateError = (error) =>
    toast.error(error, {
      position: "top-right",
    });
  const admin = useSelector((state) => state.admin);

 
 

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">ADMIN </span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <Link to="/" style={{ textDecoration: "none" }}>
            <p className="title">MAIN</p>
            <li>
              <br />

              <DashboardIcon className="icon" />
              <span>DASHBOARD</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/users-list" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>USERS</span>
            </li>
          </Link>
          <br />
        

<Link to="/theater-list" style={{ textDecoration: "none" }}>
  <li>
    <TheatersIcon className="icon" />
    <span>THEATER</span>
  </li>
</Link>
<p className="title">POSTER MANAGMENT</p>
          <Link to="/addPoster" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>ADD POSTER</span>
            </li>
          </Link>

          <br />
          <Link style={{ textDecoration: "none" }} to="/listPoster">
            <li>
              <MovieIcon className="icon" />
              <span>POSTER</span>
            </li>
          </Link>   

          <p className="title">MOVIE MANAGMENT</p>
          <Link style={{ textDecoration: "none" }} to="/movieList">
            <li>
              <MovieIcon className="icon" />
              <span>MOVIES</span>
            </li>
          </Link>

          <br />

          <Link to="/addMovies" style={{ textDecoration: "none" }}>
            <li>
              <AddAPhotoIcon className="icon" />
              <span>ADD Movies</span>
            </li>
          </Link>
         
          <br />

          <li>
            <ExitToAppIcon className="icon" />

            <Button onClick={handleLogout}>
              <span>LOGOUT</span>
            </Button>
          </li>
        </ul>
      </div>
      <br />

      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Sidebar;
