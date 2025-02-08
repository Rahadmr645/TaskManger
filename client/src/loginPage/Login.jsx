import React, { useContext } from "react";
import styles from "./login.module.css";

import { Context } from '../context/StoreContext'

const Login = () => {

  const {
    currentState,
    formData,
    handleChange,
    handleSubmit,
    setCurrentState,
  } = useContext(Context);

  return (
    <div className={styles.logincontainer}>
      <form onSubmit={handleSubmit} className={styles.loginform}>
        <div className={styles.logintitle}>
          <h1>{currentState}</h1>
          <img onClick={() => setShowlogin(false)} src="/assets/cross_icon.png" alt="" />
        </div>
        <div className={styles.logininput}>
          {currentState === "Sign Up" && (
            <input name="name" onChange={handleChange} value={formData.name} type="text" placeholder="Enter your name" autoComplete="off" />
          )}
          <input name="email" onChange={handleChange} value={formData.email} type="email" placeholder="Enter your email" />
          <input name="password" onChange={handleChange} value={formData.password} type="password" placeholder="Enter password" />
        </div>
        <div className={styles.btnstate}>
          <button type="submit">{currentState}</button>
        </div>

        <div className={styles.logininfo}>
          <div className={styles.check}>
            <label htmlFor="checkbox">Agree with us </label>
            <input id="checkbox" type="checkbox" />
          </div>
          <div className={styles.info}>
            {currentState === "Sign Up" ? (
              <p>Already have an account? <span onClick={() => setCurrentState("Login")}>Click here</span></p>
            ) : (
              <p>Don't have an account? <span onClick={() => setCurrentState("Sign Up")}>Click here</span></p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
