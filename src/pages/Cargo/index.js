import React, { useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { TableContainer, TextField, Card, CardHeader, Button, Box, Container } from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import CargoActions from '../../redux/actions/cargoActions';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';
import { useFormik } from 'formik';
import FormModal from '../../components/modal/FormModal';

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

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  icon: {
    cursor: 'pointer',
  },
});

const Cargo = ({ getCargoes, cargoes, verifyModal, rejectModal, verifyModalStatus, rejectModalStatus, verifyCargo, rejectCargo }) => {
  const classes = useStyles();
  useEffect(() => {
    getCargoes();
  }, []);

  return (
    <Container className={classes.container} component="main" maxWidth="md">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ردیف</StyledTableCell>
              <StyledTableCell>مبدا</StyledTableCell>
              {/* <StyledTableCell >نام فرستنده</StyledTableCell> */}
              <StyledTableCell>مقصد</StyledTableCell>
              {/* <StyledTableCell >نام گیرنده</StyledTableCell> */}
              <StyledTableCell>وزن</StyledTableCell>
              <StyledTableCell>قیمت بسته</StyledTableCell>
              <StyledTableCell>اکشن</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cargoes?.data?.result?.map((cargo, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {cargo.origin_address.address_line_one}
                </StyledTableCell>
                {/* <StyledTableCell >{cargo.origin_address.full_name}</StyledTableCell> */}
                <StyledTableCell>{cargo.destination_address.address_line_one}</StyledTableCell>
                {/* <StyledTableCell >{cargo.destination_address.full_name}</StyledTableCell> */}
                <StyledTableCell>{cargo.weight}</StyledTableCell>
                <StyledTableCell>{cargo.value}</StyledTableCell>
                <StyledTableCell>
                  <Box>
                    <CheckCircleOutlineIcon className={classes.icon} onClick={() => verifyModal(true)} color="primary" />
                    <FormModal
                      title="Verify"
                      placeholder="قیمت"
                      inputType="number"
                      status={verifyModalStatus}
                      acceptButtonFunc={(body) => verifyCargo(body, cargo.id)}
                      cancelButtonFunc={() => verifyModal(false)}
                    />
                  </Box>
                  <Box>
                    <CancelIcon className={classes.icon} onClick={() => rejectModal(true)} color="primary" status={() => rejectModal(true)} />
                    <FormModal
                      title="Reject"
                      placeholder="دلیل ریجکت"
                      inputType="text"
                      status={rejectModalStatus}
                      acceptButtonFunc={(body) => rejectCargo(body, cargo.id)}
                      cancelButtonFunc={() => rejectModal(false)}
                    />
                    {/* <FormModal title="Verify" placeholder="قیمت" /> */}
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    cargoes: state.cargo.cargoes.list,
    verifyModalStatus: state.cargo.cargoModalsStatus.verifyCargoStatus,
    rejectModalStatus: state.cargo.cargoModalsStatus.rejectCargoStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCargoes: () => {
      dispatch({ type: CargoActions.GET_ALL_CARGOES.REQUESTING });
    },
    verifyModal: (status) => {
      dispatch({ type: CargoActions.VERIFY_MODAL_STATUS, payload: status });
    },
    rejectModal: (status) => {
      dispatch({ type: CargoActions.REJECT_MODAL_STATUS, payload: status });
    },
    verifyCargo: (data, cargoId) => {
      dispatch({ type: CargoActions.VERIFY_CARGO.REQUESTING, payload: { body: { cost: data }, cargoId: cargoId } });
    },
    rejectCargo: (data, cargoId) => {
      dispatch({ type: CargoActions.REJECT_CARGO.REQUESTING, payload: { body: { reject_reason: data }, cargoId: cargoId } });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cargo);
