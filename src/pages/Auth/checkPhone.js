// import { Box, FormControl, InputLabel, Input, FormHelperText, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Avatar, CssBaseline, TextField, FormControlLabel, Checkbox, Button, Link, Grid, Box, Typography, Container } from '@material-ui/core';
import { connect } from 'react-redux';
import AuthActions from '../../redux/actions/authActions';

//
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

const CheckPhone = ({ checkPhoneNumber, reset_password, checkPhoneResponse }) => {
  const [phone, setPhone] = useState('');
  const handleCheckPhone = () => {
    const phonePrefix = 98;
    const phoneNumber = parseInt(phone, 10);
    const countryId = 9;
    checkPhoneNumber({
      phone: `989144062667`,
      // phone: `989142667`,
      // phone: `${phonePrefix}${phoneNumber}`,
      // country_id: countryId,
      // reset_password: reset_password,
    });
  };

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
        <Typography component="h1" variant="h5">
          ورود/ ثبت نام
        </Typography>
        <form className={classes.form} noValidate>
          <TextField onChange={(e) => setPhone(e.target.value)} variant="outlined" margin="normal" required fullWidth id="email" label="شماره تماس" name="phone" autoComplete="phone" autoFocus />
          <Button type="button" fullWidth variant="contained" color="primary" className={classes.submit} onClick={handleCheckPhone}>
            ورود
          </Button>
        </form>
      </div>
    </Container>
    // <Box width="20%">
    //   <Box>
    //     <FormControl fullWidth>
    //       <InputLabel htmlFor="my-input">شماره موبایل</InputLabel>
    //       <Input id="my-input" onChange={(e) => setPhone(e.target.value)} aria-describedby="my-helper-text" />
    //       {/* <FormHelperText id="my-helper-text">بلدبیلبیل</FormHelperText> */}
    //     </FormControl>
    //   </Box>
    //   <Box>
    //     <Button fullWidth variant="contained" color="primary" onClick={handleCheckPhone}>
    //       Primary
    //     </Button>
    //   </Box>
    // </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    checkPhoneResponse: state.auth.checkPhoneNumber,
  };
};
const mapDispatchToProps = (dispatch) => ({
  checkPhoneNumber(data) {
    dispatch({ type: AuthActions.AUTH.CHECK_PHONE.REQUESTING, payload: data });
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(CheckPhone);
