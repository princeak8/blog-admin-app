import React, { useRef, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import styles from "./css/LoginForm.module.css";
import authApi from "../api/auth";
import logo from "./asset/medicsynclogo.png";

const LoginForm = () => {
  const authCtx = useContext(AuthContext);
  const emailRef = useRef();
  const errorRef = useRef();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMsg("");
    return () => {
      setErrorMsg("");
    };
  }, [email, password]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleCheckBoxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const result = await authApi.loginUser(email, password);
    if (!result.ok)
      return setErrorMsg(
        result.data.error ? result.data.error : "Login Failed"
      );

    console.log(result);
    const name = result.data.user.name;
    const accessToken = result.data.access_token;
    const expirationTime = new Date(
      new Date().getTime() + result.data.expires_in * 1000
    );
    authCtx.login(name, accessToken, expirationTime);

    navigate("/admin/");

    setEmail("");
    setPassword("");

    setIsLoading(false);
    errorRef.current.focus();
  };

  let errStyle = null;
  if (errorMsg) {
    errStyle = styles.errmsg;
  } else {
    errStyle = styles.offscreen;
  }

  return (
    <div className={styles.container}>
      <img src={logo} alt="medicsync_logo" className={styles.logo} />

      <p ref={errorRef} className={errStyle}>
        {errorMsg}
      </p>

      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles["form-item"]}>
          <label htmlFor="email" className={styles.label}>
            Email Address
          </label>
          <input
            ref={emailRef}
            className={styles.input}
            id="email"
            type="email"
            // autoComplete="off"
            onChange={handleEmailChange}
            placeholder="Please enter your email address"
            value={email}
            required
          />
        </div>

        <div className={styles["form-item"]}>
          <label htmlFor="email" className={styles.label}>
            Password
          </label>
          <input
            id="password"
            minLength="6"
            type="password"
            value={password}
            placeholder="Please enter your password"
            className={styles.input}
            onChange={handlePasswordChange}
            required
          />
        </div>

        <div className={styles["form-item2"]}>
          <input
            //ref={isCheckedRef}
            onChange={handleCheckBoxChange}
            id="keepLoggedIn"
            type="checkbox"
            className={styles.checkbox}
          />
          <label htmlFor="keepLoggedIn" className={styles.checkboxlabel}>
            Keep me Logged in
          </label>
        </div>
        <br />
        {isLoading && (
          <button className={styles.button} disabled={true}>
            <i className={`${styles.loading} fa fa-circle-o-notch fa-spin`}></i>
            Loading
          </button>
        )}
        {!isLoading && <button className={styles.button}>Login</button>}
      </form>
    </div>
  );
};

export default LoginForm;
