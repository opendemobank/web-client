import React, { Component } from 'react';
import {Routes,Route} from 'react-router-dom';
// import User from '../component/UserComponent'
import Login from '../loginsignup/login/Login';
import CreateCustomer from '../loginsignup/signup/customer';
import Accounts from '../component/Accounts';
import AccountDetail from '../component/AccountDetail'
import Transactions from '../component/Transactions'
import TransactionDetail from '../component/TransactionDetail'

import {AppBar, Container, Toolbar, Typography} from '@mui/material'
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';

class MainRoutes extends Component {
    render() {
        return (
            <div>
                <AppBar position="static">
                    <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                        variant="h6"
                        noWrap
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
                    </Toolbar>
                    </Container>
                </AppBar>
                <Routes path='/'>
                <Route path='user' element={<Accounts/>}/>
                <Route path='login' element={<Login/>}/>
                <Route path='customer-new' element={<CreateCustomer/>}/>
                <Route path='accounts/:accountId' element={<AccountDetail/>}/>
                <Route path='accounts/:accountId/transactions/:transactionId' element={<TransactionDetail/>}/>
                <Route path='accounts/:accountId/transactions' element= {<Transactions/>}/>
                <Route path='accounts' element= {<Accounts/>}/>
               
                <Route path='*' element= {<Login/>}/>
                </Routes>
            </div>
        );
    }
}

export default MainRoutes;