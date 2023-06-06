import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Category.scss";
import CategoryList from "../../components/CategoryList/CategoryList";
import Banner from "../../components/Banner/Banner";
import Footer from "../../components/Footer/Footer";
import Premier from '../../components/Premier/Premier';
import { useParams } from 'react-router-dom';
const Category = () => {
  const { category } = useParams();
  return (
    <>
      <Navbar />
      <div style={{ paddingBottom: "0px" }}>
        <Banner />
      </div>
      <div
        className=""
        style={{ backgroundColor: "RGB(87 168 204)", paddingTop: "70px" }}
      >
        <h1 style={{ color: "white", paddingLeft: "100px" }}>
          {category}
        </h1>
        <br />
      </div>
      <div className="movieslist">
        <CategoryList /> 
      </div>
      <Premier/>
      <Footer />
    </>
  );
};

export default Category;
