import React, { useState, useEffect } from 'react';
import {NavLink, Link, useParams} from "react-router-dom";
import {getToken, checkUnauthorisedAccess } from "./_manageToken";

import {Button,Grid,Box,IconButton,ListItemText, ListItem ,List ,Typography} from '@mui/material';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from 'axios';

const Transactions = ()=> {
    const [ transactions, setTransactions] = useState([]);
    const { accountId } = useParams();

    useEffect(() => {
        axios.get(`http://50.17.212.123:8080/api/transactions/user/${accountId}`,{
            headers :{
                'Content-Type' : 'application/json',
                'Authorization': getToken()
            }

        })
        .then((data)=>{
          console.log(data);
          setTransactions(data.data);
        })
        .catch((error)=>{
            setTransactions([]);
            checkUnauthorisedAccess(error);
        })
    }, []);

    return (
        <>
            <Grid container m={3} spacing={1}>
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
                            Accounts
                        </Button>
                    </Link>
                </Grid>
                <Grid style={{alignItems:"right"}} item>
                    <Link to="/transactions">
                        <Button noWrap component="div" sx={{flexGlow: 1}}  variant="outlined">
                            Transactions
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
            <hr/>
            <Box component="div" m={5} sx={{height:"400px",alignContent:'center' }} >
                <Typography
                    variant="h4"
                    noWrap
                    component="div"
                    m ={2}
                    sx={{ flexGrow: 1 }}
                >
                    Account {accountId}
                    <br/>
                    Transactions
                </Typography>
                <Grid container style={{display:'flex',justifyContent:'center'}}>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {        
                            transactions.map((value) => (
                                <ListItem
                                    key={value.id}
                                    disableGutters
                                    secondaryAction={
                                        <NavLink to={`${value.id}`}>
                                            <IconButton component="a"edge="end" aria-label="delete">
                                                <ArrowForwardIosIcon />
                                            </IconButton>
                                        </NavLink>
                                    }
                                >
                                    <ListItemText primary={`Transaction  ${value.id}`} />
                                </ListItem>
                            ))
                        }
                    </List>
                </Grid>
            </Box>
        </>
    );
}

export default Transactions