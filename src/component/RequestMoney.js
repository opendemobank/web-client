import React, { useState } from 'react';
import QRCode from 'react-qr-code';
// import {NavLink, Link} from "react-router-dom";

import {Grid,Box,Typography} from '@mui/material';


const RequestMoney = ()=> {
    const user  = JSON.parse(localStorage.getItem('user'));
    console.log(user)

    return (
        <center>
            <Box component="div" m={5} sx={{ height:"500px",alignContent:'center' }} >
                <Typography
                        variant="h3"
                        noWrap
                        component="div"
                        m ={2}
                        sx={{ flexGrow: 1 }}
                        >
                        Scan to Pay
                </Typography>
                <Grid container style={{display:'flex',justifyContent:'center',  margin: "50px 0 0  0"}}>
                            <QRCode value={`${window.location.origin}/transfer?user=${user.id}`} />
                </Grid>

            </Box>
        </center>
    );
}

export default RequestMoney;