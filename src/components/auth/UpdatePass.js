import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
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
import { getCookie } from "../../utils/auth";
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
  height: 35vh;
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
  ${desktop({ height: "40vh" })};
  ${large({ width: "30vw", height: "35vh", margin: "5px" })}
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
  margin-bottom: 6px;
  ${large({ marginBottom: "10px" })}
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
  margin: 5px;
  ${mobileLand({ fontSize: "25px" })};
  ${desktop({ fontSize: "30px" })}
`;

const Info = styled.p`
  color: #5f7161;
  font-size: 12px;
  margin: 5px;
  padding: 2px;
  ${desktop({ fontSize: "13px", letterSpacing: "1.5px" })}
`;

const UpdatePass = () => {
  const [values, setValues] = useState({
    passwordCurrent: "",
    password: "",
    passwordConfirm: "",
  });

  const history = useHistory();

  const { passwordCurrent, password, passwordConfirm } = values;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    updatePass(values);
  };

  const [userValues, setUserValues] = useState({
    users: [],
    uemail: "",
  });

  const API_URL = "https://url-shortener-backnd.herokuapp.com/users";

  const user = localStorage.getItem("user");
  const token = getCookie("token");

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

  const updatePass = async (values) => {
    if (token) {
      axios
        .patch(`${API_URL}/updateMyPassword/${token}`, values)
        .then((response) => {
          // console.log(JSON.stringify(response.data));
          history.push("/login");
        })
        .catch(function (error) {
          if (error.response.data.includes("Token is invalid or has expired"));
          toast.error(
            "Token expired. Please generate a new password reset token"
          );
        });
      setValues({ passwordCurrent: "", password: "", passwordConfirm: "" });
    } else toast.error("Invalid token");
  };

  return (
    <>
      <Navbar />
      <Outer>
        <ToastContainer />
        <LoginCon>
          <WhoHeading>UPDATE PASSWORD</WhoHeading>
          <LoginInfo>
            <Info>Enter new password</Info>
          </LoginInfo>
          <FormContainer>
            <ModifiedForm onSubmit={submitForm}>
              <SubInputCon>
                <ModifiedInput
                  type="password"
                  id="passwordCurrent"
                  name="passwordCurrent"
                  value={passwordCurrent}
                  onChange={handleChange}
                  required
                  placeholder="Current Password"
                />
                <ModifiedInput
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  required
                  placeholder="New Password"
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
                  placeholder="Re-type password"
                />
              </SubInputCon>
              <SubmitInputCon>
                <SubmitInput type="submit" value="Submit" />
              </SubmitInputCon>
            </ModifiedForm>
          </FormContainer>
        </LoginCon>
      </Outer>
    </>
  );
};

export default UpdatePass;
