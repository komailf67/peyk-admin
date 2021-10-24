import React, { useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Paper, TableRow, TableHead, TableContainer, TableBody, Table, Grid, Container, Typography, TableCell, FormControl, Select, MenuItem } from '@material-ui/core';
import { connect } from 'react-redux';
import UserTypes from '../../redux/actions/userActions';
import VisibilityIcon from '@material-ui/icons/Visibility';
import RawModal from '../../components/modal/RawModal';
import CargoTable from '../../components/Tables/CargoTable';
import CargoActions from '../../redux/actions/cargoActions';

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
const Users = ({ getUsers, users, changeUserState, changeUserRole, getUserCargoes, changeUserCargoesModalState, userCargoesModalState, userCargoes }) => {
  const classes = useStyles();
  useEffect(() => {
    getUsers();
  }, []);
  const handleChangeState = (userId) => {
    changeUserState(userId);
  };
  const handleChangeUserRole = (userId) => {
    changeUserRole(userId);
  };
  const handleShowUserCargoes = (userId) => {
    changeUserCargoesModalState(true);
    getUserCargoes({ user_id: userId });
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
                <StyledTableCell>درخواست ها</StyledTableCell>
                {/* <StyledTableCell>لیست سفارش ها</StyledTableCell> */}
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
                  <StyledTableCell>{user.created_at}</StyledTableCell>
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
                  <StyledTableCell>
                    <VisibilityIcon className={classes.icon} onClick={() => handleShowUserCargoes(user.id)} color="primary" />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <RawModal status={userCargoesModalState} cancelButtonFunc={() => changeUserCargoesModalState(false)}>
        <CargoTable cargoes={{ data: userCargoes }} changableStates={[]} />
      </RawModal>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.user.users.list,
    userCargoes: state.cargo.userCargoes.list,
    userCargoesModalState: state.cargo.cargoModals.userCargoesModalStatus,
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
    getUserCargoes: (params) => {
      dispatch({ type: CargoActions.GET_USER_CARGOES.REQUESTING, payload: params });
    },
    changeUserCargoesModalState: (state) => {
      dispatch({ type: CargoActions.USER_CARGOES_MODAL_STATE, payload: state });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
