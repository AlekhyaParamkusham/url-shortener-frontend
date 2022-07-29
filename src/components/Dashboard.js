import React, { useState, useEffect } from "react";

import Navbar from "./Navbar/Navbar";
import axios from "axios";
import {
  small,
  mobile,
  mobileLand,
  tabletPo,
  smallTablet,
  desktop,
  large,
} from "./../resp";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";

const Outer = styled.div`
  ${desktop({
    marginTop: "25px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  })};
`;

const WhoHeading = styled.h1`
  font-size: 20px;
  letter-spacing: 6px;
  font-weight: 500;
  font-family: "Bebas Neue", cursive;
  padding-bottom: 5px;
  color: red;
  margin: 10px;
  text-align: center;
  ${mobileLand({ fontSize: "25px" })};
  ${desktop({ fontSize: "28px" })}
`;

const Info = styled.p`
  color: #5f7161;
  font-size: 12px;
  margin: 5px;
  padding: 2px;
  ${desktop({ fontSize: "13px", letterSpacing: "1.5px" })}
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

const Dashboard = () => {
  const [urlData, setUrlData] = useState({
    urls: [],
    count: 0,
  });
  const API_URL = "https://url-shortener-backnd.herokuapp.com/url/dashboard";

  useEffect(() => {
    const getAllUrls = async () => {
      try {
        const data = await axios.get(API_URL);
        const values = data.data.data.urls;
        setUrlData((prevData) => ({
          ...prevData,
          urls: values,
          count: values.length,
        }));
      } catch (err) {
        console.error(err);
      }
    };

    getAllUrls();
  }, []);

  console.log(urlData);

  return (
    <>
      <Outer>
        <WhoHeading>List of shortened URLs</WhoHeading>
        <LoginInfo>
          <Info>Total number of URLs shortened: {urlData.count} </Info>
        </LoginInfo>
        <Table striped bordered hover responsive="lg" className="p-3">
          <thead>
            <tr style={{ textAlign: "center" }}>
              <th>Long URL</th>
              <th>Short URL</th>
              <th>Date</th>
            </tr>
          </thead>

          {urlData.urls.map((ele, i) => (
            <tbody key={i}>
              <tr style={{ fontSize: "12px" }}>
                <td
                  style={{
                    wordWrap: "break-word",
                    minWidth: "200px",
                    maxWidth: "300px",
                  }}
                >
                  <a href={ele.longUrl} target="_blank">
                    {ele.longUrl}
                  </a>
                </td>
                <td>
                  <a href={ele.shortUrl} target="_blank">
                    {ele.shortUrl}
                  </a>
                </td>
                <td>{ele.date}</td>
              </tr>
            </tbody>
          ))}
        </Table>
      </Outer>
    </>
  );
};

export default Dashboard;
