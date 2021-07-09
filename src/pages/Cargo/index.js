import React, { useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { TableContainer, TextField, Card, CardHeader, Button, Box } from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import CargoActions from '../../redux/actions/cargoActions';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import { useFormik } from 'formik';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
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
});

const Cargo = ({ getCargoes, cargoes }) => {
  const classes = useStyles();
  useEffect(() => {
    getCargoes();
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ردیف</StyledTableCell>
              <StyledTableCell align="right">مبدا</StyledTableCell>
              {/* <StyledTableCell align="right">نام فرستنده</StyledTableCell> */}
              <StyledTableCell align="right">مقصد</StyledTableCell>
              {/* <StyledTableCell align="right">نام گیرنده</StyledTableCell> */}
              <StyledTableCell align="right">اکشن</StyledTableCell>
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
                {/* <StyledTableCell align="right">{cargo.origin_address.full_name}</StyledTableCell> */}
                <StyledTableCell align="right">{cargo.destination_address.address_line_one}</StyledTableCell>
                {/* <StyledTableCell align="right">{cargo.destination_address.full_name}</StyledTableCell> */}
                <StyledTableCell align="right">
                  <DeleteRoundedIcon
                    // onClick={() => handleDeleteCountry(cargo.id)}
                    color="secondary"
                  />
                </StyledTableCell>
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
    cargoes: state.cargo.cargoes.list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCargoes: () => {
      dispatch({ type: CargoActions.GET_ALL_CARGOES.REQUESTING });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cargo);
