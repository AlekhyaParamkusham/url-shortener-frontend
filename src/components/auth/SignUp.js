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
} from "../../resp";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

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
  height: 55vh;
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
  ${desktop({ height: "55vh" })};
  ${large({ width: "30vw", height: "53vh", margin: "5px" })}
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

const SignUp = () => {
  const history = useHistory();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const { firstName, lastName, email, password, passwordConfirm } = values;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    createUser(values);
  };

  const API_URL = "https://url-shortener-backnd.herokuapp.com/users";

  const [userValues, setUserValues] = useState({
    users: [],
    ufirstName: "",
    ulastName: "",
    uemail: "",
    upassword: "",
    upasswordConfirm: "",
  });

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await axios.get(API_URL);
        setUserValues((prevData) => ({ ...prevData, users: data }));
      } catch (err) {
        console.error(err);
      }
    };
    getUsers();
  }, []);

  const createUser = async (values) => {
    const { users } = userValues;
    let flag = true;
    for (let i in users.data.users) {
      if (users.data.users[i].email === values.email) {
        flag = false;
      }
    }
    if (flag) {
      axios
        .post(`${API_URL}/signup`, values)
        // axios(config)
        .then((response) => {
          // console.log(JSON.stringify(response.data));
          toast.success("User registered successfully!");
          setTimeout(history.push("/activate"), 10000);
        })
        .catch(function (error) {
          if (error.response.data.includes(" Passwords are not the same!"));
          toast.error(" Passwords are not the same!");
        });
      setValues({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
      });
    } else toast.warn("Email already exists");
  };

  return (
    <>
      <Navbar />
      <Outer>
        <ToastContainer />
        <WhoHeading>SIGN UP</WhoHeading>
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

            <SubInputCon>
              <ModifiedInput
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                required
                placeholder="New Password"
                minLength={8}
              />
            </SubInputCon>
            <SubInputCon>
              <ModifiedInput
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                value={passwordConfirm}
                onChange={handleChange}
                required
                placeholder="Confirm Password"
                minLength={8}
              />
            </SubInputCon>

            <SubmitInputCon>
              <SubmitInput type="submit" value="Submit" />
            </SubmitInputCon>
          </ModifiedForm>
        </FormContainer>
        <SignInCon>
          <p>Already registered?</p>
          <Link to="/login">Sign In here!</Link>
        </SignInCon>
      </Outer>
    </>
  );
};

export default SignUp;
