import React, {useEffect} from 'react';
import axios from 'axios';

import {  useLocation } from 'react-router-dom';
import cssClasses from "./signup/customer.module.css";
import useInput from "./hooks/use-input";
import {Button,TextField,Box,Typography} from '@mui/material';

import {getToken , checkUnauthorisedAccess } from './_manageToken';



//Custom function to get query Params
function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Transfer = () => {
  
  let user = useQuery().get('user')  ;
  useEffect(()=>{
    
    if(user){
      axios.get(`http://50.17.212.123:8080/api/customers/${user}`,{
        headers :{
            'Content-Type' : 'application/json',
            'Authorization': getToken()
        }        
      })
      .then((data)=>{
        console.log(data)
            setFullName(data.data.fullName);
            let accounts = data.data.accounts;
            let account = accounts.filter(({accountType})=> accountType === "PRIMARY")
            if( account.length > 0 ){
              setAccountNumber(account[0].iban);

            } 

      })
      .catch((error)=>{
          checkUnauthorisedAccess(error);
      })
  }

  })

  const {
    value: name,
    hasError: nameError,
    isValid: nameIsValid,
    valueChangedHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    setInput : setFullName
  } = useInput((val) => val.trim() !== "");

  const {
    value: accountNumber,
    hasError: accountNumberError,
    isValid: accountNumberIsValid,
    valueChangedHandler: accountNumberChangeHandler,
    inputBlurHandler: accountNumberBlurHandler,
    setInput: setAccountNumber
  } = useInput((val) => val.length > 10);

  const {
    value: amount,
    hasError: amountHasError,
    isValid: amountIsValid,
    valueChangedHandler: amountChangeHandler,
    inputBlurHandler: amountBlurHandler,
  } = useInput((val) => val.length > 6);


  const {
    value: description,
    hasError: descriptionHasError,
    isValid: descriptionIsValid,
    valueChangedHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
  } = useInput((val) => val.length > 6);

  const submitFormHandler = (e) => {
    e.preventDefault();

    // Making every state touched
    nameBlurHandler();
    accountNumberBlurHandler();
    amountBlurHandler();
    descriptionBlurHandler();
    
    // Checking for input validity
    if (
      nameIsValid &&
      accountNumberIsValid &&
      amountIsValid &&
      descriptionIsValid 
    ) {
 
      // Transfer API TO trigger
    //   axios.post(`http://50.17.212.123:8080/api/customer`, customer ,{
    //       headers :{
    //           'Content-Type' : 'application/json',
    //           'Authorization': getToken()
    //       }        
    //   })
    //   .then((data)=>{
    //       window.location.assign('/accounts');
    //   })
    //   .catch((error)=>{
    //       checkUnauthorisedAccess(error);
    //   })


    //   return;
    // } else {
    //   console.log("Invalid Inputs");
    
    // }

  }
  };




    return (
    <center>
        <Box component="div" m={5} sx={{height:"400px",alignContent:'center' }} >
            <Typography
                    variant="h3"
                    noWrap
                    component="div"
                    m ={2}
                    sx={{ flexGrow: 1 }}
            >
                    Money Transfer
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
            label="Recipient Name"
            variant="outlined"
            style={{ margin: "20px 0 0 0" }}
            value={name}
            onChange={nameChangedHandler}
            onBlur={nameBlurHandler}
            error={nameError}
            required
          />
          <TextField
            className={cssClasses.input}
            id="outlined-basic"
            label="Recipient Account"
            variant="outlined"
            style={{ margin: "7px 0 0 0" }}
            value={accountNumber}
            onChange={accountNumberChangeHandler}
            onBlur={accountNumberBlurHandler}
            error={accountNumberError}
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
        <Button variant="contained" style={{ margin: "7px 0 0 0" }}  component="button" sx={{flexGlow: 1}}>
                        Transfer
        </Button>   
      </form>
        </Box>
    </center>
    );
}

export default Transfer;