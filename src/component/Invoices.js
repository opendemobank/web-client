import React, { Component } from 'react';
import {NavLink, Link} from "react-router-dom";

import {Button,Grid,Box,IconButton,ListItemText, ListItem ,List ,Typography} from '@mui/material';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

class Invoices extends Component {


    render() {
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
                <Button noWrap component="div" sx={{flexGlow: 1}}  variant="outlined">
                     Account
                </Button>
            </Grid>

            <Grid style={{alignItems:"right"}} item>
                <Button noWrap component="div" sx={{flexGlow: 1}}  variant="outlined">
                     Make A New Transfer
                </Button>
            </Grid>

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