import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import {
  small,
  mobile,
  mobileLand,
  tabletPo,
  smallTablet,
  desktop,
  large,
} from "../../resp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar/Navbar";

const Outer = styled.div`
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 8px;
  ${desktop({ marginTop: "25px" })};
`;

const LoginCon = styled.div`
  width: 90vw;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const LoginInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  padding: 5px;
  color: #2d2424;
  text-align: center;
`;

const FormContainer = styled.div`
  height: 20vh;
  width: 60vw;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  // padding: 10px;
  margin: 6px;
  border: 1px solid #f0ece3;
  ${smallTablet({ width: "35vw" })};
  ${tabletPo({ width: "20vw" })};
  ${desktop({ height: "20vh" })};
  ${large({ width: "25vw", height: "20vh", margin: "5px" })}
`;

const ModifiedForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SubmitInputCon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
`;
const SubmitInput = styled.input`
  background-color: green;
  color: white;
  font-size: 12px;
  letter-spacing: 2px;
  cursor: pointer;
  width: 30vw;
  margin: 0;
  padding: 4px 0;
  border: none;
  text-align: center;
  ${mobileLand({ width: "15vw", padding: "6px 0" })};
  ${smallTablet({ width: "12vw" })};
  ${tabletPo({ width: "10vw", padding: "8px 0" })};
  ${large({ width: "8vw", padding: "10px 0", fontSize: "14px" })}
  &:hover {
    opacity: 0.9;
    letter-spacing: 2.5px;
  }
`;

const Info = styled.p`
  color: #5f7161;
  font-size: 12px;
  margin: 5px;
  padding: 2px;
  ${desktop({ fontSize: "13px", letterSpacing: "1.5px" })}
`;

const Authenticate = () => {
  const history = useHistory();
  const location = useLocation();
  const userId = location.pathname.split("/")[2];

  const submitForm = (e) => {
    e.preventDefault();
    authenticateAccount(userId);
  };

  const API_URL = "https://url-shortener-backnd.herokuapp.com/users";

  const authenticateAccount = async (id) => {
    axios
      .post(`${API_URL}/authenticate/${id}`)

      .then((response) => {
        // console.log(JSON.stringify(response.data));
        toast.success("User activated");
        history.push("/login");
      })
      .catch(function (error) {
        if (
          error.response.data.includes(
            "There was an error sending the email. Try again later!"
          )
        )
          toast.error("There was an error sending the email. Try again later!");
      });
  };

  return (
    <>
      <Navbar />
      <Outer>
        <ToastContainer />
        <LoginCon>
          <LoginInfo>
            <Info>
              Please click below to confirm the activation of your account.
            </Info>
          </LoginInfo>
          <FormContainer>
            <ModifiedForm onSubmit={submitForm}>
              <SubmitInputCon>
                <SubmitInput type="submit" value="Activate" />
              </SubmitInputCon>
            </ModifiedForm>
          </FormContainer>
        </LoginCon>
      </Outer>
    </>
  );
};

export default Authenticate;
