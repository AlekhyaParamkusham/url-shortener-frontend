import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const user = localStorage.getItem("user");
  return (
    <>
      <div className="navbar">
        <div className="navBrand">
          {user === "undefined" || user === null ? (
            <Link to="/">
              <h2>
                <strong>URL Shortener</strong>
              </h2>
            </Link>
          ) : (
            <Link to="/user">
              <h2>
                <strong>URL Shortener</strong>
              </h2>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
