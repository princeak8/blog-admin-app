import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "./css/Verification.css";

import { userDisplayActions } from "../store/userDisplaySlice";
import _ from "lodash";
import Search from "../components/Search";
import LoadingSpinner from "../components/LoadingSpinner";

const Users = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.userDisplay.isLoading);
  const [selected_specialization, setSelected_specialization] = useState("");

  const handleFilterSelect = (item) => {
    setSelected_specialization(item.target.value);
    dispatch(userDisplayActions.showfilter(false));
    // setCurrentPage(1);
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {/* <div className="full"> */}
      <div className="container">
        <ToastContainer />

        <h2>All Users</h2>
      </div>
      {/* </div> */}
    </>
  );
};

export default Users;
