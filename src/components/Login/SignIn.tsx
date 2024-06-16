import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [loginDetails, setLoginDetails] = React.useState<any>({})
  const isLogdin: any = sessionStorage.getItem("iscustomerLogdin");
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const mobdata: any = {
      mobileNo: data.get('mobileNo'),
      password: data.get('password'),
      mobErr: '',
      otpErr: ''
    }
    if(mobdata?.mobileNo?.length >=10) {
      mobdata.mobErr = null
    } else {
      mobdata.mobErr = 'Please enter valid mobile number'
    }

    if(mobdata?.mobileNo && mobdata?.password && (mobdata?.password === '1234' || mobdata?.password === '9876')) {
      mobdata.otpErr = null
    } else {
      mobdata.otpErr = 'Please enter valid OTP'
    }
    setLoginDetails(mobdata);
    if(mobdata.mobErr === null && mobdata.otpErr === null) {
      if(!(isLogdin && isLogdin === 'true')) {
        sessionStorage.setItem("iscustomerLogdin", "true");
        sessionStorage.setItem("userInfo", JSON.stringify({username: mobdata.mobileNo}));
      }
      if(mobdata?.password === '9876') {
        sessionStorage.setItem("issuperAdmin", "true");
      } else {
        sessionStorage.removeItem("issuperAdmin");
      }
      navigate('/home');
    }
    
  };

  return (
      <Container component="main" maxWidth="xs" sx={{}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          {(loginDetails?.mobErr !== null || loginDetails?.otpErr !== null) ?
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '99%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="mobile"
              label="Mobile Number"
              name="mobileNo"
              autoComplete="mobile"
              autoFocus
            />
            <div><small className='text-danger'>{loginDetails?.mobErr}</small></div>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="OTP"
              type="password"
              id="password"
            />
            <div><small className='text-danger'>{loginDetails.otpErr}</small></div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Continue
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  resend otp?
                </Link>
              </Grid>
            </Grid>
          </Box> : <div>
          </div> }
        </Box>
      </Container>
  );
}