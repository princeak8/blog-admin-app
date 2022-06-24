import { useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthContext from "../context/AuthProvider";
import LoadingSpinner from "../components/LoadingSpinner";
import styles from "./css/Posts.module.css";
import Search from "../components/Search";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import * as FiIcon from "react-icons/fi";

const Posts = () => {
  const isLoading = useSelector((state) => state.userDisplay.isLoading);
  const dispatch = useDispatch();
  const authCtx = useContext(AuthContext);
  const accessToken = authCtx.token;

  return (
    <>
      <div className={styles.container}>
        <h1>Posts</h1>
      </div>
    </>
  );
};

export default Posts;
