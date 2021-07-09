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
import CountryActions from '../../redux/actions/countryActions';
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const Country = ({ getCountries, countries, deleteCountry, createCountry }) => {
  const classes = useStyles();
  useEffect(() => {
    getCountries();
  }, []);
  const handleDeleteCountry = (countryId) => {
    deleteCountry(countryId);
  };
  const formik = useFormik({
    initialValues: {
      name: '',
      iso_code: '',
      call_prefix: '',
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      createCountry(values);
      // resetForm();
    },
  });
  return (
    <>
      <Card className={classes.card}>
        <CardHeader title="ساخت کشور" />
        <form onSubmit={formik.handleSubmit}>
          <TextField
            id="name"
            label="نام کشور"
            value={formik.values.name}
            onChange={formik.handleChange}
            // error={formik.touched.senderName && Boolean(formik.errors.senderName)}
            // helperText={formik.touched.senderName && formik.errors.senderName}
          />
          <TextField id="iso_code" label="Iso code" value={formik.values.iso_code} onChange={formik.handleChange} />
          <TextField id="call_prefix" label="Call prefix" value={formik.values.call_prefix} onChange={formik.handleChange} />
          <Box>
            <Button type="submit" variant="contained" color="primary" className={classes.submit}>
              Submit
            </Button>
          </Box>
        </form>
      </Card>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ردیف</StyledTableCell>
              <StyledTableCell align="right">نام کشور</StyledTableCell>
              <StyledTableCell align="right">iso code</StyledTableCell>
              <StyledTableCell align="right">پیش شماره</StyledTableCell>
              <StyledTableCell align="right">اکشن</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countries?.list?.result?.map((country, index) => (
              <StyledTableRow key={country.name}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {country.name}
                </StyledTableCell>
                <StyledTableCell align="right">{country.iso_code}</StyledTableCell>
                <StyledTableCell align="right">{country.call_prefix}</StyledTableCell>
                <StyledTableCell align="right">
                  <DeleteRoundedIcon onClick={() => handleDeleteCountry(country.id)} color="secondary" />
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
    countries: state.country.countries,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCountries: () => {
      dispatch({ type: CountryActions.GET_ALL_COUNTRIES.REQUESTING });
    },
    createCountry: (data) => {
      dispatch({ type: CountryActions.CREATE_COUNTRY.REQUESTING, payload: data });
    },
    deleteCountry: (countryId) => {
      dispatch({ type: CountryActions.DELETE_COUNTRY.REQUESTING, payload: countryId });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Country);
