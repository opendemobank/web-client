import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import {getToken, checkUnauthorisedAccess } from "./_manageToken";
import {TableRow,Paper,Button,Grid,TableContainer,TableCell,TableBody,Table,Box,Typography} from '@mui/material';
import axios from 'axios';

const TransactionDetail = () => {
    const [ TransactionDetail, setTransactionDetail] = useState([]);
    const { accountId, transactionId } = useParams();

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
            <Box component="div" m={5} sx={{ border: '1px solid  grey',height:"400px",alignContent:'center' }} >
                <Typography
                        variant="h3"
                        noWrap
                        component="div"
                        m ={2}
                        sx={{ flexGrow: 1 }}
                        >
                        Account {accountId}
                        <br />
                        Transaction {transactionId}
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ maxWidth: 650 }} aria-label="simple table">
                        <TableBody>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="">Transaction Type:</TableCell>
                                <TableCell align="right">{"Withdrawal"}</TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="">Account Name:</TableCell>
                                <TableCell align="right">{TransactionDetail.transfer!=null ? TransactionDetail.transfer.receiversFullName : ""}</TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="">Account Number:</TableCell>
                                <TableCell align="right">{TransactionDetail.transfer!=null ? TransactionDetail.transfer.accountIBAN : ""}</TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="">Amount Withdrawal:</TableCell>
                                <TableCell align="right">{TransactionDetail.transfer!=null ? TransactionDetail.transfer.amount : ""}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container m={5}>
                    <Grid item xs={2}>
                        <Button variant="contained" component="button" sx={{flexGlow: 1}} onClick={callBackTransaction}>
                            Call Back Transaction
                        </Button>
                    </Grid>
                    <Grid item xs={2}>
                        <NavLink to="edit">
                            <Button variant="contained" component="button" sx={{flexGlow: 1}} >
                                Modify Transaction
                            </Button>
                        </NavLink>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default TransactionDetail;