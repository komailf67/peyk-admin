import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { TableContainer, TextField, Card, Switch, Button, Box, FormControl, InputLabel, MenuItem, Select, Container, Grid, Typography } from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import DirectionActions from '../../redux/actions/directionActions';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import CountryActions from '../../redux/actions/countryActions';

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
  card: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
  },
  formControl: {
    minWidth: 100,
  },
  icon: {
    cursor: 'pointer',
  },
});

const Direction = ({ getDirections, directions, deleteDirection, createDirection, countries, getCountries, changeDirectionState }) => {
  const classes = useStyles();
  const [originCountry, setOriginCountry] = useState('');
  const [destinationCountry, setDestinationCountry] = useState('');
  const [description, setDescription] = useState('');
  useEffect(() => {
    getDirections();
    getCountries();
  }, []);

  const handleDeleteDirection = (directionId) => {
    deleteDirection(directionId);
  };

  const handleChangeOriginCountry = (event) => {
    setOriginCountry(event.target.value);
  };
  const handleChangeDestinationCountry = (event) => {
    setDestinationCountry(event.target.value);
  };
  const handleCreateDirection = () => {
    createDirection({ origin_country_id: originCountry, destination_country_id: destinationCountry, description: description, is_active: true });
  };
  const handleChangeDirectionState = (directionId) => {
    changeDirectionState(directionId);
  };
  return (
    <Container className={classes.container} component="main" maxWidth="md">
      <Grid container spacing={3}>
        <Typography variant="h6" gutterBottom>
          ساخت مسیر{' '}
        </Typography>{' '}
        <Card className={classes.card}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">مبدا</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={originCountry} onChange={handleChangeOriginCountry}>
                  {countries?.list?.result?.map((country, index) => (
                    <MenuItem value={country.id}>{country.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">مقصد</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={destinationCountry} onChange={handleChangeDestinationCountry}>
                  {countries?.list?.result?.map((country, index) => (
                    <MenuItem value={country.id}>{country.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Grid item xs={6} sm={6}>
                <TextField id="name" label="توضیحات" value={description} onChange={(e) => setDescription(e.target.value)} multiline rows={1} rowsMax={2} />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button type="button" variant="contained" color="primary" className={classes.submit} onClick={handleCreateDirection}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Card>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ردیف</StyledTableCell>
                <StyledTableCell>مبدا</StyledTableCell>
                <StyledTableCell>مقصد</StyledTableCell>
                <StyledTableCell>توضیحات</StyledTableCell>
                <StyledTableCell>وضعیت</StyledTableCell>
                <StyledTableCell>اکشن</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {directions?.list?.result?.map((direction, index) => (
                <StyledTableRow key={direction.name}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {direction.origin_country.name}
                  </StyledTableCell>
                  <StyledTableCell> {direction.destination_country.name}</StyledTableCell>
                  <StyledTableCell> {direction.description?.length > 20 ? direction.description.slice(0, 30) + '...' : direction.description}</StyledTableCell>
                  <StyledTableCell>
                    <Switch checked={direction.is_active} onChange={() => handleChangeDirectionState(direction.id)} name="checkedA" inputProps={{ 'aria-label': 'secondary checkbox' }} />
                  </StyledTableCell>
                  <StyledTableCell>
                    <DeleteRoundedIcon onClick={() => handleDeleteDirection(direction.id)} color="primary" className={classes.icon} />
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
    directions: state.direction.directions,
    countries: state.country.countries,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCountries: () => {
      dispatch({ type: CountryActions.GET_ALL_COUNTRIES.REQUESTING });
    },
    getDirections: () => {
      dispatch({ type: DirectionActions.GET_ALL_DIRECTIONS.REQUESTING });
    },
    createDirection: (data) => {
      dispatch({ type: DirectionActions.CREATE_DIRECTION.REQUESTING, payload: data });
    },
    deleteDirection: (directionId) => {
      dispatch({ type: DirectionActions.DELETE_DIRECTION.REQUESTING, payload: directionId });
    },
    changeDirectionState: (state) => {
      dispatch({ type: DirectionActions.CHANGE_STATE.REQUESTING, payload: state });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Direction);
