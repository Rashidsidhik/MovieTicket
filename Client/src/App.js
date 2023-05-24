

import { Route,Routes,Navigate} from 'react-router-dom'
import Home from './Pages/Home/Home';
import './App.css';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';

import React from 'react';
import 'react-toastify/dist/ReactToastify.css';

import {useDispatch, useSelector} from 'react-redux';



import { useEffect } from 'react';


import { setLogout } from './Redux/store';



function App() { 
	const token = useSelector(state=>state.token)
	const currentUser = useSelector(state=>state.user)
	const dispatch = useDispatch();


	
  return (
    <div className="App">
      <Routes>
       <Route path="/" exact element={<Home />} />
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
	
	
		
		
      </Routes>
    </div>
  );
}

export default App;
