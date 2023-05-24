import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
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
const Sidebar = () => {
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
  const { dispatch } = useContext(DarkModeContext);
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
