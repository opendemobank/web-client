import React from 'react';
import {Routes,Route, Navigate, NavLink} from 'react-router-dom';
// import User from '../component/UserComponent'
import Login from '../component/login/Login';
import CreateCustomer from '../component/signup/customer';
import Accounts from '../component/Accounts';
import CustomerAccounts from '../component/CustomerAccounts';
import AccountDetailCustomer from '../component/AccountDetailCustomer'
import AccountDetailsAdmin from '../component/AccountDetailsAdmin'
import Transactions from '../component/Transactions'
import TransactionAll from '../component/TransactionAll'
import TransactionNew from '../component/TransactionNew'
import TransactionDetail from '../component/TransactionDetail'
import TransactionEdit from '../component/TransactionEdit'
import Transfer from '../component/Transfer';
import Tranfers from '../component/Transfers';
import Invoices from '../component/Invoices';
import InvoiceDetail from '../component/InvoiceDetail';
import RequestMoney from '../component/RequestMoney';


import {AppBar, Container, Toolbar, Typography, Button, Box} from '@mui/material'
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import QrCodeIcon from '@mui/icons-material/QrCode';


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
        <Box>
            <AppBar position="static">
                <Container>
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
                        <NavLink to="/request-money">
                            <QrCodeIcon sx={{ fontSize: 64}} style={{ margin: "0 30px 0 0", color: "black"  }}/>
                        </NavLink>
                        <Button color="inherit" onClick={logout} >Logout</Button>
                    </Toolbar>
                </Container>
            </AppBar>
            <Routes path='/'>
                <Route path="request-money" element={<RequestMoney/>}/>
                <Route path='edit/:transactionId' element={<TransactionEdit/>}/>
                <Route path='user' element={<CustomerAccounts/>}/>
                <Route path='customer-new' element={<CreateCustomer/>}/>
                <Route path='transfer' element={<Transfer/>} />
                <Route path='transfers' element={<Tranfers/>}/>
                <Route path='invoices/:invoiceId' element={<InvoiceDetail/>}/>
                <Route path='invoices' element={<Invoices/>}/>
                <Route path='transactions' element={<TransactionAll/>}/>
                <Route path='transactions/new' element={<TransactionNew/>}/>
                <Route path='user/accounts/:accountId' element={<AccountDetailCustomer/>}/>
                <Route path='accounts/details/:accountId' element={<AccountDetailsAdmin/>}/>
                <Route path='accounts/:accountId/transactions/:transactionId/edit' element={<TransactionEdit/>}/>
                <Route path='accounts/transactions/:transactionId' element={<TransactionDetail/>}/>
                <Route path='accounts/details/:accountId/transactions/:transactionId' element={<TransactionDetail/>}/>
                <Route path='accounts/:accountId/transactions' element= {<Transactions/>}/>
                <Route path='accounts/details/:accountId/transactions' element= {<Transactions/>}/>
                <Route path='accounts' element= {<Accounts/>}/>
                <Route path='*' element= {<Navigate to="/accounts"/>}/>
            </Routes>
        </Box>
    );
}

export default MainRoutes;