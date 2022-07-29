import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
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

const Info = styled.p`
  color: #5f7161;
  font-size: 12px;
  margin: 5px;
  padding: 2px;
  ${desktop({ fontSize: "13px", letterSpacing: "1.5px" })}
`;

const Activate = () => {
  const [values, setValues] = useState({
    email: "",
  });

  const { email } = values;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    forgotPass(values);
  };

  const [userValues, setUserValues] = useState({
    users: [],
    uemail: "",
  });

  const API_URL = "https://url-shortener-backnd.herokuapp.com/users";

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

  const forgotPass = async (values) => {
    const { uemail, users } = userValues;
    console.log(users.data.users[0].isActive);
    console.log(values);
    let flag = false;
    let userID = "";
    let activated = false;

    for (let i in users.data.users) {
      if (
        users.data.users[i].email === values.email &&
        users.data.users[i].isActive === true
      ) {
        activated = true;
      } else if (
        users.data.users[i].email === values.email &&
        users.data.users[i].isActive === false
      ) {
        console.log(users.data.users[i].email, users.data.users[i].isActive);
        flag = true;
        userID = users.data.users[i]._id;
      }
    }
    console.log(flag, userID);
    if (flag) {
      const { email } = values;

      axios
        .post(`${API_URL}/activate/${userID}`, values)

        .then((response) => {
          // console.log(JSON.stringify(response.data));
          toast.success("Activation link sent to your email");
        })
        .catch(function (error) {
          if (
            error.response.data.includes(
              "There was an error sending the email. Try again later!"
            )
          )
            toast.error(
              "There was an error sending the email. Try again later!"
            );
        });
      setValues({ email: "" });
    } else if (!flag && activated) {
      toast.error("User already activated. Kindly login via home page.");
    } else toast.error("Invalid Email! Please register via home page!");
  };

  return (
    <>
      <Navbar />
      <Outer>
        <ToastContainer />
        <LoginCon>
          <WhoHeading>ACTIVATE ACCOUNT</WhoHeading>
          <LoginInfo>
            <Info>
              Please provide your registered email to activate your account.
            </Info>
          </LoginInfo>
          <FormContainer>
            <ModifiedForm onSubmit={submitForm}>
              <SubInputCon>
                <ModifiedInput
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  required
                  placeholder="User email"
                />
              </SubInputCon>
              <SubmitInputCon>
                <SubmitInput type="submit" value="Send Email" />
              </SubmitInputCon>
            </ModifiedForm>
          </FormContainer>
        </LoginCon>
      </Outer>
    </>
  );
};

export default Activate;
