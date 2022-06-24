import React, { useContext, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import "./css/Index.css";
// import { useDispatch } from "react-redux";
// import { fetchDisplayData } from "../store/display-actions";
// import { fetchReportData } from "../store/report-actions";
// import AuthContext from "../context/AuthProvider";

const Index = (props) => {
  // const dispatch = useDispatch();
  // const authCtx = useContext(AuthContext);
  // const accessToken = authCtx.token;

  // useEffect(() => {
  //   dispatch(fetchDisplayData(accessToken));
  // }, [dispatch, accessToken]);

  // useEffect(() => {
  //   dispatch(fetchReportData(accessToken));
  // }, [accessToken]);

  return (
    <React.Fragment>
      <div className="container-fluid">
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
