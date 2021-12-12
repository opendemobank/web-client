import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {getToken, checkUnauthorisedAccess } from "./_manageToken";
import {Typography, Table, TableCell, TableContainer, TableHead, TableBody, TableRow, Paper, Box} from '@mui/material';

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
        <Box component="div" m={5} sx={{ border: '1px solid  grey', alignContent:'center' }} >
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableCell>Id</TableCell>
                        <TableCell align="right">Description</TableCell>
                        <TableCell align="right">Receiver's full name</TableCell>
                        <TableCell align="right">Receiver's account number</TableCell>
                        <TableCell align="right">Amount</TableCell>
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
        </Box>
    };
    

    return (
        <Box component="div" m={5} sx={{height:"400px",alignContent:'center' }} >
            <Typography
                    variant="h3"
                    noWrap
                    component="div"
                    m ={2}
                    sx={{ flexGrow: 1 }}
            >
                    Transfers
            </Typography>
            {table}
        </Box> 
    );
}

export default Transfers