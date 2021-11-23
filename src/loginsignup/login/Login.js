import React from "react";
// import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";

import TextField from '@mui/material/TextField';
import cssClasses from './Login.module.css';
import useInput from "../hooks/use-input";
import moneyimg from "../assets/moneyplant.jpg";

const Login = () => {
  // const history = useHistory();

  const {
    value: enteredEmail,
    hasError: emailError,
    isValid: emailIsValid,
    valueChangedHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput((val) => val.includes("@"));

  const {
    value: enteredPassword,
    hasError: passwordHasError,
    isValid: passwordIsValid,
    valueChangedHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput((val) => val.length > 0);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    emailBlurHandler();
    passwordBlurHandler();

    if (emailIsValid && passwordIsValid) {
      console.log("Logging IN");
      // history.push('/');
      return;
    }

    console.log("Something went wrong");
  };


  // Setting up errors for incorrect inputs
  let emailErrorMsg = "";
  if(emailError){
    emailErrorMsg = "Please enter a valid email";
  }
  return (
    <div className={cssClasses.signin}>
      <div className={cssClasses.left}>
        <img className={cssClasses.bgimg} src={moneyimg} alt="moneyplant" />
      </div>
      <div className={cssClasses.right}>
        <div className={cssClasses.content}>
          <h4 className={cssClasses.logo} >Banking App</h4>
          <form
            onSubmit={formSubmitHandler}
            className={cssClasses.form}
            noValidate
            autoComplete="off"
          >
            <TextField
              className={cssClasses.input}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              style={{ margin: "40px 0 0 0" }}
              value={enteredEmail}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              error={emailError}
              helperText={emailErrorMsg}
            />
            <TextField
              className={cssClasses.input}
              id="outlined-basic"
              label="Pasword"
              variant="outlined"
              style={{ margin: "40px 0 0 0" }}
              value={enteredPassword}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              error={passwordHasError}
              helperText={emailErrorMsg}
            />
            
            <p className={cssClasses.forgot}>Forgot Password?</p>
            <button className={cssClasses.signinbtn}>Sign In</button>
            <NavLink to="/signup" style={{ textDecoration: "none" }}>
              <p className={cssClasses.change}>
                New User? <span className={cssClasses.bold}> Sign Up</span>
              </p>
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;