import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams, NavLink, Link } from 'react-router-dom';
import useInput from "./hooks/use-input";
import {getToken , checkUnauthorisedAccess } from "./_manageToken";
import '../App.css';


import {TableRow,Paper,Button,TextField,Grid,TableContainer,TableCell,TableBody,Table,Box,Typography, Modal} from '@mui/material';
import { FamilyRestroomRounded } from '@mui/icons-material';


const AccountDetailsAdmin = () => {

    const [accountDetail , setAccountDetail] = useState({});
    let { accountId } = useParams();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

    const {
        value: amountToAdd,
        valueChangedHandler: addBalanceChangeHandler,
        resetInput: resetAddBalance
      } = useInput((val) => val);
    
      const {
        value: amountToWithdraw,
        valueChangedHandler: withdrawBalanceChangeHandler,
        resetInput: resetWithdrawBalance
      } = useInput((val) => val);
        
    function addMoneyToAccount(){
        if( amountToAdd > 0){
            let updatedBalance = amountToAdd;
            updateBalance(updatedBalance, "Deposit");
        }else{
            window.alert("Amount to add should be more than 0 !!");
        }
    }

    function withDrawMoneyFromAccount(){
        if( amountToWithdraw > 0 && ( amountToWithdraw <= accountDetail.balance )){
            let updatedBalance = - amountToWithdraw ;
            updateBalance(updatedBalance, "Withdraw");
        }else{
            window.alert("Amount to withdraw should be more than existing balance or 0 !!");
        }
    }

    function updateBalance(updatedBalance, description){

        axios.post(`http://50.17.212.123:8080/api/transactions`, {
            amount: updatedBalance,
            description : description,
            endIban: accountDetail.iban,
            originIban : null
        },{
            headers :{
                'Content-Type' : 'application/json',
                'Authorization': getToken()
            }        
        })
        .then((data)=>{
                if(description === 'Withdraw'){
                    resetWithdrawBalance();
                }else{
                    resetAddBalance();
                }
                activate();
        })
        .catch((error)=>{
            setAccountDetail({});
            checkUnauthorisedAccess(error);
        })
    }


    function closeAccount(){
        if (accountDetail.accountType ==="INACTIVE")
        {
            alert("Account is already inactive.")
        }
        else {
            axios.delete(`http://50.17.212.123:8080/api/accounts/${accountId}`,
                {
                    headers :{
                        'Content-Type' : 'application/json',
                        'Authorization': getToken()
                    },
                }
            ).then((data)=>{
                accountDetail.accountType = "INACTIVE";
                console.log("Account deleted")
                handleClose();
            })
            .catch((error)=>{
                checkUnauthorisedAccess(error);
            })
        }
    }
  
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

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
            <Box component="div" m={5} sx={{height:"400px", alignContent:'center' }} >
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
                                    <TableCell align=""><b>Account id:</b></TableCell>
                                    <TableCell align="right">{accountDetail.id}</TableCell>
                                </TableRow>
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
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align=""><b>Account Type:</b></TableCell>
                                    <TableCell align="right">{accountDetail.accountType}</TableCell>
                                </TableRow> 
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align=""><b>Account Opening Date:</b></TableCell>
                                    <TableCell align="right">{Date(accountDetail.openDate)}</TableCell>
                                </TableRow>                        
                            </TableBody>
                        </Table>
                    </TableContainer>
                </center>
                <Grid container m={5}>
                    <Grid my={1} item xs={6} md={2}>
                        <div>
                            <Button id="close-acc" variant="contained" component="button" sx={{flexGlow: 1}} onClick={handleOpen}>
                                Close Account
                            </Button>  
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Grid container spacing={2} direction="row" justifyContent="center" gap={2}>
                                        <Typography id="modal-modal-title" variant="h6" component="h2">
                                            Are you sure?
                                        </Typography>
                                        <Typography id="modal-modal-description">
                                            By clicking yes, you will close the account.
                                        </Typography>
                                        <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center" >
                                            <Grid item>
                                                <Button variant="contained" component="button" sx={{flexGlow: 1}} onClick={closeAccount} >
                                                    Yes
                                                </Button>
                                            </Grid>
                                            <Grid item>
                                                <Button variant="contained" component="button" sx={{flexGlow: 1}} onClick={handleClose} >
                                                    No
                                                </Button> 
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Modal>     
                        </div>                    
                    </Grid>
                    <Grid my={1} item xs={6} md={2}>
                        <NavLink to="transactions">
                            <Button variant="contained"  component="button" sx={{flexGlow: 1}}>
                                View Transactions
                            </Button>   
                        </NavLink>
                    </Grid>
                    <Grid my={1} item xs={6} md={2}>
                        <TextField
                            type="number"
                            id="outlined-basic"
                            label="Amount"
                            variant="outlined"
                            value={amountToAdd}
                            style={{ height:'10px' }}
                            onChange={addBalanceChangeHandler}
                        />
                    </Grid>
                    <Grid my={1} item xs={6} md={2}>
                        <Button variant="contained" onClick={addMoneyToAccount}  component="button" sx={{flexGlow: 1}}>
                            Add Money
                        </Button>   
                    </Grid>
                    <Grid my={1} item xs={6} md={2}>
                        <TextField
                            type="number"
                            id="outlined-basic"
                            label="Amount"
                            variant="outlined"
                            value= {amountToWithdraw}
                            onChange={withdrawBalanceChangeHandler}
                        />
                    </Grid>
                    <Grid my={1} item xs={6} md={2}>
                        <Button variant="contained" onClick={withDrawMoneyFromAccount}  component="button" sx={{flexGlow: 1}}>
                            Withdraw
                        </Button>   
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default AccountDetailsAdmin;