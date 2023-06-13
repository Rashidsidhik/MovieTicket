import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FitScreenIcon from "@mui/icons-material/FitScreen";
import { useEffect } from "react";
import { useState } from "react";
import axios from "../../utils/axios";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import PaymentIcon from "@mui/icons-material/Payment";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../Redux/store";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import {
  getOneTheater,
  
} from "../../utils/Constants";
const Sidebar = () => {
  const theater = useSelector((state) => state.theater);
  const [theaters, setTheater] = useState([]);
  const theaterId = theater?._id;
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
    }).then((result) => {
      if (result.isConfirmed) {
        dispatchs(setLogout());
      }
    });
  }
  const generateError = (error) =>
  toast.error(error, {
    position: "top-right",
  });

useEffect(() => {
  const getTheater = () => {
    try {
      axios
        .get(`${getOneTheater}/${theaterId}`)
        .then((response) => {
          setTheater(response.data);
        })
        .catch((error) => {
          if (error.response) {
            generateError(error.response.data.message);
          } else {
            generateError("Network error. Please try again later.");
          }
        });
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        generateError(error.response.data.message);
      }
    }
  };
  getTheater();
}, []);
 
  return (
    <div className="sidebar">
    <div className="top">
      <Link to="/" style={{ textDecoration: "none" }}>
        <span className="logo">THEATER</span>
      </Link>
    </div>
    <hr />
    <div className="center">
      <ul>
        <Link to="/" style={{ textDecoration: "none" }}>
          <p className="title">MAIN</p>
          <li>
            <br />
            <br />
            <DashboardIcon className="icon" />
            <span>DASHBOARD</span>
          </li>
        </Link>
        <p className="title">LISTS</p>
        <Link to="/application" style={{ textDecoration: "none" }}>
          <br />

          <li>
            <PersonOutlineIcon className="icon" />
            <span>APPLICATION</span>
          </li>
        </Link>
        <br />
        {theaters?.isApproved && (
            <div>
              <p className="title">THEATER MANAGEMENT</p>
              <br />
              <Link to="/screen" style={{ textDecoration: "none" }}>
                <li>
                  <FitScreenIcon className="icon" />
                  <span>SCREEN</span>
                </li>
              </Link>
              <br />
              <br />
              <Link to="/BookingDetails" style={{ textDecoration: "none" }}>
                <li>
                  <BookOnlineIcon className="icon" />
                  <span>BOOKING MANAGE</span>
                </li>
              </Link>
              <br />
              <br />
              <Link to="/PaymentDetails" style={{ textDecoration: "none" }}>
                <li>
                  <PaymentIcon className="icon" />
                  <span>PAYMENT MANAGE</span>
                </li>
              </Link>
              <br />
            </div>
          )}
       

        <li>
          <ExitToAppIcon className="icon" />

          <Button onClick={handleLogout}>
            <span>LOGOUT</span>
          </Button>
        </li>
      </ul>
    </div>
    <br />
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