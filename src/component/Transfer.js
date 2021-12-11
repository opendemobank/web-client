import React, {useEffect} from "react";
import axios from 'axios';

import { useLocation } from 'react-router-dom';
import cssClasses from "./signup/customer.module.css";
import useInput from "./hooks/use-input";
import {Button,TextField,Box,Typography, MenuItem, RadioGroup, FormControlLabel, Radio, FormLabel} from '@mui/material';

import {getToken , checkUnauthorisedAccess } from './_manageToken';

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Transfer = () => {

  useEffect(()=>{
    if(account && amt){
      console.log(account)
      setAccountNumber(account)
      setAmount(amt)
    }
  },[])
  
  const user = JSON.parse(localStorage.getItem("user"));
  let accountsIBANs = [];
  if ((user !== null) && (user.accounts !== null)) {
    accountsIBANs = user.accounts.map(a => a.iban);
  }
  
  const [receiverStatus, setReceiverStatus] = React.useState(1);

  let radioHandler = (receiverStatus) => {
    setReceiverStatus(receiverStatus)
  };

  const senderAccountMenuItems = accountsIBANs.map(ai =>
    <MenuItem value={ai}>{ai}</MenuItem>
  );

  const {
    value: sendersAccountNumber,
    hasError: sendersAccountNumberError,
    isValid: sendersAccountNumberIsValid,
    valueChangedHandler: sendersAccountNumberChangedHandler,
    inputBlurHandler: sendersAccountNumberBlurHandler,
  } = useInput((val) => val !== '');

  const {
    value: receiverAccountNumber,
    hasError: receiverAccountNumberError,
    isValid: receiverAccountNumberIsValid,
    valueChangedHandler: receiverAccountNumberChangeHandler,
    inputBlurHandler: receiverAccountNumberBlurHandler,
    setInput: setAccountNumber
  } = useInput((val) => val.length > 0);

  let account = useQuery().get('accountNumber');
  let amt = useQuery().get('amount');
  
  const {
    value: receiverEmail,
    hasError: receiverEmailError,
    isValid: receiverEmailIsValid,
    valueChangedHandler: receiverEmailChangeHandler,
    inputBlurHandler: receiverEmailBlurHandler,
  } = useInput((val) => val.length > 0);

  const {
    value: receiverPhone,
    hasError: receiverPhoneError,
    isValid: receiverPhoneIsValid,
    valueChangedHandler: receiverPhoneChangeHandler,
    inputBlurHandler: receiverPhoneBlurHandler,
  } = useInput((val) => val.length > 0);

  const {
    value: amount,
    hasError: amountHasError,
    isValid: amountIsValid,
    valueChangedHandler: amountChangeHandler,
    inputBlurHandler: amountBlurHandler,
    setInput: setAmount
  } = useInput((val) => val.length > 6);

  const {
    value: description,
    hasError: descriptionHasError,
    isValid: descriptionIsValid,
    valueChangedHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
  } = useInput((val) => val.length <= 30);

  const submitFormHandler = (e) => {
    e.preventDefault();

    // Making every state touched
    sendersAccountNumberBlurHandler();
    receiverAccountNumberBlurHandler();
    receiverEmailBlurHandler();
    amountBlurHandler();
    descriptionBlurHandler();
    
    // Checking for input validity
    if (
      sendersAccountNumberIsValid && (
      receiverAccountNumberIsValid ||
      receiverPhoneIsValid ||
      receiverEmailIsValid) &&
      amountIsValid &&
      descriptionIsValid 
    ) {
      
      let transfer = {
        description : description,
        senderIBAN : sendersAccountNumber,
        recieverPhoneNumber : receiverPhone,
        recieverEmail : receiverEmail,
        recieverIBAN : receiverAccountNumber,
        amount : parseInt(amount)
      }

      console.log(transfer);
      // Transfer API TO trigger
      axios.post(`http://50.17.212.123:8080/api/transfers`, transfer, {
          headers :{
              'Content-Type' : 'application/json',
              'Authorization': getToken()
          }        
      })
      .then((data)=>{
          alert("Money has been transferred")
          window.location.assign('/invoices');
      })
      .catch((error)=>{
          alert("Oops! Something went wrong")
          checkUnauthorisedAccess(error);
      })

      return;
    } else {
      console.log("Invalid Inputs");
    
    }
  };

  let sendersAccountNumberErrorMsg = "";
  let receiverAccountNumberErrorMsg = "";
  let receiverEmailErrorMsg = "";
  let receiverPhoneErrorMsg = "";
  let amountErrorMsg = "";
  let descriptionErrorMsg = "";

  if (sendersAccountNumberError) {
    sendersAccountNumberErrorMsg = "Please, fill this field";
  }
  if (receiverAccountNumberError) {
    receiverAccountNumberErrorMsg = "Please, fill this field";
  }

  if (receiverEmailError) {
    receiverEmailErrorMsg = "Please, fill this field";
  }

  if (receiverPhoneError) {
    receiverPhoneErrorMsg = "Please, fill this field";
  }

  if (amountHasError) {
    amountErrorMsg = "Please, fill this field";
  }

  if (descriptionHasError) {
    descriptionErrorMsg = "Description should be shorter than 30 symbols"
  }


  const receiverAccountNumberTextField = 
    <TextField
      className={cssClasses.input}
      id="outlined-basic"
      label="Recipient Account"
      variant="outlined"
      style={{ margin: "7px 0 0 0" }}
      value={receiverAccountNumber}
      onChange={receiverAccountNumberChangeHandler}
      onBlur={receiverAccountNumberBlurHandler}
      error={receiverAccountNumberError}
      helperText={receiverAccountNumberErrorMsg}
      required
    />;

  const receiverEmailTextField = 
    <TextField
      className={cssClasses.input}
      id="outlined-basic"
      label="Recipient Email"
      variant="outlined"
      style={{ margin: "7px 0 0 0" }}
      value={receiverEmail}
      onChange={receiverEmailChangeHandler}
      onBlur={receiverEmailBlurHandler}
      error={receiverEmailError}
      helperText={receiverEmailErrorMsg}
      required
    />;

  const receiverPhoneTextField = 
    <TextField
      className={cssClasses.input}
      id="outlined-basic"
      label="Recipient Phone"
      variant="outlined"
      style={{ margin: "7px 0 0 0" }}
      value={receiverPhone}
      onChange={receiverPhoneChangeHandler}
      onBlur={receiverPhoneBlurHandler}
      error={receiverPhoneError}
      helperText={receiverPhoneErrorMsg}
      required
    />;
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
                    Transfer
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
            label="Sender Account"
            variant="outlined"
            style={{ margin: "20px 0 0 0" }}
            value={sendersAccountNumber}
            select
            onChange={sendersAccountNumberChangedHandler}
            onBlur={sendersAccountNumberBlurHandler}
            error={sendersAccountNumberError}
            helperText={sendersAccountNumberErrorMsg}
            required
          >
            {senderAccountMenuItems}
          </TextField >
          <FormLabel component="legend">Recipient Information</FormLabel>
          <RadioGroup
              aria-label="gender"
              defaultValue="iban"
              name="radio-buttons-group"
          >
            <FormControlLabel value="iban" control={<Radio onChange={(e) => radioHandler(1)}/>} label="IBAN" />
            <FormControlLabel value="email" control={<Radio onChange={(e) => radioHandler(2)}/>} label="Email" />
            <FormControlLabel value="phone" control={<Radio onChange={(e) => radioHandler(3)}/>} label="Phone" />
          </RadioGroup>
          {receiverStatus === 1 && receiverAccountNumberTextField}
          {receiverStatus === 2 && receiverEmailTextField}
          {receiverStatus === 3 && receiverPhoneTextField}
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
            helperText={amountErrorMsg}
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
            helperText={descriptionErrorMsg}
          />
          <Button variant="contained" type="submit" active="true" style={{ margin: "7px 0 0 0" }}  component="button" sx={{flexGlow: 1}}>
            Transfer
          </Button>
      </form>
        </Box>
    </center>
    );
}

export default Transfer;