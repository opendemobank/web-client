import React from "react";
import axios from "axios";



import {getToken , checkUnauthorisedAccess} from "../_manageToken";

import {TextField,InputLabel,Select, MenuItem} from "@mui/material";
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

  // const {
  //   value: accountNumber,
  //   hasError: accountNumberHasError,
  //   isValid: accountNumberIsValid,
  //   valueChangedHandler: accountNumberChangeHandler,
  //   inputBlurHandler: accountNumberBlurHandler,
  // } = useInput((val) => val.length > 10);


  const {
    value: balance,
    // hasError: balanceHasError,
    // isValid: balanceIsValid,
    valueChangedHandler: balanceChangeHandler,
    inputBlurHandler: balanceBlurHandler,
  } = useInput((val) => val);


  const {
    value: accountType,
    hasError: accountTypeHasError,
    valueChangedHandler: accountTypeChangeHandler,
    inputBlurHandler: accountTypeBlurHandler,
  } = useInput((val) => val);

  const {
    value: userType,
    hasError: userTypeHasError,
    valueChangedHandler: userTypeChangeHandler,
    inputBlurHandler: userTypeBlurHandler,
  } = useInput((val) => val);

  // Form submitting Handler
  const submitFormHandler = (e) => {
    e.preventDefault();

    // Making every state touched
    nameBlurHandler();
    emailBlurHandler();
    passwordBlurHandler();
    phoneNumberBlurHandler();
    // accountNumberBlurHandler();
    accountTypeBlurHandler();
    userTypeBlurHandler();
    
    // Checking for input validity
    if (
      nameIsValid &&
      emailIsValid &&
      passwordIsValid &&
      phoneNumberIsValid 
      // accountNumberIsValid 
    ) {
        let account = {
          accountType : accountType,
          openDate : new Date(),
          balance : balance || 0,
        }      
        let customer = {
          email : email,
          password : password,
          fullName : name,
          phoneNumber : phoneNumber,
          role : userType,
          accounts : [account]
        }

        console.log(customer);

        axios.post(`http://50.17.212.123:8080/api/customers`, customer ,{
          headers :{
              'Content-Type' : 'application/json',
              'Authorization': getToken()
          }        
      })
      .then((data)=>{
          window.location.assign('/accounts');
      })
      .catch((error)=>{
          checkUnauthorisedAccess(error);
      })


      return;
    } else {
      console.log("Invalid Inputs");
    
    }

  };

  // Setting up errors for incorrect inputs
  let emailErrorMsg = "";
  let nameErrorMsg = "";
  let passwordErrorMsg = "";
  // let accountNumberErrorMsg = "";
  let phoneNumberErrorMsg = "";


  if (emailError) {
    emailErrorMsg = "Please enter a valid email";
  }

  if (nameError) {
    nameErrorMsg = "Enter a customer name";
  }

  if (passwordHasError) {
    passwordErrorMsg = "Password has to be at least 7 characters";
  }

  // if (accountNumberHasError) {
  //   accountNumberErrorMsg = "Account Number has to be at least 10 characters";
  // }
  
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
          <h2>Create A New Account</h2>
          <form
            onSubmit={submitFormHandler}
            className={cssClasses.form}
            noValidate
            autoComplete="off"
          >
            <TextField
              className={cssClasses.input}
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
              label="Email"
              variant="outlined"
              style={{ margin: "7px 0 0 0" }}
              value={email}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              error={emailError}
              helperText={emailErrorMsg}
              required
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

            {/* <TextField
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
            /> */}
            <TextField
              name="balance"
              className={cssClasses.input}
              label="Initial Account Balance"
              type="number"
              variant="outlined"
              style={{ margin: "7px 0 0 0" }}
              value={balance}
              onChange={balanceChangeHandler}
              onBlur={balanceBlurHandler}
              required
            />            
            <InputLabel id="demo-simple-select-label">Account Type</InputLabel>
              <Select
                style={{ margin: "7px 0 0 0" }}
                className={cssClasses.input}
                value={accountType}
                label="Account Type"
                variant="outlined"
                onChange={accountTypeChangeHandler}
                onBlur={accountTypeBlurHandler}
                error={accountTypeHasError}
                required
              >
                <MenuItem value={'PRIMARY'}>Primary</MenuItem>
                <MenuItem value={'SECONDARY'}>Secondary</MenuItem>
              </Select>

              <InputLabel id="demo-simple-select-label">User Type</InputLabel>
              <Select
                style={{ margin: "7px 0 0 0" }}
                className={cssClasses.input}
                value={userType}
                variant="outlined"
                label="User Type"
                onChange={userTypeChangeHandler}
                onBlur={userTypeBlurHandler}
                error={userTypeHasError}
                required
              >
                <MenuItem value={'ADMIN'}>Admin</MenuItem>
                <MenuItem value={'USER'}>Customer</MenuItem>
              </Select>

            <button className={cssClasses.signinbtn}>Create</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Customer;
