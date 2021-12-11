import React from 'react';
import {useParams} from 'react-router-dom';

import {Button, TextField, Box, Typography} from '@mui/material';
import axios from "axios";
import {checkUnauthorisedAccess, getToken} from "./_manageToken";
import useInput from "./hooks/use-input";

const TransactionEdit = () => {
    const {accountId, transactionId, setTransactionDetails} = useParams();

    const {
        value: time,
        valueChangedHandler: timeChangeHandler,
    } = useInput((val) => val);

    const {
        value: amount,
        valueChangedHandler: amountChangeHandler,
    } = useInput((val) => val);

    function onModifyClicked(){
        updateTransaction(time, amount)
    }

    function updateTransaction(time, amount){

        axios.put(`http://50.17.212.123:8080/api/accounts/${transactionId}`, {
            time: time,
            amount: amount
        },{
            headers :{
                'Content-Type' : 'application/json',
                'Authorization': getToken()
            }
        })
            .then((data)=>{
                setTransactionDetails(data.data)
                this.props.history.goBack()
            })
            .catch((error)=>{
                checkUnauthorisedAccess(error);
            })
    }

    return (
        <>
            <Box component="div" m={5} sx={{border: '1px solid  grey', height: "400px", alignContent: 'center'}}>
                <Typography
                    variant="h3"
                    noWrap
                    component="div"
                    m={2}
                    sx={{flexGrow: 1}}
                >
                    Account {accountId}
                    Transaction {transactionId}
                </Typography>
                <form
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="outlined-basic"
                        label="New timestamp"
                        variant="outlined"
                        required
                        onChange={timeChangeHandler}

                    /><br/>

                    <TextField
                        name="password"
                        label="New amount"
                        variant="outlined"
                        required
                        onChange={amountChangeHandler}

                    />
                    <br/>
                    <Button variant="contained" component="button" sx={{flexGlow: 1}} onClick={onModifyClicked}>
                        Modify Transaction
                    </Button>
                </form>
            </Box>
        </>
    );
}

export default TransactionEdit;