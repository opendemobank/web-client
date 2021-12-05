import React, { useState }  from "react";
import axios from "axios";
// import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";

import TextField from '@mui/material/TextField';
import cssClasses from './Login.module.css';
import useInput from "../hooks/use-input";
import moneyimg from "../assets/moneyplant.jpg";

const Login = () => {
  // const history = useHistory();
  const [loginStatus, serLoginStatus] = useState("");
  // let LoginStatus = "";
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
      axios.post(`http://50.17.212.123:8080/api/users/login?email=${enteredEmail}&password=${enteredPassword}`)
      .then((data)=>{
          serLoginStatus("")
          localStorage.setItem('accessToken', data.data)
          window.location.assign('/accounts')
      })
      .catch(()=>{
        serLoginStatus("Invalid Email or Password")
      })
    }
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
          <p className={cssClasses.error}>{loginStatus}</p>
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
              label="Password"
              type="password"
              variant="outlined"
              style={{ margin: "40px 0 0 0" }}
              value={enteredPassword}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              error={passwordHasError}
              helperText={emailErrorMsg}
            />
            
            <button className={cssClasses.signinbtn}>Login In</button>
            <NavLink to="/signup" style={{ textDecoration: "none" }}>
              <p className={cssClasses.change}>
              </p>
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;