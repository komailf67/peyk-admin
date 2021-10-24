import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import { MenuItem, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Select, InputLabel, FormControl, List, ListItem, ListItemText, Grid } from '@material-ui/core';
import FormModal from '../../components/modal/FormModal';
import CargoActions from '../../redux/actions/cargoActions';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { connect } from 'react-redux';
import RawModal from '../modal/RawModal';
const useStyles = makeStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#ecedef',
    },
    '&:first-child': {
      borderTopLeftRadius: theme.shape.borderRadius,
      borderTopRightRadius: theme.shape.borderRadius,
    },
    '&:last-child': {
      borderBottomLeftRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius,
    },
    paddingTop: '1rem',
    paddingBottom: '1rem',
  },
  table: {
    minWidth: 650,
  },
  icon: {
    cursor: 'pointer',
  },
  select: { minWidth: '120px' },
  actionColumn: { display: 'flex', flexDirection: 'row' },
  primary: {
    ...theme.typography.subtitle2,
    color: theme.palette.text.hint,
  },
  primaryValue: {
    ...theme.typography.subtitle2,
    color: theme.palette.text.primary,
    fontWeight: 600,
  },
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

const CargoTable = ({ cargoes, stateEnum, changableStates, changeCargoState, showCargoModalStatus, changeShowCargoModalState }) => {
  const [selectedCargo, setSelectedCargo] = useState(null);
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
  const handleShowCargo = (cargo) => {
    changeShowCargoModalState(true);
    setSelectedCargo(cargo);
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ردیف</StyledTableCell>
              <StyledTableCell>مسیر</StyledTableCell>
              {/* <StyledTableCell >نام فرستنده</StyledTableCell> */}
              <StyledTableCell>کاربر</StyledTableCell>
              {/* <StyledTableCell >نام گیرنده</StyledTableCell> */}
              <StyledTableCell>زمان ثبت</StyledTableCell>
              <StyledTableCell>پاکت/بسته</StyledTableCell>
              <StyledTableCell>مشاهده</StyledTableCell>
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
                  {cargo.origin_address.country.name}-{cargo.destination_address.country.name}
                </StyledTableCell>
                {/* <StyledTableCell >{cargo.origin_address.full_name}</StyledTableCell> */}
                <StyledTableCell>{cargo.user.name}</StyledTableCell>
                {/* <StyledTableCell >{cargo.destination_address.full_name}</StyledTableCell> */}
                <StyledTableCell>{cargo.created_at}</StyledTableCell>
                <StyledTableCell>{cargo.type_translation}</StyledTableCell>
                <StyledTableCell>
                  <VisibilityIcon className={classes.icon} onClick={() => handleShowCargo(cargo)} color="primary" />
                </StyledTableCell>
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
                {showCargoModalStatus && (
                  <RawModal maxWidth={'lg'} status={showCargoModalStatus} cancelButtonFunc={() => changeShowCargoModalState(false)}>
                    <List>
                      <ListItem className={classes.root}>
                        <Grid container spacing={1}>
                          <Grid item xs={3}>
                            <ListItemText classes={{ primary: classes.primary }} primary={'کاربر ثبت کننده'} />
                          </Grid>
                          <Grid item xs={9}>
                            <ListItemText classes={{ primary: classes.primaryValue }} primary={selectedCargo.user.name} />
                          </Grid>
                        </Grid>
                      </ListItem>
                      <ListItem className={classes.root}>
                        <Grid container spacing={1}>
                          <Grid item xs={3}>
                            <ListItemText classes={{ primary: classes.primary }} primary={'شماره تماس'} />
                          </Grid>
                          <Grid item xs={9}>
                            <ListItemText classes={{ primary: classes.primaryValue }} primary={selectedCargo.user.phone} />
                          </Grid>
                        </Grid>
                      </ListItem>
                      <ListItem className={classes.root}>
                        <Grid container spacing={1}>
                          <Grid item xs={3}>
                            <ListItemText classes={{ primary: classes.primary }} primary={'قیمت'} />
                          </Grid>
                          <Grid item xs={9}>
                            <ListItemText classes={{ primary: classes.primaryValue }} primary={selectedCargo.value} />
                          </Grid>
                        </Grid>
                      </ListItem>
                      <ListItem className={classes.root}>
                        <Grid container spacing={1}>
                          <Grid item xs={3}>
                            <ListItemText classes={{ primary: classes.primary }} primary={'زمان'} />
                          </Grid>
                          <Grid item xs={9}>
                            <ListItemText classes={{ primary: classes.primaryValue }} primary={selectedCargo.created_at} />
                          </Grid>
                        </Grid>
                      </ListItem>
                      <ListItem className={classes.root}>
                        <Grid container spacing={1}>
                          <Grid item xs={3}>
                            <ListItemText classes={{ primary: classes.primary }} primary={'آدرس فرستنده'} />
                          </Grid>
                          <Grid item xs={9}>
                            <ListItemText classes={{ primary: classes.primaryValue }} primary={selectedCargo.origin_address.address_line_one} />
                          </Grid>
                        </Grid>
                      </ListItem>
                      <ListItem className={classes.root}>
                        <Grid container spacing={1}>
                          <Grid item xs={3}>
                            <ListItemText classes={{ primary: classes.primary }} primary={'آدرس گیرنده'} />
                          </Grid>
                          <Grid item xs={9}>
                            <ListItemText classes={{ primary: classes.primaryValue }} primary={selectedCargo.destination_address.address_line_one} />
                          </Grid>
                        </Grid>
                      </ListItem>
                      {/* <ListItem className={classes.root}>
                        <Grid container spacing={1}>
                          <Grid item xs={3}>
                            <ListItemText classes={{ primary: classes.primary }} primary={'توضیحات'} />
                          </Grid>
                          <Grid item xs={9}>
                            <ListItemText classes={{ primary: classes.primaryValue }} primary={'22222222222222222'} />
                          </Grid>
                        </Grid>
                      </ListItem> */}
                    </List>
                    {/* <CargoTable cargoes={{ data: userCargoes }} changableStates={[]} /> */}
                  </RawModal>
                )}
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
    showCargoModalStatus: state.cargo.cargoModals.showCargoModalStatus,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    changeCargoState: (key, data, cargoId, stateId, setOpen, stateEnum) => {
      dispatch({ type: CargoActions.CHANGE_CARGO_STATE.REQUESTING, payload: { body: key ? { [key]: data } : null, cargoId: cargoId, stateId, setOpen, stateEnum } });
    },
    changeShowCargoModalState: (state) => {
      dispatch({ type: CargoActions.SHOW_CARGO_MODAL_STATE, payload: state });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CargoTable);
