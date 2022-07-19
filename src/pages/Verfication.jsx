import React, { useContext, useState } from "react";
import "./css/Verification.css";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/userSlice";
import * as FiIcon from "react-icons/fi";
import AuthContext from "../context/AuthProvider";

import Search from "../components/Search";
import { ToastContainer } from "react-toastify";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { Capitalize } from "../utils/helpers";
import LoadingSpinner from "../components/LoadingSpinner";

const Verfication = (props) => {
  const authCtx = useContext(AuthContext);
  const accessToken = authCtx.token;
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.userDisplay.isLoading);

  const navigate = useNavigate();

  const handleRefresh = () => {
    // dispatch(fetchDisplayData(accessToken));
  };

  //Get the active tab and filter its columns for search

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="container">
        <ToastContainer />
        <h2>User Verification</h2>
      </div>
    </>
  );
};

export default Verfication;
