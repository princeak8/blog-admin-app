import React, { useContext, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import "./css/Index.css";
import postApi from "../api/post";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
// import { fetchDisplayData } from "../store/display-actions";
// import { fetchReportData } from "../store/report-actions";

const Index = (props) => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchReportData(accessToken));
  // }, [accessToken]);

  return (
    <React.Fragment>
      <div className="container-fluid">
        <ToastContainer />
        <Sidebar />

        <div className="itembody">
          <Header />

          <Outlet />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Index;
