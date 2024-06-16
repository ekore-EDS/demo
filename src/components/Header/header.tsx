import * as React from 'react';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import AppBar from '@mui/material/AppBar'
import { Button } from '@mui/material';
import { getuserInfo } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const userInfo: any = getuserInfo();

    const navigate = useNavigate();

    const handleClick = () => {
        sessionStorage.removeItem('iscustomerLogdin');
        sessionStorage.removeItem('issuperAdmin');
        sessionStorage.removeItem('userInfo');
        navigate('/');
    }
    return (<AppBar
        position="static"
        color='inherit'
        sx={{textAlign: 'center', boxShadow: 0, borderBottom: '1px solid #ccc', width: '94%', marginLeft: '2rem'}}
    >
        <Grid container style={{ background: '#fff' }} className='py-2 text-left b-header'>
            
            <Grid item xs={12} sm={6} md={6} lg={6} className='text-left'>
                <Typography
                    component="h1"
                    variant="h5"
                    style={{ fontSize: '26px' }}
                >
                    ED DIAGNOSIS
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} className='text-end' sx={{paddingRight: '1rem'}}>
                <Typography
                    component="h1"
                    variant="h5"
                    style={{ fontSize: '15px' }}
                >
                    {userInfo && userInfo.username ? 
                        <div>
                            USERNAME: {userInfo.username}
                            <Button type="button" variant="contained" sx={{ mx: 2 }} onClick={() => handleClick()}>
                                LOGOUT
                            </Button>
                        </div>: 
                    null}
                </Typography>
            </Grid>
            
        </Grid>
    </AppBar>);
}

export default Header;