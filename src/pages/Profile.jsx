import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import AuthContext from "../context/AuthProvider";
import userApi from "../api/user";
import styles from "./css/Profile.module.css";
import { userActions } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

function Profile(props) {
  const authCtx = useContext(AuthContext);
  const domain = authCtx.domain;
  const token = authCtx.token;
  const errorRef = useRef();
  const nameRef = useRef();
  const blog_nameRef = useRef();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [blog_name, setBlog_name] = useState("");
  const [about, setAbout] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMsg("");
    return () => {
      setErrorMsg("");
    };
  }, [name, blog_name, about]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleBlogNameChange = (event) => {
    setBlog_name(event.target.value);
  };

  const handleAboutChange = (event) => {
    setAbout(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const user = { name, blog_name, about };
    const response = await userApi.updateUserInfo(user, domain, token);
    if (!response.ok) return setErrorMsg(response.problem);

    dispatch(userActions.setUser(response.data.data));
    authCtx.addUser(response.data.data.name);
    navigate("/admin/dashboard");
  };

  let errStyle = null;
  if (errorMsg) {
    errStyle = styles.errmsg;
  } else {
    errStyle = styles.offscreen;
  }
  return (
    <div className={styles.container}>
      {/* <img src={logo} alt="medicsync_logo" className={styles.logo} /> */}

      <p ref={errorRef} className={errStyle}>
        {errorMsg}
      </p>

      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles["form-item"]}>
          <label htmlFor="name" className={styles.label}>
            Name
          </label>
          <input
            ref={nameRef}
            className={styles.input}
            id="name"
            type="name"
            // autoComplete="off"
            onChange={handleNameChange}
            placeholder="Please enter your name"
            value={name}
            required
          />
        </div>

        <div className={styles["form-item"]}>
          <label htmlFor="blog_name" className={styles.label}>
            Blog Name
          </label>
          <input
            ref={blog_nameRef}
            className={styles.input}
            id="blog_name"
            type="blog_name"
            // autoComplete="off"
            onChange={handleBlogNameChange}
            placeholder="Please enter your preferred name"
            value={blog_name}
            required
          />
        </div>

        <div className={styles["form-item"]}>
          <label htmlFor="about" className={styles.label}>
            About
          </label>
          <textarea
            id="about"
            minLength="6"
            type="textarea"
            value={about}
            placeholder="Tell us more about you"
            className={styles.about}
            onChange={handleAboutChange}
            required
          />
        </div>

        <br />
        {isLoading && (
          <button className={styles.button} disabled={true}>
            <i className={`${styles.loading} fa fa-circle-o-notch fa-spin`}></i>
            Loading
          </button>
        )}
        {!isLoading && <button className={styles.button}>Update</button>}
      </form>
    </div>
  );
}

export default Profile;
