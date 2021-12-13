import React, { useState, useEffect } from 'react';
import {NavLink, Link} from "react-router-dom";
import {getToken, checkUnauthorisedAccess } from "./_manageToken";

import {Button,Grid,Box,IconButton,ListItemText, ListItem ,List ,Typography} from '@mui/material';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from 'axios';

const CustomerAccounts = ()=> {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        axios.get(`http://50.17.212.123:8080/api/accounts/customer`,{
            headers :{
                'Content-Type' : 'application/json',
                'Authorization': getToken()
            }

        })
        .then((data)=>{
            console.log(data);
            setAccounts(data.data)
        })
        .catch((error)=>{
            setAccounts([]);
            checkUnauthorisedAccess(error);
        })
    }, []);

    

    return (
        <>
            <Grid container m={3} spacing={1}>
                <Grid style={{alignItems:"right"}} item>
                    <Button noWrap component="div" sx={{flexGlow: 1}}  variant="outlined">
                        Accounts
                    </Button>
                </Grid>
                <Grid style={{alignItems:"right"}} item>
                    <Link to="/request-money">
                        <Button noWrap component="div" sx={{flexGlow: 1}}  variant="outlined">
                            Request A Transfer
                        </Button>
                    </Link>
                </Grid>
                <Grid style={{alignItems:"right"}} item>
                    <Link to="/transfer">
                        <Button noWrap component="div" sx={{flexGlow: 1}}  variant="outlined">
                            Make A New Transfer
                        </Button>
                    </Link>
                </Grid>
                <Grid style={{alignItems:"right"}} item>
                    <Link to="/transfers">
                        <Button noWrap component="div" sx={{flexGlow: 1}}  variant="outlined">
                            Transfers
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        <hr/>
        <center>
            <Typography
                variant="h4"
                noWrap
                component="div"
                m ={2}
                sx={{ flexGrow: 1 }}
            >
                Accounts
            </Typography>
            <Grid container style={{display:'flex',justifyContent:'center'}}>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {
                    accounts.map((value) => (
                        <ListItem
                        key={value.id}
                        disableGutters
                        secondaryAction={
                            <NavLink to={`accounts/${value.id}`}>
                                <IconButton component="a"edge="end" aria-label="delete">
                                <ArrowForwardIosIcon />
                                </IconButton>
                            </NavLink>
                        }
                        >
                        <ListItemText primary={`Account IBAN :  ${value.iban}`} />
                        </ListItem>
                ))}
                </List>
            </Grid>
        </center>
    </>
    );
}

export default CustomerAccounts;