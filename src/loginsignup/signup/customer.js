import React from "react";
// import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";

import TextField from "@mui/material/TextField";
import cssClasses from "./customer.module.css";
import useInput from "../hooks/use-input";
import moneyimg from "../assets/moneyplant.jpg";

const Customer = () => {

  const {
    value: name,
    hasError: nameError,
    isValid: nameIsValid,
    valueChangedHandler: nameChangreHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput((val) => val.trim() !== "");

  const {
    value: email,
    hasError: emailError,
    isValid: emailIsValid,
    valueChangedHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput((val) => val.includes("@"));

  const {
    value: password,
    hasError: passwordHasError,
    isValid: passwordIsValid,
    valueChangedHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput((val) => val.length > 6);


  const {
    value: phoneNumber,
    hasError: phoneNumberHasError,
    isValid: phoneNumberIsValid,
    valueChangedHandler: phoneNumberChangeHandler,
    inputBlurHandler: phoneNumberBlurHandler,
  } = useInput((val) => val.length > 6);

  const {
    value: accountNumber,
    hasError: accountNumberHasError,
    isValid: accountNumberIsValid,
    valueChangedHandler: accountNumberChangeHandler,
    inputBlurHandler: accountNumberBlurHandler,
  } = useInput((val) => val.length > 10);



  // Form submitting Handler
  const submitFormHandler = (e) => {
    e.preventDefault();

    // Making every state touched
    nameBlurHandler();
    emailBlurHandler();
    passwordBlurHandler();
    phoneNumberBlurHandler();
    accountNumberBlurHandler();
    
    // Checking for input validity
    if (
      nameIsValid &&
      emailIsValid &&
      passwordIsValid &&
      phoneNumberIsValid &&
      accountNumberIsValid
    ) {
      console.log("Invalid");

      return;
    } else {
      console.log("Invalid Inputs");
    
    }

  };

  // Setting up errors for incorrect inputs
  let emailErrorMsg = "";
  let nameErrorMsg = "";
  let passwordErrorMsg = "";
  let accountNumberErrorMsg = "";
  let phoneNumberErrorMsg = "";


  if (emailError) {
    emailErrorMsg = "Please enter a valid email";
  }

  if (nameError) {
    nameErrorMsg = "Please enter a name to represent you";
  }

  if (passwordHasError) {
    passwordErrorMsg = "Password has to be at least 7 characters";
  }

  if (accountNumberHasError) {
    accountNumberErrorMsg = "Account Number has to be at least 10 characters";
  }
  
  if (phoneNumberHasError) {
    phoneNumberErrorMsg = "Phone Number has to be at least 7 characters";
  }

  return (
    <div className={cssClasses.signin}>
      <div className={cssClasses.left}>
        <img className={cssClasses.bgimg} src={moneyimg} alt="moneyplant" />
      </div>
      <div className={cssClasses.right}>
        <div className={cssClasses.content}>
          <h4 className={cssClasses.logo}>Banking App</h4>
          <form
            onSubmit={submitFormHandler}
            className={cssClasses.form}
            noValidate
            autoComplete="off"
          >
            <TextField
              className={cssClasses.input}
              id="outlined-basic"
              label="Name"
              variant="outlined"
              style={{ margin: "20px 0 0 0" }}
              value={name}
              onChange={nameChangreHandler}
              onBlur={nameBlurHandler}
              error={nameError}
              helperText={nameErrorMsg}
              required
            />
            <TextField
              className={cssClasses.input}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              style={{ margin: "7px 0 0 0" }}
              value={email}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              error={emailError}
              helperText={emailErrorMsg}
            />
            <TextField
              name="password"
              className={cssClasses.input}
              label="Password"
              type="password"
              variant="outlined"
              style={{ margin: "7px 0 0 0" }}
              value={password}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              error={passwordHasError}
              helperText={passwordErrorMsg}
              required
            />

            <TextField
              name="phoneNumber"
              className={cssClasses.input}
              label="Phone Number"
              type="text"
              variant="outlined"
              style={{ margin: "7px 0 0 0" }}
              value={phoneNumber}
              onChange={phoneNumberChangeHandler}
              onBlur={phoneNumberBlurHandler}
              error={phoneNumberHasError}
              helperText={phoneNumberErrorMsg}
              required
            />

            <TextField
              name="accountNumber"
              className={cssClasses.input}
              label="Primary Account Number"
              type="text"
              variant="outlined"
              style={{ margin: "7px 0 0 0" }}
              value={accountNumber}
              onChange={accountNumberChangeHandler}
              onBlur={accountNumberBlurHandler}
              error={accountNumberHasError}
              helperText={accountNumberErrorMsg}
              required
            />

            <button className={cssClasses.signinbtn}>Sign Up</button>
            <NavLink to="/login" style={{ textDecoration: "none" }}>
              <p className={cssClasses.change}>
              Already have an account? <span className={cssClasses.bold}> Login</span>
              </p>
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Customer;
