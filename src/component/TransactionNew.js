import React, {useEffect} from 'react';
import axios from 'axios';

import cssClasses from "./signup/customer.module.css";
import useInput from "./hooks/use-input";
import {Button,TextField,Box,Typography, Grid} from '@mui/material';
import {Link} from "react-router-dom";
import {getToken , checkUnauthorisedAccess } from './_manageToken';

const TransactionNew = () => {
  let user = JSON.parse(localStorage.getItem('user')) ;

  useEffect(()=>{
    if(user.role!=="ADMIN"){
        checkUnauthorisedAccess('Error: Request failed with status code 401');
  }
  })

  const {
    value: sourceAccountNumber,
    hasError: sourceAccountNumberError,
    isValid: sourceAccountNumberIsValid,
    valueChangedHandler: sourceAccountNumberChangeHandler,
    inputBlurHandler: sourceAccountNumberBlurHandler,
    setInput: setSourceAccountNumber
  } = useInput((val) => val.length > 10);

  const {
    value: targetAccountNumber,
    hasError: targetAccountNumberError,
    isValid: targetAccountNumberIsValid,
    valueChangedHandler: targetAccountNumberChangeHandler,
    inputBlurHandler: targetAccountNumberBlurHandler,
    setInput: setTargetAccountNumber
  } = useInput((val) => val.length > 10);

  const {
    value: amount,
    hasError: amountHasError,
    isValid: amountIsValid,
    valueChangedHandler: amountChangeHandler,
    inputBlurHandler: amountBlurHandler,
  } = useInput((val) => val.length > 0);


  const {
    value: description,
    hasError: descriptionHasError,
    isValid: descriptionIsValid,
    valueChangedHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
  } = useInput((val) => true);

  const submitFormHandler = (e) => {
    e.preventDefault();

    // Making every state touched
    sourceAccountNumberBlurHandler();
    targetAccountNumberBlurHandler();
    amountBlurHandler();
    descriptionBlurHandler();
    
    // Checking for input validity
    if (
      sourceAccountNumberIsValid &&
      targetAccountNumberIsValid &&
      amountIsValid &&
      descriptionIsValid 
    ) {
        console.log("yes")


       axios.post(`http://50.17.212.123:8080/api/transactions` ,
           {'description': description,
           'originIban': sourceAccountNumber,
           'endIban': targetAccountNumber,
           'amount': amount},
            {
           headers :{
               'Content-Type' : 'application/json',
               'Authorization': getToken()
           } 
       })
       .then((data)=>{
           window.location.assign('/transactions');
       })
       .catch((error)=>{
        window.alert(error);
       })


       return;
     } else {
       console.log("Invalid Inputs");  
     }
  };




    return (
      <>
        <Grid container m={3} spacing={1}>
          <Grid style={{alignItems:"right"}} item>
            <Link to="/customer-new">
              <Button noWrap component="div" sx={{flexGlow: 1}}  variant="outlined">
                Create New Account
              </Button>
            </Link>
          </Grid>
          <Grid style={{alignItems:"right"}} item>
            <Link to="/accounts">
              <Button noWrap component="div" sx={{flexGlow: 1}}  variant="outlined">
                Accounts
              </Button>
            </Link>
          </Grid>
          <Grid style={{alignItems:"right"}} item>
            <Link to="/transactions">
              <Button noWrap component="div" sx={{flexGlow: 1}}  variant="outlined">
                Transactions
              </Button>
            </Link>
          </Grid>
          <Grid style={{alignItems:"right"}} item>
            <Button noWrap component="div" sx={{flexGlow: 1}}  variant="outlined">
                Create New Transaction
            </Button>
          </Grid>
        </Grid> 
        <center>
          <Box component="div" m={5} sx={{height:"400px",alignContent:'center' }} >
            <Typography
              variant="h4"
              component="div"
              m ={2}
              sx={{ flexGrow: 1, wordWrap: 'break-word'}}
            >
              Create transaction
            </Typography>
            <form
              onSubmit={submitFormHandler}
              className={cssClasses.form}
              noValidate
              autoComplete="off"
            >
              <TextField
                className={cssClasses.input}
                id="outlined-basic"
                label="Target Account"
                variant="outlined"
                style={{ margin: "7px 0 0 0" }}
                value={sourceAccountNumber}
                onChange={sourceAccountNumberChangeHandler}
                onBlur={sourceAccountNumberBlurHandler}
                error={sourceAccountNumberError}
                required
              />
              <TextField
                className={cssClasses.input}
                id="outlined-basic"
                label="Target Account"
                variant="outlined"
                style={{ margin: "7px 0 0 0" }}
                value={targetAccountNumber}
                onChange={targetAccountNumberChangeHandler}
                onBlur={targetAccountNumberBlurHandler}
                error={targetAccountNumberError}
                required
              />
              <TextField
                name="amount"
                className={cssClasses.input}
                label="Amount to Transfer"
                type="number"
                variant="outlined"
                style={{ margin: "7px 0 0 0" }}
                value={amount}
                onChange={amountChangeHandler}
                onBlur={amountBlurHandler}
                error={amountHasError}
                required
              />
              <TextField
                name="phoneNumber"
                className={cssClasses.input}
                label="Description"
                type="text"
                variant="outlined"
                style={{ margin: "7px 0 0 0" }}
                value={description}
                onChange={descriptionChangeHandler}
                onBlur={descriptionBlurHandler}
                error={descriptionHasError}
              />
              <Button variant="contained" style={{ margin: "7px 0 0 0" }}  component="button" sx={{flexGlow: 1}} onClick={submitFormHandler}>
                Create
              </Button>   
            </form>
          </Box>
        </center>
      </>
    );
}

export default TransactionNew;