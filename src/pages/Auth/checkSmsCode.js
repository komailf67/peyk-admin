// import { Box, FormControl, InputLabel, Input, FormHelperText, Button } from '@material-ui/core';
import React, { useState } from 'react';
import { CssBaseline, TextField, Button, Typography, Container } from '@material-ui/core';
import { connect } from 'react-redux';
import AuthActions from '../../redux/actions/authActions';
import FormModal from '../../components/modal/FormModal';

import { makeStyles } from '@material-ui/core/styles';
import RedirectActions from '../../redux/actions/redirectActions';

const ChechSmsCode = ({ checkSms, phoneNumber, updateProfile, handleFullnameModalStatus, fullnameModalStatus, redirectTo }) => {
  const [smsCode, setSmsCode] = useState('');
  const handleCheckSmsCode = () => {
    checkSms({
      phone: phoneNumber || 989144062667, //TODO
      code: smsCode,
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
        <Typography component="h1" variant="h5">
          ورود/ ثبت نام
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="smsCode"
            label="کد ارسالی"
            name="smsCode"
            autoComplete="smsCode"
            autoFocus
            onChange={(e) => setSmsCode(e.target.value)}
          />
          <Button type="button" fullWidth variant="contained" color="primary" className={classes.submit} onClick={handleCheckSmsCode}>
            ادامه
          </Button>
        </form>
      </div>
      <FormModal
        status={fullnameModalStatus}
        title="نام خود را وارد کنید"
        placeholder="نام و نام خانوادگی"
        acceptButtonFunc={updateProfile}
        cancelButtonFunc={() => {
          handleFullnameModalStatus(false);
          redirectTo('/cargoes');
        }}
      />
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    phoneNumber: state.auth.checkPhoneNumber.phoneNumber,
    fullnameModalStatus: state.auth.fullnameModalStatus.status,
  };
};
const mapDispatchToProps = (dispatch) => ({
  checkSms(data) {
    dispatch({ type: AuthActions.CHECK_SMS_CODE.REQUESTING, payload: data });
  },
  updateProfile(data) {
    dispatch({ type: AuthActions.UPDATE_PROFILE.REQUESTING, payload: { name: data } });
  },
  handleFullnameModalStatus(status) {
    dispatch({ type: AuthActions.CHANGE_FULLNAME_MODAL_STATUS, payload: status });
  },
  redirectTo(path) {
    dispatch({
      type: RedirectActions.FILL,
      payload: path,
    });
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ChechSmsCode);
