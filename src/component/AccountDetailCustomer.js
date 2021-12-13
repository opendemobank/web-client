import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import {getToken , checkUnauthorisedAccess } from "./_manageToken";
import '../App.css';


import {TableRow,Paper,Button,Grid,TableContainer,TableCell,TableBody,Table,Typography} from '@mui/material';


const AccountDetailCustomer = () => {
    const [accountDetail , setAccountDetail] = useState({});
    let { accountId } = useParams();

    useEffect(() => {
        activate()
    }, []);

    function activate(){
        axios.get(`http://50.17.212.123:8080/api/accounts/${accountId}`,{
            headers :{
                'Content-Type' : 'application/json',
                'Authorization': getToken()
            }
        })
        .then((data)=>{
            console.log(data);
            setAccountDetail(data.data)
        })
        .catch((error)=>{
            setAccountDetail({});
            checkUnauthorisedAccess(error);
        })
    }

    return (
        <>
            <center>
                <Grid container m={3} spacing={1}>
                    <Grid style={{alignItems:"right"}} item>
                        <Link to="/user">
                            <Button noWrap component="div" sx={{flexGlow: 1}}  variant="outlined">
                                Accounts
                            </Button>
                        </Link>
                    </Grid>
                    <Grid style={{alignItems:"right"}} item>
                        <Link to="/request-money">
                            <Button noWrap component="div" sx={{flexGlow: 1}}  variant="outlined">
                                Request A Transfer
                            </Button>
                        </Link>
                    </Grid>
                    <Grid style={{alignItems:"right"}} item>
                        <Link to="/transfer">
                            <Button noWrap component="div" sx={{flexGlow: 1}}  variant="outlined">
                                Make A New Transfer
                            </Button>
                        </Link>
                    </Grid>
                    <Grid style={{alignItems:"right"}} item>
                        <Link to="/transfers">
                            <Button noWrap component="div" sx={{flexGlow: 1}}  variant="outlined">
                                Transfers
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
                <hr/>
                <Typography
                    variant="h4"
                    noWrap
                    component="div"
                    m ={2}
                    sx={{ flexGrow: 1 }}
                    >
                    Account Details
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ maxWidth: 650 }} aria-label="simple table">
                        <TableBody>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align=""><b>Account number:</b></TableCell>
                                <TableCell align="right">{accountDetail.iban}</TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align=""><b>Account balance:</b></TableCell>
                                <TableCell align="right">{accountDetail.balance}</TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align=""><b>Currency:</b></TableCell>
                                <TableCell align="right">{accountDetail?.currency?.name}</TableCell>
                            </TableRow>         
                        </TableBody>
                    </Table>
                </TableContainer>
            </center>
        </>
    );
}

export default AccountDetailCustomer;