import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthProvider";
import dayjs from "dayjs";
import styles from "./css/Dashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { Capitalize } from "../utils/helpers";
import * as ImIcon from "react-icons/im";

const Dashboard = () => {
  const authCtx = useContext(AuthContext);
  const isLoading = useSelector((state) => state.userDisplay.isLoading);
  const dispatch = useDispatch();

  return (
    <div className={styles["container-fluid"]}>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
