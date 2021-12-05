import React from 'react';
import { useParams } from 'react-router-dom';

import {Button,TextField,Box,Typography} from '@mui/material';

const TransactionEdit = () => {
    const { accountId, transactionId } = useParams();
   
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
                        Account {accountId}
                        Transaction {transactionId}
                </Typography>
         <form
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Account Name"
              variant="outlined"
              required
            /><br/>
            <TextField
              id="outlined-basic"
              label="Acoount Number"
              variant="outlined"
             
            /><br/>
            <TextField
              name="password"
              label="Amount to Withdraw"
              type="password"
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

export default TransactionEdit;