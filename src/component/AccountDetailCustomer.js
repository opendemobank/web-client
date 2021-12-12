import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams, NavLink } from 'react-router-dom';
import useInput from "./hooks/use-input";
import {getToken , checkUnauthorisedAccess } from "./_manageToken";
import '../App.css';


import {TableRow,Paper,Button,TextField,Grid,TableContainer,TableCell,TableBody,Table,Box,Typography} from '@mui/material';


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
            <Box component="div" m={5} sx={{alignContent:'center'}} >
            <center>
                <Typography
                        variant="h3"
                        noWrap
                        component="div"
                        m ={2}
                        sx={{ flexGrow: 1 }}
                        >
                        Details
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ maxWidth: 650 }} aria-label="simple table">
                        <TableBody>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="">Account number:</TableCell>
                                <TableCell align="right">{accountDetail.iban}</TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="">Account balance:</TableCell>
                                <TableCell align="right">{accountDetail.balance}</TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="">Currency:</TableCell>
                                <TableCell align="right">{accountDetail?.currency?.name}</TableCell>
                            </TableRow>         
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container m={5}>
                <Grid my={1} item xs={6} md={2}>
                    <NavLink to={`/transfers`}>
                    <Button variant="contained"  component="button" sx={{flexGlow: 1}}>
                    Transfers
                    </Button>   
                    </NavLink>
                </Grid>
                </Grid>
                </center>
            </Box>
        </>
    );
}

export default AccountDetailCustomer;