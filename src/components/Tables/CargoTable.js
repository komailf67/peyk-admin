import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Box, StylesProvider } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import FormModal from '../../components/modal/FormModal';
import CargoActions from '../../redux/actions/cargoActions';

import PaymentIcon from '@material-ui/icons/Payment';
import CancelIcon from '@material-ui/icons/Cancel';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import { connect } from 'react-redux';
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  icon: {
    cursor: 'pointer',
  },
  actionColumn: { display: 'flex', flexDirection: 'row' },
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

const CargoTable = ({ cargoes, rejectCargo, stateEnum, pay, verifyModal, rejectModal, rejectModalStatus, verifyModalStatus, verifyCargo, changeStateToDelivered, changeStateToShipped }) => {
  const [selectedCargoId, setSelectedCargoId] = useState('');
  const classes = useStyles();
  const handlePayment = (cargoId) => {
    pay(cargoId);
  };
  console.log('sssssssssssssssssss', selectedCargoId);
  // const actions = {pending:{icon}}
  const verifyHandler = (cargoId) => {
    verifyModal(true);
    setSelectedCargoId(cargoId);
  };
  const rejectHandler = (cargoId) => {
    rejectModal(true);
    setSelectedCargoId(cargoId);
  };
  return (
    <>
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
              {['pending', 'paid', 'shipped'].indexOf(stateEnum) > -1 ? <StyledTableCell>اکشن</StyledTableCell> : null}
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
                {['pending', 'paid', 'shipped'].indexOf(stateEnum) > -1 ? (
                  <StyledTableCell className={classes.actionColumn}>
                    <Box>
                      {stateEnum === 'pending' ? <CheckCircleOutlineIcon className={classes.icon} onClick={() => verifyHandler(cargo.id)} color="primary" /> : null}
                      {stateEnum === 'paid' ? <LocalShippingIcon className={classes.icon} onClick={() => changeStateToShipped(cargo.id)} color="primary" /> : null}
                      <FormModal
                        title="Verify"
                        placeholder="قیمت"
                        inputType="number"
                        status={verifyModalStatus}
                        acceptButtonFunc={(body) => verifyCargo(body, selectedCargoId)}
                        cancelButtonFunc={() => verifyModal(false)}
                        cargo={cargo}
                      />
                    </Box>
                    <Box>
                      {stateEnum === 'pending' ? <CancelIcon className={classes.icon} onClick={() => rejectHandler(cargo.id)} color="primary" /> : null}
                      {stateEnum === 'shipped' ? <DoneAllIcon className={classes.icon} onClick={() => changeStateToDelivered(cargo.id)} color="primary" /> : null}
                      <FormModal
                        title="Reject"
                        placeholder="دلیل ریجکت"
                        inputType="text"
                        status={rejectModalStatus}
                        acceptButtonFunc={(body) => rejectCargo(body, selectedCargoId)}
                        cancelButtonFunc={() => rejectModal(false)}
                      />
                      {/* <FormModal title="Verify" placeholder="قیمت" /> */}
                    </Box>
                  </StyledTableCell>
                ) : null}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
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
    changeStateToShipped: (cargoId) => {
      dispatch({ type: CargoActions.CHANGE_STATE_TO_SHIPPED.REQUESTING, payload: cargoId });
    },
    changeStateToDelivered: (cargoId) => {
      dispatch({ type: CargoActions.CHANGE_STATE_TO_DELIVERED.REQUESTING, payload: cargoId });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CargoTable);
