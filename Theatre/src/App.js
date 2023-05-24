


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







function App() {
  const { darkMode } = useContext(DarkModeContext);
  const token = useSelector(state=>state.token)
  const ProtectedRoute = ({ children }) => {
    if (!token) {
      return <Navigate to="/login" />;
    }

    return children;
  };


  return (
    <div className={darkMode ? "app dark" : "app"}>

        
          <Routes>
              
          <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!token ? <Signup/>: <Navigate to="/" />} />
            <Route  path="/" element={token ? <Home />: <Navigate to="/login" />} />
            <Route path="/application" element={<New/>}/>
         
          
   
      
          </Routes>
          
 
    </div>
  );
}

export default App;
