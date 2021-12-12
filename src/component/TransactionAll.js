import React, { useState, useEffect } from 'react';
import {Link, useParams} from "react-router-dom";
import {getToken, checkUnauthorisedAccess } from "./_manageToken";

import {Button,Grid,Box,IconButton,ListItemText, ListItem ,List ,Typography} from '@mui/material';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from 'axios';

const TransactionAll = ()=> {
    const [ transactions, setTransactions] = useState([]);
    //const { accountId } = useParams();

    useEffect(() => {
        axios.get(`http://50.17.212.123:8080/api/transactions/`,{
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
        <Grid container m={5} spacing={5}>
            <Grid style={{alignItems:"right"}} item>
                <Link to={`/transactions/new`}>
                    <Button noWrap component="div" sx={{flexGlow: 1}}  variant="outlined">
                        Create New Transaction
                    </Button>
                </Link>
            </Grid>

           
        </Grid>
        <hr/>
        <Box component="div" m={5} sx={{ border: '1px solid  grey',height:"400px",alignContent:'center' }} >
            <Typography
                    variant="h3"
                    noWrap
                    component="div"
                    m ={2}
                    sx={{ flexGrow: 1 }}
                    >
                    All Transactions
            </Typography>
            <Grid container style={{display:'flex',justifyContent:'center'}}>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {
                    
            transactions.map((value) => (
                        <ListItem
                        key={value.id}
                        disableGutters
                        secondaryAction={
                            <Link to={`/accounts/${value.debitTransactionRecord!==null ? value.debitTransactionRecord.account.id : 0}/transactions/${value.id}`}>
                                <IconButton component="a"edge="end" aria-label="delete">
                                <ArrowForwardIosIcon />
                                </IconButton>

                            </Link>
                        }
                        >
                        <ListItemText primary={`Transaction  ${value.id}`} />
                        </ListItem>
                ))}
                </List>
            </Grid>

        </Box>
        </>
        );
}

export default TransactionAll