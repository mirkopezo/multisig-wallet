import React, { useState } from 'react';
import { TextField, Button, Typography, Grid } from '@material-ui/core';
import useStyles from 'components/NewTransfer/NewTransferStyles';

function NewTransfer({createTransfer}) {
    const classes = useStyles();
    const [transfer, setTransfer] = useState(undefined);
    const submit = (e) => {
        e.preventDefault();
        createTransfer(transfer);
    }

    const updateTransfer = (e, field) => {
        const value = e.target.value;
        setTransfer({...transfer, [field]: value})
    }

    return(
        <div className={classes.container}>
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
            >
                <Grid item>
                    <Typography variant="h5" gutterBottom className={classes.text}>Create transfer</Typography>
                    <form onSubmit={e => submit(e)}>
                        <TextField id="amount" label="Amount" variant="outlined" 
                            InputProps={{className: classes.input}} onChange={e => updateTransfer(e, 'amount')} />
                        <TextField id="Recipient" label="Recipient" variant="outlined" 
                            InputProps={{className: classes.input}} onChange={e => updateTransfer(e, 'to')} />
                        <Button type="submit" variant="contained" color="primary" className={classes.submit}>
                            Submit
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </div>
    )
}

export default NewTransfer;
