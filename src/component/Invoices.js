import React, { Component } from 'react';
import {NavLink, Link} from "react-router-dom";

import {Button,Grid,Box,IconButton,ListItemText, ListItem ,List ,Typography} from '@mui/material';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

class Invoices extends Component {
    

    render() {
        const user = JSON.parse(localStorage.getItem("user"));
        let make_transfer = "";
        let view_transfers = ""; 
        if (user !== null && user.role === "USER"){
            make_transfer = 
                <Grid style={{alignItems:"right"}} item>
                    <Link to="/transfer">
                        <Button noWrap component="div" sx={{flexGlow: 1}}  variant="outlined">
                            Make A New Transfer
                        </Button>
                    </Link>
                </Grid>;
            view_transfers = 
                <Grid style={{alignItems:"right"}} item>
                    <Link to="/transfers">
                        <Button noWrap component="div" sx={{flexGlow: 1}}  variant="outlined">
                            Transfers
                        </Button>
                    </Link>
                </Grid>;
        }
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
                <Link to="/user">
                <Button noWrap component="div" sx={{flexGlow: 1}}  variant="outlined">
                     Account
                </Button>
                </Link>
            </Grid>
            {make_transfer}
            {view_transfers}
            <Grid style={{alignItems:"right"}} item>
                <Button noWrap component="div" sx={{flexGlow: 1}}  variant="outlined">
                     Invoices
                </Button>
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
                    Invoices
            </Typography>
            <Grid container style={{display:'flex',justifyContent:'center'}}>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {
                    [1, 2, 3].map((value) => (
                        <ListItem
                        key={value}
                        disableGutters
                        secondaryAction={
                            <NavLink to={`${value}`}>
                                <IconButton component="a"edge="end" aria-label="delete">
                                <ArrowForwardIosIcon />
                                </IconButton>

                            </NavLink>
                        }
                        >
                        <ListItemText primary={`Invoice  ${value}`} />
                        </ListItem>
                ))}
                </List>
            </Grid>

        </Box>
        </>
        );
    }
}

export default Invoices;