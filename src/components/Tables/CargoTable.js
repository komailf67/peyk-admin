import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import { MenuItem, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Select, InputLabel, FormControl } from '@material-ui/core';
import FormModal from '../../components/modal/FormModal';
import CargoActions from '../../redux/actions/cargoActions';

import { connect } from 'react-redux';
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  icon: {
    cursor: 'pointer',
  },
  select: { minWidth: '120px' },
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

const CargoTable = ({ cargoes, stateEnum, changableStates, changeCargoState }) => {
  const [selectedCargoId, setSelectedCargoId] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedState, setSelectedState] = useState(false);
  const classes = useStyles();

  const handleChangeAction = (event, value) => {
    const { selected, cargoId } = value.props;
    setSelectedCargoId(cargoId);
    if (!!selected.needed_field) {
      setSelectedState(selected);
      setOpen(true);
    } else {
      changeCargoState(null, null, cargoId, selected.id, setOpen, stateEnum);
    }
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
              {changableStates.length > 0 ? <StyledTableCell>اکشن</StyledTableCell> : null}
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
                {changableStates.length > 0 && (
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Choose One</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      className={classes.select}
                      // value={value}
                      onChange={handleChangeAction}
                    >
                      {changableStates.length > 0 &&
                        changableStates?.map((item, index) => (
                          <MenuItem key={index} selected={item} value={cargo.id} cargoId={cargo.id}>
                            {item.action_name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                )}
                <FormModal
                  title={selectedState.action_name}
                  placeholder={selectedState.needed_field}
                  inputType="text"
                  status={open}
                  acceptButtonFunc={(body) => changeCargoState(selectedState.needed_field, body, selectedCargoId, selectedState.id, setOpen, stateEnum)}
                  cancelButtonFunc={() => setOpen(false)}
                />
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
    changeCargoState: (key, data, cargoId, stateId, setOpen, stateEnum) => {
      dispatch({ type: CargoActions.CHANGE_CARGO_STATE.REQUESTING, payload: { body: key ? { [key]: data } : null, cargoId: cargoId, stateId, setOpen, stateEnum } });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CargoTable);
