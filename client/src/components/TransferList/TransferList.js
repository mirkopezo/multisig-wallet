import React from 'react';
import { Button, Typography, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, Paper, Grid} from '@material-ui/core';
import useStyles from 'components/TransferList/TransferListStyles';

function TransferList({transfers, approveTransfer}) {
    const classes = useStyles();
    return(
        <div className={classes.container}>
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
            >
                <Grid item>
                    <Typography variant="h5" gutterBottom className={classes.title}>
                        Transfer list
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Typography className={classes.text}>Transfer Id</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography className={classes.text}>Amount</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography className={classes.text}>Recipient</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography className={classes.text}>Number of approvals</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography className={classes.text}>Is transfer sent?</Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transfers.map(transfer => (
                                    <TableRow key={transfer.id}>
                                        <TableCell component="th" scope="row">
                                            <Typography>{transfer.id}</Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography>{transfer.amount} wei</Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography>{transfer.to}</Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography>{transfer.approvals}</Typography>
                                            <Button variant="outlined" onClick={() => approveTransfer(transfer.id)}
                                                color="primary" disabled={transfer.sent ? true : false}
                                            >
                                                Approve
                                            </Button>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography>{transfer.sent ? 'Yes' : 'No'}</Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </div>
    );
}

export default TransferList;