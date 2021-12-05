import React from 'react';
import { useParams, NavLink } from 'react-router-dom';

import {TableRow,Paper,Button,Grid,TableContainer,TableCell,TableBody,Table,Box,Typography} from '@mui/material';

const TransactionDetail = () => {
    const { accountId, transactionId } = useParams();
   
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
                                <TableCell align="right">{"Rajan"}</TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="">Account Number:</TableCell>
                                <TableCell align="right">{"2" }</TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="">Amount Withdrawal:</TableCell>
                                <TableCell align="right">{"100"}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container m={5}>
                    <Grid item xs={2}>
                        <Button variant="contained" component="button" sx={{flexGlow: 1}}>
                            Call Back Transaction
                        </Button>                   
                    </Grid>
                    <Grid item xs={2}>
                        <NavLink to="edit">
                        <Button variant="contained"  component="button" sx={{flexGlow: 1}}>
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