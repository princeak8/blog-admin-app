import React, { useContext, Suspense, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthContext from "./context/AuthProvider";
import Login from "./pages/Login";
import LoadingSpinner from "./components/LoadingSpinner";
import "./App.css";
import Add_posts from "./pages/Add_posts";
import Edit_post from "./pages/Edit_post";

import { useDispatch } from "react-redux";
import { postActions } from "./store/postsSlice";
import postApi from "./api/post";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Posts = React.lazy(() => import("./pages/Posts"));
const Settings = React.lazy(() => import("./components/Settings"));
const Index = React.lazy(() => import("./pages/Index"));
const Verfication = React.lazy(() => import("./pages/Verfication"));
const Users = React.lazy(() => import("./pages/ViewUsers"));

function App() {
  const authCtx = useContext(AuthContext);
  const accessToken = authCtx.token;
  const domain = authCtx.domain;
  const dispatch = useDispatch();

  const getAllPosts = async () => {
    const response = await postApi.getAllPosts(domain, accessToken);
    
    if (!response.ok) return console.log(response.data.error);

    dispatch(postActions.initializePosts(response.data.data));
    // setPosts(response.data.data);
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  // console.log("Domain", authCtx.domain);

  // console.log("Token", authCtx.token);

  return (
    <Suspense
      fallback={
        <div className="centered">
          <LoadingSpinner />
        </div>
      }
    >
      <Routes>
        <Route path="/admin/login" element={<Login />} />

        {authCtx.isLoggedIn ? (
          <>
            <Route path="/admin/" element={<Index />}>
              <Route index element={<Dashboard />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/users/" element={<Users />} />
              <Route path="/admin/users/view_users" element={<Users />} />
              {/* <Route
          path="/admin/users/view_users/:user_id"
          element={<UserDetail />}
        /> */}
              <Route
                path="/admin/users/verify_users"
                element={<Verfication />}
              />
              {/* <Route
          path="/admin/users/verify_users/:user_id"
          element={<UserProfile />}
        /> */}
              <Route path="/admin/posts" element={<Posts />} />
              <Route path="/admin/posts/add" element={<Add_posts />} />
              <Route path="/admin/posts/:id" element={<Edit_post />} />
              <Route path="/admin/settings" element={<Settings />} />
            </Route>
            <Route
              path="/"
              element={<Navigate to="/admin/dashboard" replace />}
            />
            <Route path="*" element={<Index />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Login />} />
          </>
        )}
      </Routes>
    </Suspense>
  );
}

export default App;
