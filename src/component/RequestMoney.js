import React, { useEffect,useState } from 'react';
import { getToken, checkUnauthorisedAccess } from './_manageToken';
import {TextField,InputLabel,Select, MenuItem} from "@mui/material";
import axios from 'axios';
import QRCode from 'react-qr-code';
import useInput from './hooks/use-input';
// import {NavLink, Link} from "react-router-dom";

import {Grid,Box,Typography} from '@mui/material';


const RequestMoney = ()=> {
    const [accounts, setAccounts] = useState([])
    useEffect(()=>{
        activate()

    },[])

    function activate(){
        axios.get(`http://50.17.212.123:8080/api/accounts/customer`,{
            headers :{
                'Content-Type' : 'application/json',
                'Authorization': getToken()
            }        
          })
          .then((data)=>{
                setAccounts(data.data);
          })
          .catch((error)=>{
                setAccounts([])
                checkUnauthorisedAccess(error);
          })
    }
    
    const {
    value: amount,
    // hasError: balanceHasError,
    // isValid: balanceIsValid,
    valueChangedHandler: amountChangeHandler,
    inputBlurHandler: amountBlurHandler,
    } = useInput((val) => val);
    
    const {
        value: account,
        hasError: accountHasError,
        valueChangedHandler: accountChangeHandler,
        inputBlurHandler: accountBlurHandler,
    } = useInput((val) => val);
    

    return (
        <center>
            <form style={{width: '30%' }}>
            <InputLabel id="demo-simple-select-label">Account</InputLabel>  
              <Select
                style={{ width: '100%',margin: '5px 0 20px 0' }}
                value={account}
                variant="outlined"
                label="User Type"                
                onChange={accountChangeHandler}
                onBlur={accountBlurHandler}
                error={accountHasError}
                required
              >

                {
                accounts.map((value) => (
                    <MenuItem value={`${value.iban}`}>{value.iban}</MenuItem>
                ))}
              
              </Select>
              <TextField
              name="balance"
              label="Amount to Pay"
              type="number"
              variant="outlined"
              style={{ width: '100%',margin: '20px 0 0 0' }}
              value={amount}
              onChange={amountChangeHandler}
              onBlur={amountBlurHandler}
              required
            />    
            </form>
        { account && amount ?
            <Box component="div" m={5} sx={{ height:"500px",alignContent:'center' }} >
                <Typography
                        variant="h3"
                        noWrap
                        component="div"
                        m ={2}
                        sx={{ flexGrow: 1 }}
                        >
                        Scan to Pay
                </Typography>
                <Grid container style={{display:'flex',justifyContent:'center',  margin: "50px 0 0  0"}}>
                            <QRCode value={`${window.location.origin}/transfer?accountNumber=${account}&amount=${amount}`} />
                </Grid>

            </Box> : <></>
        }
        </center>
    );
}

export default RequestMoney;