import React from 'react';
// import { useParams } from 'react-router-dom';

import {Button,TextField,Box,Typography} from '@mui/material';

const Transfer = () => {
   
        return (
        <>
            <Box component="div" m={5} sx={{ border: '1px solid  grey',height:"400px",alignContent:'center' }} >
                <Typography
                        variant="h3"
                        noWrap
                        component="div"
                        m ={2}
                        sx={{ flexGrow: 1 }}
                        >
                        Money Transfer
                </Typography>
         <form
            noValidate
            autoComplete="off"
          >
             Account Balance(EUR) : 100  
            <br/>
            <TextField
              id="outlined-basic"
              label="Recipient Name"
              variant="outlined"
              required
            /><br/>
            <TextField
              id="outlined-basic"
              label="Recipient Amount"
              variant="outlined"
             
            /><br/>
            <TextField
              name="password"
              label="Amount to Transfer"
              type="text"
              variant="outlined"  
              required
            />  <br/>
            <TextField
              name="password"
              label="Description"
              type="text"
              variant="outlined"  
              required
            />  
            <br/>
            <Button variant="contained"  component="button" sx={{flexGlow: 1}}>
                            Modify Transaction
            </Button>   
          </form>
            </Box>
        </>
        );
}

export default Transfer;