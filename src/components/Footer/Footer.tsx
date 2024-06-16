import * as React from 'react';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import AppBar from '@mui/material/AppBar'

const Footer = () => {
    return (<AppBar
        position="static"
        color='inherit'
        sx={{textAlign: 'center', boxShadow: 0, borderBottom: '1px solid #ccc', marginTop: '1.5rem'}}
    >
        <Grid container style={{ background: '#313742', color: '#fff', textAlign: 'left' }} className='py-3'>
            <div className='container'>
            <Grid container xs={12}>
            <Grid item xs={12}>
    
                <Typography
                    component="p"
                    variant="h5"
                    style={{ fontSize: '16px', marginLeft: '0' }}
                >
                    © 2024  All Rights Reserved | Powered By By 
                </Typography>
            </Grid>
            </Grid>
            </div>
        </Grid>
    </AppBar>);
}

export default Footer;