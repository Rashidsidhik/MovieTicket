


import {  Routes, Route ,Navigate} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./style/dark.scss";
import { useContext } from "react";
import {useSelector} from 'react-redux';
import { DarkModeContext } from "./context/darkModeContext";
import Login from './pages/Login/Login';
import Single from "./pages/userList/Single";
import New from "./pages/ADDMOVIE/New";
import Home from './pages/Home/Home'; 
import AddGenre from "./pages/AddGenre/AddGenre";
import EditGenre from "./components/editGenre/editGenre";
import MovieList from "./pages/MovieList/MovieList";
import Singles from "./pages/TheaterList/TheaterList";
import EditMovie from "./components/EditMovie/EditMovie";
import AddPoster from "./pages/AddPoster/Poster";
import PosterList from "./components/list/list";
import EditPoster from "./components/EditPoster/EditPoster";
import TheaterView from "./pages/TheaterList/TheaterView";
import BookingViewList from "./components/UserBookingViewList/BookingViewList";
import BookingDetails from "./components/UserBookingMnage/BookingList";
import PageNotFound from "./PageNotFound";
import MovieBokkingList from "./pages/TheaterMovieBokkingList/MovieBokkingList";
import Report from "./pages/Report/Report";
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
          <Route path="/users-list" element={<Single />} />
            <Route  path="/" element={token ? <Home />: <Navigate to="/login" />} />
            <Route path="/addMovies" element={<New />} />
            <Route path="/addgenre" element={<AddGenre />} />
            <Route path="/editGenre/:id" element={<EditGenre/>}/>
            <Route path="/movieList" element={<MovieList />} />
            <Route path="/users-list" element={<Single />} />
            <Route path="/theater-list" element={<Singles />} />
            <Route path="/editMovie/:id" element={<EditMovie />} />
            <Route path="/editPoster/:id" element={<EditPoster />} />
          <Route path="/addPoster" element={<AddPoster />} />
          <Route path="/listPoster" element={<PosterList />} />
          <Route path="/view/:id" element={<TheaterView />} />
          <Route path="/salesreport" element={<Report />} />
          <Route path="/Bookingview/:id" element={<BookingViewList />} />
          <Route path="/userBooking" element={<BookingDetails />} />
          <Route path="/theaterBooking" element={<MovieBokkingList />} />
          <Route path="*" element={<PageNotFound />} />
          </Routes>
          
 
    </div>
  );
}

export default App;
