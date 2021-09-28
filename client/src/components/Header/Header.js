import React from 'react';
import { Typography } from '@material-ui/core';
import useStyles from 'components/Header/HeaderStyles';

function Header({approvers, quorum}) {
    const classes = useStyles();
    return (
        <header className={classes.header}>
            <ul>
                <li><Typography>Approvers: {approvers.join(', ')}</Typography></li>
                <li><Typography>Quorum: {quorum}</Typography></li>
            </ul>
        </header>
    )
}

export default Header;