import { Alert, Snackbar } from '@mui/material';
import React from 'react';

interface AlertConfig {
    handleClose?: any,
    isOpen: boolean,
    severity: any,
    variant?: any,
    message: string
}

const AlertMessage = (props: AlertConfig) => {
    const {isOpen, severity='info', variant='outlined', handleClose, message} = props;
    
    return (
        <>
        {
            <Snackbar open={isOpen} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert severity={severity} variant={variant} onClose={handleClose}>{message}</Alert>
            </Snackbar>
        }
        </>
        
    )
}

export default AlertMessage;