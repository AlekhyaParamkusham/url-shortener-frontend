import React from "react";
import "./home.css";
import logo from "./../Images/SOHLogo.png";

import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="home">
        <div className="homeLogo">
          <h2>
            Tired of long, ugly URLs..?
            <br /> URL shortner tranforms them to memorable and trackable short
            URLs.
          </h2>
          <div className="buttons">
            <Link to="/signup" className="btn sBtn">
              SIGN UP
            </Link>
            <Link to="/login" className="btn lBtn">
              LOGIN
            </Link>
          </div>
          <h3>SignUp/Login to proceed further.</h3>
        </div>
      </div>
    </>
  );
};

export default Home;
