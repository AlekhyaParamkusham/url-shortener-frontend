import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/Home/Home";
// import Navbar from "./components/Navbar/Navbar";

import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import ForgotPass from "./components/auth/ForgotPass";
import ResetPass from "./components/auth/ResetPass";
import HomeUser from "./components/HomeUser/HomeUser";
import Details from "./components/Details";
import UpdatePass from "./components/auth/UpdatePass";
import Activate from "./components/auth/Activate";
import Authenticate from "./components/auth/Authenticate";
import Dashboard from "./components/Dashboard";

function App() {
  const user = localStorage.getItem("user");

  return (
    <>
      <Router>
        <Switch>
          {/* {user === "undefined" || user === null ? (
            <Route exact path="/">
              <Home />
            </Route>
          ) : (
            <Route exact path="/user">
              <HomeUser />
            </Route>
          )} */}
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/user">
            <HomeUser />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>

          <Route exact path="/forgot">
            <ForgotPass />
          </Route>
          <Route exact path="/reset/:id">
            <ResetPass />
          </Route>
          <Route exact path="/details">
            <Details />
          </Route>
          <Route exact path="/updatePass">
            <UpdatePass />
          </Route>
          <Route exact path="/activate">
            <Activate />
          </Route>
          <Route exact path="/authenticate/:id">
            <Authenticate />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
