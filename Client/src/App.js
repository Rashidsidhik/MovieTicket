import { Route,Routes,Navigate} from 'react-router-dom'
import Home from './Pages/Home/Home';
import './App.css';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import OtpPage from './Pages/OTPPAGE/otpPage';
import Otp from './Pages/OTP/Otp';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch, useSelector} from 'react-redux';
import PageNotFound from './PageNotFound';
import Profile from './Pages/Profile/Profile';
import Profileedit from './components/Profileedit/Profileedit';
import Detail from './Pages/detail/Detail';
import Category from './Pages/Category/Category';
function App() { 
	

 

	
  return (
    <div className="App">
      <Routes>
       <Route path="/" exact element={<Home />} />
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
      <Route path="/otpLogin" exact element={<Otp/>} />
      <Route path="/otp" exact element={<OtpPage/>} />
      <Route path='*' element={<PageNotFound/>}/>
      <Route path="/profile" exact element={<Profile />} />
			<Route path="/editProfile" exact element={<Profileedit/>} />
			<Route path="/MovieDetails/:id" element={<Detail/> } />
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path={"/categorymovie/:category"} element={<Category />} />
      </Routes>
    </div>
  );
}

export default App;
