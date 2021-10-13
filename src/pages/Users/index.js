import React, { useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TextField,
  Card,
  TableBody,
  Button,
  Table,
  Grid,
  Container,
  Typography,
  TableCell,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import { connect } from 'react-redux';
import UserTypes from '../../redux/actions/userActions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  select: { minWidth: '100px' },
}));
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#3E51B5',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const Users = ({ getUsers, users, changeUserState, changeUserRole }) => {
  const classes = useStyles();
  useEffect(() => {
    getUsers();
  }, []);
  console.log('nnnnnnnnnnnnnnnnnnnnnnnnn', users);
  const handleChangeState = (userId) => {
    changeUserState(userId);
  };
  const handleChangeUserRole = (userId) => {
    changeUserRole(userId);
  };
  return (
    <Container className={classes.container} component="main" maxWidth="md">
      <Grid container spacing={3}>
        <Typography variant="h6" gutterBottom>
          لیست کاربران
        </Typography>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ردیف</StyledTableCell>
                <StyledTableCell>نام</StyledTableCell>
                <StyledTableCell>شماره تماس</StyledTableCell>
                <StyledTableCell>تاریخ ثبت نام</StyledTableCell>
                <StyledTableCell>وضعیت</StyledTableCell>
                <StyledTableCell>نوع کاربر</StyledTableCell>
                <StyledTableCell>لیست درخواست ها</StyledTableCell>
                <StyledTableCell>لیست سفارش ها</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.result?.map((user, index) => (
                <StyledTableRow key={user.id}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {user.name}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {user.phone}
                  </StyledTableCell>
                  <StyledTableCell>{user.date}</StyledTableCell>
                  <StyledTableCell>
                    <FormControl className={classes.formControl}>
                      <Select labelId="demo-simple-select-label" id="demo-simple-select" className={classes.select} value={user.is_banned} onChange={() => handleChangeState(user.id)}>
                        <MenuItem key={index} value={false}>
                          فعال
                        </MenuItem>
                        <MenuItem key={index} value={true}>
                          غیر فعال
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </StyledTableCell>
                  <StyledTableCell>
                    <FormControl className={classes.formControl}>
                      <Select labelId="user-role-label" id="user-role" className={classes.select} value={user.is_admin} onChange={() => handleChangeUserRole(user.id)}>
                        <MenuItem key={index} value={false}>
                          کاربر
                        </MenuItem>
                        <MenuItem key={index} value={true}>
                          ادمین
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </StyledTableCell>
                  <StyledTableCell>{/* <DeleteRoundedIcon className={classes.icon} onClick={() => handleDeleteCountry(country.id)} color="primary" /> */}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.user.users.list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => {
      dispatch({ type: UserTypes.GET_USERS.REQUESTING });
    },
    changeUserState: (userId) => {
      dispatch({ type: UserTypes.CHANGE_USER_STATE.REQUESTING, payload: userId });
    },
    changeUserRole: (userId) => {
      dispatch({ type: UserTypes.CHANGE_ROLE.REQUESTING, payload: userId });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
