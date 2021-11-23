import React, { Component } from 'react';
import {Routes,Route} from 'react-router-dom';
import User from '../component/UserComponent'
import Login from '../loginsignup/login/Login';
import CreateCustomer from '../loginsignup/signup/customer';

class MainRoutes extends Component {
    render() {
        return (
            <div>
                <Routes path='/'>
                <Route path='user' element={<User/>}/>
                <Route path='login' element={<Login/>}/>
                <Route path='customer-new' element={<CreateCustomer/>}/>
                <Route path='*' element= {<User/>}/>
                </Routes>
            </div>
        );
    }
}

export default MainRoutes;