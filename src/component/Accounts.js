import React, { Component } from 'react';

import {Button,Grid,Box,IconButton,ListItemText, ListItem ,List ,Typography} from '@mui/material';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

class Accounts extends Component {


    render() {
        return (
            <>
        <Grid container m={5} spacing={5}>
            <Grid style={{alignItems:"right"}} item>
                <Button noWrap component="div" sx={{flexGlow: 1}}  variant="outlined">
                    Create New Account
                </Button>
            </Grid>
            <Grid style={{alignItems:"right"}} item>
                <Button noWrap component="div" sx={{flexGlow: 1}}  variant="outlined">
                     Account
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
                    Accounts
            </Typography>
            <Grid container style={{display:'flex',justifyContent:'center'}}>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {
                    [1, 2, 3].map((value) => (
                        <ListItem
                        key={value}
                        disableGutters
                        secondaryAction={
                            <IconButton component="a" href={`accounts/${value}`}  edge="end" aria-label="delete">
                            <ArrowForwardIosIcon />
                            </IconButton>
                        }
                        >
                        <ListItemText primary={`Account  ${value}`} />
                        </ListItem>
                ))}
                </List>
            </Grid>

        </Box>
        </>
        );
    }
}

export default Accounts;