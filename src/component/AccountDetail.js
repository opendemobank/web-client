import React, {useState} from 'react';
import { useParams, NavLink } from 'react-router-dom';

import {TableRow,Paper,Button,TextField,Grid,TableContainer,TableCell,TableBody,Table,Box,Typography} from '@mui/material';


const AccountDetail = () => {
    
    const [amountToAdd , setAmountToAdd] = useState(0)
    const [amountToWithdraw , setAmountToWithdraw] = useState(0)
        let { accountId } = useParams();
        
        function addMoneyToAccount(){
            console.log(amountToAdd , amountToWithdraw )
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
                        Account {accountId} Detail
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ maxWidth: 650 }} aria-label="simple table">
                        <TableBody>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="">Account number:</TableCell>
                                <TableCell align="right">{"123445"}</TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="">Account balance:</TableCell>
                                <TableCell align="right">{100}</TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="">Name:</TableCell>
                                <TableCell align="right">{"Rajan" }</TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="">DoB:</TableCell>
                                <TableCell align="right">{"12/12/2021"}</TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="">Email:</TableCell>
                                <TableCell align="right">{"rajanraj@ut.ee"}</TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="">Password:</TableCell>
                                <TableCell align="right">{"1234434"}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container m={5}>
                <Grid item xs={2}>
                    <Button variant="contained" component="button" sx={{flexGlow: 1}}>
                        Close Account
                    </Button>                   
                </Grid>
                <Grid item xs={2}>
                    <NavLink to="transactions">
                    <Button variant="contained"  component="button" sx={{flexGlow: 1}}>
                        View Transaction
                    </Button>   
                    </NavLink>
                </Grid>
                <Grid item xs={2}>
                <TextField
                    type="number"
                    id="outlined-basic"
                    label="Amount"
                    variant="outlined"
                    value={amountToAdd}
                    style={{ height:'10px' }}
                />
                </Grid>
                <Grid item xs={2}>
                    <Button variant="contained" onClick={addMoneyToAccount}  component="button" sx={{flexGlow: 1}}>
                    Add Money
                    </Button>   
                </Grid>
                <Grid item xs={2}>
                <TextField
                    type="number"
                    id="outlined-basic"
                    label="Amount"
                    variant="outlined"
                    value= {amountToAdd}
                />
                </Grid>
                <Grid item xs={2}>
                    <Button variant="contained"  component="button" sx={{flexGlow: 1}}>
                        Make A Withdraw
                    </Button>   
                </Grid>
                </Grid>

            </Box>
        </>
        );
}

export default AccountDetail;