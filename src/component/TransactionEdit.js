import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import DateTimePicker from 'react-datetime-picker'
import {Button, TextField, Box, Typography} from '@mui/material';
import axios from "axios";
import {checkUnauthorisedAccess, getToken} from "./_manageToken";
import useInput from "./hooks/use-input";

const TransactionEdit = () => {
    const [ Transaction, setTransaction] = useState([]);
    const {transactionId} = useParams();

    let {
        value: time,
        valueChangedHandler: timeChangeHandler,
    } = useInput((val) => val);

    let {
        value: amount,
        valueChangedHandler: amountChangeHandler,
    } = useInput((val) => val);

    useEffect(() => {
        axios.get(`http://50.17.212.123:8080/api/transactions/${transactionId}`,{
            headers :{
                'Content-Type' : 'application/json',
                'Authorization': getToken()
            }
        })
            .then((data)=>{
                console.log(data);
                setTransaction(data.data);
                amount = data.data.transfer.amount
            })
            .catch((error)=>{
                setTransaction([]);
                checkUnauthorisedAccess(error);
            })
    }, []);

    function onModifyClicked(){
        updateTransaction(time, amount)
    }

    function updateTransaction(time, amount){

        axios.put(`http://50.17.212.123:8080/api/transactions/edit`, {
            id: transactionId,
            amount: amount,
            localDateTime: time
        },{
            headers :{
                'Content-Type' : 'application/json',
                'Authorization': getToken()
            }
        })
            .then((data)=>{
                setTransaction(data.data)
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
                    sx={{flexGrow: 1}}>
                    Transaction {transactionId}
                </Typography>
                <form
                    noValidate
                    autoComplete="off"
                >
                    <DateTimePicker
                        label="New timestamp"
                        variant="outlined"
                        onChange={date => {
                            time = date
                            console.log(time)
                        }}
                        defaultValue={Transaction.transfer !=null ? Transaction.transfer.localDateTime : ""}
                        required
                    /><br/>

                    <TextField
                        name="amount"
                        label="New amount"
                        variant="outlined"
                        defaultValue={Transaction.transfer!=null ? Transaction.transfer.amount : ""}
                        onChange={amountChangeHandler}
                        required
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