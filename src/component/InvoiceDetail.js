import React from 'react';
import { useParams } from 'react-router-dom';

import {TableRow,Paper,TableContainer,TableCell,TableBody,Table,Box,Typography} from '@mui/material';

const InvoiceDetail = () => {
    const { invoiceId } = useParams();
   
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
                        
                        Invoice {invoiceId}
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ maxWidth: 650 }} aria-label="simple table">
                        <TableBody>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="">Sender Name:</TableCell>
                                <TableCell align="right">{"Rajan"}</TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="">Sender Account:</TableCell>
                                <TableCell align="right">{"5"}</TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="">Recipient Name:</TableCell>
                                <TableCell align="right">{"ABC" }</TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="">Recipient Account</TableCell>
                                <TableCell align="right">{"10"}</TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="">Amount transferred</TableCell>
                                <TableCell align="right">{"100"}</TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="">Description</TableCell>
                                <TableCell align="right">{"abc"}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
        );
}

export default InvoiceDetail;