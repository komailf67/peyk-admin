import React, { useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Paper, TableRow, TableHead, TableContainer, TextField, Card, TableBody, Button, Table, Grid, Container, Typography, TableCell } from '@material-ui/core';
import { connect } from 'react-redux';
import CountryActions from '../../redux/actions/countryActions';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import { useFormik } from 'formik';

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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const useStyles = makeStyles({
  container: { marginTop: '10px' },
  root: {
    flexGrow: 1,
  },
  table: {
    minWidth: 700,
  },
  card: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
  },
  icon: {
    cursor: 'pointer',
  },
});

const Country = ({ getCountries, countries, deleteCountry, createCountry, isFormSubmitted, changeCountryFormSubmitState }) => {
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
  useEffect(() => {
    if (isFormSubmitted) {
      formik.resetForm();
      changeCountryFormSubmitState(false);
    }
  }, [isFormSubmitted]);
  return (
    <Container className={classes.container} component="main" maxWidth="md">
      <Grid container spacing={3}>
        <Typography variant="h6" gutterBottom>
          ساخت کشور{' '}
        </Typography>
        <Card className={classes.card}>
          <div className={classes.root}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id="name"
                    label="نام کشور"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    // error={formik.touched.senderName && Boolean(formik.errors.senderName)}
                    // helperText={formik.touched.senderName && formik.errors.senderName}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField id="iso_code" label="Iso code" value={formik.values.iso_code} onChange={formik.handleChange} />{' '}
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField id="call_prefix" label="Call prefix" value={formik.values.call_prefix} onChange={formik.handleChange} />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Button type="submit" variant="contained" color="primary" className={classes.submit}>
                    Submit
                  </Button>{' '}
                </Grid>
              </Grid>{' '}
            </form>
          </div>
        </Card>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ردیف</StyledTableCell>
                <StyledTableCell>نام کشور</StyledTableCell>
                <StyledTableCell>iso code</StyledTableCell>
                <StyledTableCell>پیش شماره</StyledTableCell>
                <StyledTableCell>اکشن</StyledTableCell>
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
                  <StyledTableCell>{country.iso_code}</StyledTableCell>
                  <StyledTableCell>{country.call_prefix}</StyledTableCell>
                  <StyledTableCell>
                    <DeleteRoundedIcon className={classes.icon} onClick={() => handleDeleteCountry(country.id)} color="primary" />
                  </StyledTableCell>
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
    countries: state.country.countries,
    isFormSubmitted: state.country.createCountry.success,
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
    changeCountryFormSubmitState: (state) => {
      dispatch({
        type: CountryActions.CREATE_COUNTRY.FORM_SUBMIT_STATE,
        payload: state,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Country);
