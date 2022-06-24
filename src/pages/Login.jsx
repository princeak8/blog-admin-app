import React from "react";
import LoginForm from "../components/LoginForm";
import styles from "./css/Login.module.css";

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
