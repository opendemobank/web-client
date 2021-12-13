import React, { useState, useEffect } from 'react';
import { useParams, NavLink, Link } from 'react-router-dom';
import {getToken, checkUnauthorisedAccess } from "./_manageToken";
import {TableRow,Paper,Button,Grid,TableContainer,TableCell,TableBody,Table,Box,Typography} from '@mui/material';
import axios from 'axios';

const TransactionDetail = () => {
    const [ TransactionDetail, setTransactionDetail] = useState([]);
    const { transactionId } = useParams();

    useEffect(() => {
        axios.get(`http://50.17.212.123:8080/api/transactions/${transactionId}`,{
            headers :{
                'Content-Type' : 'application/json',
                'Authorization': getToken()
            }

        })
        .then((data)=>{
          console.log(data);
          setTransactionDetail(data.data);
        })
        .catch((error)=>{
            setTransactionDetail([]);
            checkUnauthorisedAccess(error);
        })
    }, []);

    function callBackTransaction(){
        axios.post(`http://50.17.212.123:8080/api/transactions/storno`, {
            id: TransactionDetail.transfer.id
        },{
            headers :{
                'Content-Type' : 'application/json',
                'Authorization': getToken()
            }
        })
            .then((data)=>{
                this.props.history.goBack()
            })
            .catch((error)=>{
                checkUnauthorisedAccess(error);
            })
    }

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
                    <Link to={`/transactions/new`}>
                        <Button noWrap component="div" sx={{flexGlow: 1}}  variant="outlined">
                            Create New Transaction
                        </Button>
                    </Link>
                </Grid>
            </Grid> 
            <center>
                <Box component="div" m={5} sx={{height:"400px",alignContent:'center' }} >
                    <Typography
                        variant="h4"
                        noWrap
                        component="div"
                        m ={2}
                        sx={{ flexGrow: 1 }}
                    >
                        Transaction {transactionId}
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ maxWidth: 650 }} aria-label="simple table">
                            <TableBody>
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align=""><b>Transaction Type:</b></TableCell>
                                    <TableCell align="right">{TransactionDetail.transfer!=null ? TransactionDetail.transfer.description : ""}</TableCell>
                                </TableRow>
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align=""><b>Account Name:</b></TableCell>
                                    <TableCell align="right">{TransactionDetail.transfer!=null ? TransactionDetail.transfer.receiversFullName : ""}</TableCell>
                                </TableRow>
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align=""><b>Account Number:</b></TableCell>
                                    <TableCell align="right">{TransactionDetail.transfer!=null ? TransactionDetail.transfer.accountIBAN : ""}</TableCell>
                                </TableRow>
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align=""><b>Amount Withdrawal:</b></TableCell>
                                    <TableCell align="right">{TransactionDetail.transfer!=null ? TransactionDetail.transfer.amount : ""}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Grid container spacing={1} style={{ margin: "7px 0 0 0" }}>
                        <Grid item xs={6}>
                            <Button variant="contained" component="button" sx={{flexGlow: 1}} onClick={callBackTransaction}>
                                Call Back Transaction
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <NavLink to={`/edit/${transactionId}`}>
                                <Button variant="contained" component="button" sx={{flexGlow: 1}}>
                                    Modify Transaction
                                </Button>
                            </NavLink>
                        </Grid>
                    </Grid>
                </Box>
            </center>
        </>
    );
}

export default TransactionDetail;