import {  Routes, Route ,Navigate} from "react-router-dom";
import "./style/dark.scss";
import { useContext } from "react";
import {useSelector} from 'react-redux';
import { DarkModeContext } from "./context/darkModeContext";
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';
import New from "./pages/TheaterApplication/New";
import 'react-toastify/dist/ReactToastify.css';
import ApplicatioEdit from "./components/ApplicatioEdit/ApplicatioEdit";
import PageNotFound from "./PageNotFound";
import Screen from "./pages/Screen/Screen";
import AddScreen from "./pages/AddScreen/AddScreen"; 
import AddDetails from './pages/AddDetails/AddDetails'
import EditSreen from "./components/editSreen/EditScreen";
import EditSreenShow from './components/EditScreeShow/EditScreenShow'
import BookingList from "./components/BookingMnage/BookingList";
import PaymentList from "./components/PaymentManage/PaymentList";
import PaymentViewList from "./components/PaymentViewList/PaymentViewList";
import BookingViewList from "./components/BookingViewList/BookingViewList";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const token = useSelector(state=>state.token)
 


  return (
    <div className={darkMode ? "app dark" : "app"}>

        
          <Routes> 
              
          <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!token ? <Signup/>: <Navigate to="/" />} />
            <Route  path="/" element={token ? <Home />: <Navigate to="/login" />} />
            <Route path="/application" element={<New/>}/>
            <Route path="/EditApplication" element={<ApplicatioEdit/>}/>
            <Route path="/screen" element={<Screen/>}/>
            <Route path="/addscreens" element={<AddScreen/>}/>
            <Route path="/editSreen/:id" element={<EditSreen/>}/>
            <Route path="/addTheaterDetails/:id" element={<AddDetails/>}/>
            <Route path="/editSreenShow/:id" element={<EditSreenShow/>}/>
            <Route path="/BookingDetails" element={<BookingList/>}/>
            <Route path="/PaymentDetails" element={<PaymentList/>}/>
            <Route path="/Paymnetview/:id" element={<PaymentViewList/>}/>
            <Route path="/Bookingview/:id" element={<BookingViewList/>}/>
            <Route path='*' element={<PageNotFound/>}/>
          </Routes>
          
 
    </div>
  );
}

export default App;
