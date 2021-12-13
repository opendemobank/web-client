import React, {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import DateTimePicker from 'react-datetime-picker'
import {Button, TextField, Box, Typography, Grid} from '@mui/material';
import axios from "axios";
import {checkUnauthorisedAccess, getToken} from "./_manageToken";

const TransactionEdit = () => {
    const [transaction, setTransaction] = useState([]);
    const {transactionId} = useParams();
    let [timeValue, onTimeValueChange] = useState(undefined);
    let [amount, onAmountChange] = useState(undefined);
    let [previousAmount, onPreviousAmountChange] = useState(undefined);


    useEffect(() => {
        axios.get(`http://50.17.212.123:8080/api/transactions/${transactionId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getToken()
            }
        })
            .then((data) => {
                console.log(data);
                setTransaction(data.data);
                onPreviousAmountChange(data.data.transfer.amount)
                onTimeValueChange(new Date(data.data.dateTime))

            })
            .catch((error) => {
                setTransaction([]);
                checkUnauthorisedAccess(error);
            })
    }, []);

    function onModifyClicked() {
        updateTransaction(timeValue, amount)
    }

    function updateTransaction(timeValue, amount) {
        console.log(amount)
        axios.post(`http://50.17.212.123:8080/api/transactions/edit`, {
            id: parseInt(transactionId),
            amount: parseInt(amount),
            localDateTime: timeValue
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getToken()
            }
        })
            .then((data) => {
                setTransaction(data.data)
                this.props.history.goBack()
            })
            .catch((error) => {
                checkUnauthorisedAccess(error);
            })
    }

    return (
        <>
            <Grid container m={5} spacing={5}>
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
                            All Accounts
                        </Button>
                    </Link>
                </Grid>
                <Grid style={{alignItems:"right"}} item>
                    <Link to="/transactions">
                        <Button noWrap component="div" sx={{flexGlow: 1}}  variant="outlined">
                            All Transactions
                        </Button>
                    </Link>
                </Grid>
                <Grid style={{alignItems:"right"}} item>
                    <Link to={`/transactions/new`}>
                        <Button noWrap component="div" sx={{flexGlow: 1}}  variant="outlined">
                            Create New Transaction
                        </Button>
                    </Link>
                </Grid>
            </Grid>
            <center>
                <Box component="div" m={5} sx={{border: '1px solid  grey', height: "400px", alignContent: 'center'}}>
                    <Typography
                        variant="h3"
                        noWrap
                        component="div"
                        m={2}
                        sx={{flexGrow: 1}}
                    >
                        transaction {transactionId}
                    </Typography>
                    <form
                        noValidate
                        autoComplete="off"
                    >
                        <DateTimePicker
                            name="time"
                            onChange={onTimeValueChange}
                            value={timeValue}
                        /><br/>

                        <TextField
                            name="amount"
                            onChange = { (e) => onAmountChange(e.currentTarget.value) }
                            required
                        />
                        <p
                            name="previousAmountLabel"
                        />Previous transaction amount: {String(previousAmount)}<br/>

                        <br/>
                        <Button variant="contained" component="button" sx={{flexGlow: 1}} onClick={onModifyClicked}>
                            Modify Transaction
                        </Button>
                    </form>
                </Box>
            </center> 
        </>
    );
}

export default TransactionEdit;