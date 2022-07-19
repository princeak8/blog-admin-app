import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthProvider";
import dayjs from "dayjs";
import styles from "./css/Dashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, NavLink } from "react-router-dom";

import { Capitalize } from "../utils/helpers";
import * as ImIcon from "react-icons/im";

const Dashboard = () => {
  const authCtx = useContext(AuthContext);
  const isLoading = useSelector((state) => state.userDisplay.isLoading);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postsDisplay.allPosts);

  return (
    <div className={styles["container-fluid"]}>
        <h1>Dashboard</h1>

        <div style={{display:'flex', width: '80%', flexDirection: 'row'}}>
              <Link to="/admin/posts" style={{width: '40%', height: 220, margin: 20, border: 'solid thin #000', backgroundColor: 'grey', position: 'relative'}}>
                  <h1 style={{textAlign:'center', fontSize: 48}}>POSTS</h1>
                  <div style={{position: 'absolute', bottom: 0, left:0}}>
                      <b>PUBLISHED:</b>{posts.length} | <b>UNPUBLISHED:</b>0
                  </div>
              </Link>
            <div style={{width: '40%', height: 220, margin: 20, border: 'solid thin #000'}}>

            </div>
        </div>

    </div>
  );
};

export default Dashboard;
