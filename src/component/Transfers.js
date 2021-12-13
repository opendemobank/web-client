import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {NavLink, Link} from "react-router-dom";

import {getToken, checkUnauthorisedAccess } from "./_manageToken";
import {Typography, Grid, Button, Table, TableCell, TableContainer, TableHead, TableBody, TableRow, Paper, Box} from '@mui/material';

const Transfers = ()=> {
    const [transfers, setTransfers] = useState([]);
    
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        axios.get(`http://50.17.212.123:8080/api/transfers/user/${user.id}`,{
            headers :{
                'Content-Type' : 'application/json',
                'Authorization': getToken()
            }

        })
        .then((data)=>{
          console.log(data);
          setTransfers(data.data);
        })
        .catch((error)=>{
            setTransfers([]);
            checkUnauthorisedAccess(error);
        })
    }, []);

    let table = "";
    if (transfers !== null && transfers.length > 0) {
        table = 
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableCell><b>Id</b></TableCell>
                    <TableCell align="right"><b>Description</b></TableCell>
                    <TableCell align="right"><b>Receiver's full name</b></TableCell>
                    <TableCell align="right"><b>Receiver's account number</b></TableCell>
                    <TableCell align="right"><b>Amount</b></TableCell>
                </TableHead>
                <TableBody>
                {transfers.map((transfer) => (
                    <TableRow
                        key={transfer.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {transfer.id}
                        </TableCell>
                        <TableCell align="right">{transfer.description}</TableCell>
                        <TableCell align="right">{transfer.receiversFullName}</TableCell>
                        <TableCell align="right">{transfer.accountIBAN}</TableCell>
                        <TableCell align="right">{transfer.amount}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    };
    

    return (
        <>
            <center>
                <Grid container m={4} spacing={1}>
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
                        <Button noWrap component="div" sx={{flexGlow: 1}}  variant="outlined">
                            Transfers
                        </Button>
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
                    Transfers
                </Typography>
                {table}
            </center>
        </>
    );
}

export default Transfers