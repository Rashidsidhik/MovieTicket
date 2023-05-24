import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  movies: [],
  date: null,
  selectedMovie: null,
  setBookedDetails: null,
  getSeatInformation: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
   
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
   
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    setSearchKey: (state, action) => {
      state.searchKey = action.payload.searchKey;
    },
    setMovies: (state, action) => {
      state.movies = action.payload.movies;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  
  setToken,
  setPosts,
  setPost,
  setUser,
  setMovie,
  setSearchKey,
  setMovies,
} = authSlice.actions;
export default authSlice.reducer;
