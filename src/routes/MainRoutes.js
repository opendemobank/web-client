import React from 'react';
import {Routes,Route, Navigate} from 'react-router-dom';
// import User from '../component/UserComponent'
import Login from '../component/login/Login';
import CreateCustomer from '../component/signup/customer';
import Accounts from '../component/Accounts';
import CustomerAccounts from '../component/CustomerAccounts';
import AccountDetailCustomer from '../component/AccountDetailCustomer'
import Transactions from '../component/Transactions'
import TransactionDetail from '../component/TransactionDetail'
import TransactionEdit from '../component/TransactionEdit'
import Transfer from '../component/Transfer';
import Invoices from '../component/Invoices';
import InvoiceDetail from '../component/InvoiceDetail';


import {AppBar, Container, Toolbar, Typography,Button} from '@mui/material'
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';


const MainRoutes = ()=> {
    
    function logout(){
        localStorage.clear();
        window.location.assign('/')
    }
    
    let isLogged = localStorage.getItem("accessToken") ? true : false ;

    if ( !isLogged){
        return <Login/>
    }
    return (
        <div>
            <AppBar position="static">
                <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                    variant="h6"
                    component="div"
                    sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                    <AccountBalanceRoundedIcon sx={{ fontSize : 64}} />
                    </Typography>
        
                
                    <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1 }}
                    >
                    Open Demo Bank
                    </Typography>
                    <Button color="inherit" onClick={logout} >Logout</Button>
                </Toolbar>
                </Container>
            </AppBar>
            <Routes path='/'>
            <Route path='user' element={<CustomerAccounts/>}/>
            <Route path='customer-new' element={<CreateCustomer/>}/>
            <Route path='transfer' element={<Transfer/>} />
            <Route path='invoices/:invoiceId' element={<InvoiceDetail/>}/>
            <Route path='invoices' element={<Invoices/>}/>
            <Route path='user/accounts/:accountId' element={<AccountDetailCustomer/>}/>
            <Route path='accounts/:accountId/transactions/:transactionId/edit' element={<TransactionEdit/>}/>
            <Route path='accounts/:accountId/transactions/:transactionId' element={<TransactionDetail/>}/>
            <Route path='accounts/:accountId/transactions' element= {<Transactions/>}/>
            <Route path='accounts' element= {<Accounts/>}/>
            <Route path='*' element= {<Navigate to="/accounts"/>}/>
            </Routes>
        </div>
    );
}

export default MainRoutes;