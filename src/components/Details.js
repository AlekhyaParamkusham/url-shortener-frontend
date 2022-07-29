import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import {
  small,
  mobile,
  mobileLand,
  tabletPo,
  smallTablet,
  desktop,
  large,
} from "./../resp";
import { Link } from "react-router-dom";
import { getCookie } from "./../utils/auth";
import Navbar from "./Navbar/Navbar";

const Outer = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 8px;
  ${desktop({ marginTop: "25px" })};
`;
const FormContainer = styled.div`
  height: 40vh;
  width: 60vw;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  // padding: 10px;
  margin: 6px;
  border: 1px solid #f0ece3;
  ${smallTablet({ width: "45vw" })};
  ${tabletPo({ width: "40vw" })};
  ${desktop({ height: "40vh", width: "30vw" })};
  ${large({ width: "30vw", height: "40vh", margin: "5px" })}
`;

const SignInCon = styled.div`
  height: 6vh;
  width: 60vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  padding: 5px;
  margin: 5px;
  font-size: 12px;
  gap: 5px;
  ${smallTablet({ width: "45vw" })};
  ${tabletPo({ width: "40vw" })};
  ${desktop({
    justifyContent: "space-evenly",
    fontSize: "13px",
    letterSpacing: "1px",
  })};
  ${large({ width: "35vw" })}
`;
const ModifiedForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const SubInputCon = styled.div`
  margin-bottom: 4px;
  ${large({ marginBottom: "8px" })}
`;
const ModifiedInput = styled.input`
  width: 50vw;
  height: 5vh;
  margin-top: 10px;
  border-radius: 2px;
  border: none;
  padding: 5px;
  font-size: 13px;
  text-align: left;
  background-color: #f0ece3;
  ${smallTablet({ width: "35vw" })};
  ${tabletPo({ width: "30vw" })};
  ${desktop({ width: "30vw" })};

  ${large({ width: "26vw", height: "4.5vh" })};
  &:focus {
    outline: none !important;
    box-shadow: 0 0 0.2px #719ece;
  }
  &::placeholder {
    padding: 8px;
    font-size: 11px;
    ${large({ fontSize: "13px" })}
  }
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
const WhoHeading = styled.h1`
  font-size: 20px;
  letter-spacing: 6px;
  font-weight: 500;
  font-family: "Bebas Neue", cursive;
  padding-bottom: 5px;
  color: red;
  margin: 10px;
  ${mobileLand({ fontSize: "25px" })};
  ${desktop({ fontSize: "28px" })}
`;

const Details = () => {
  const history = useHistory();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const { firstName, lastName, email } = values;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    updateUser(values);
  };

  const user = localStorage.getItem("user");
  const token = getCookie("token");

  const API_URL = "https://url-shortener-backnd.herokuapp.com/users";

  const [userValues, setUserValues] = useState({
    users: [],
    ufirst: "",
    ulast: "",
    uemail: "",
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/${user}`);
        const response = data.data.user;

        setUserValues((prevData) => ({
          ...prevData,
          users: response,
          ufirst: response.firstName,
          ulast: response.lastName,
          uemail: response.email,
        }));
      } catch (err) {
        console.error(err);
      }
    };
    getUser();
  }, []);
  useEffect(() => {
    setValues({
      firstName: userValues.ufirst,
      lastName: userValues.ulast,
      email: userValues.uemail,
    });
  }, [userValues]);

  const updateUser = async (values) => {
    axios
      .patch(`${API_URL}/updateMe/${token}`, values)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        toast.success("User details changed successfully!");
        setTimeout(history.push("/user"), 10000);
      })
      .catch(function (error) {
        if (error.response.data.includes(" Passwords are not the same!"));
        toast.error(" Passwords are not the same!");
      });
  };

  return (
    <>
      <Navbar />
      <Outer>
        <ToastContainer />
        <WhoHeading>User Details</WhoHeading>
        <FormContainer>
          <ModifiedForm onSubmit={submitForm}>
            <SubInputCon>
              <ModifiedInput
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={handleChange}
                required
                placeholder="First Name"
              />
            </SubInputCon>
            <SubInputCon>
              <ModifiedInput
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={handleChange}
                required
                placeholder="Last Name"
              />
            </SubInputCon>
            <SubInputCon>
              <ModifiedInput
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                required
                placeholder="Email"
              />
            </SubInputCon>

            <SubmitInputCon>
              <SubmitInput type="submit" value="Update" />
            </SubmitInputCon>
          </ModifiedForm>
        </FormContainer>
        <SignInCon style={{ justifyContent: "center" }}>
          <Link to="/updatePass">Update Password?</Link>
        </SignInCon>
      </Outer>
    </>
  );
};

export default Details;
