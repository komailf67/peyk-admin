import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { TableContainer, TextField, Card, CardHeader, Button, Box, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import DirectionActions from '../../redux/actions/directionActions';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import CountryActions from '../../redux/actions/countryActions';

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

const Direction = ({ getDirections, directions, deleteDirection, createDirection, countries, getCountries }) => {
  const classes = useStyles();
  const [originCountry, setOriginCountry] = useState('');
  const [destinationCountry, setDestinationCountry] = useState('');
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
    createDirection({ origin_country_id: originCountry, destination_country_id: destinationCountry });
  };
  return (
    <>
      <Card className={classes.card}>
        <CardHeader title="ساخت کشور" />
        <Box>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">مبدا</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={originCountry} onChange={handleChangeOriginCountry}>
              {countries?.list?.result?.map((country, index) => (
                <MenuItem value={country.id}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">مبدا</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={destinationCountry} onChange={handleChangeDestinationCountry}>
              {countries?.list?.result?.map((country, index) => (
                <MenuItem value={country.id}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box>
            <Button type="button" variant="contained" color="primary" className={classes.submit} onClick={handleCreateDirection}>
              Submit
            </Button>
          </Box>
        </Box>
      </Card>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ردیف</StyledTableCell>
              <StyledTableCell align="right">مبدا</StyledTableCell>
              <StyledTableCell align="right">مقصد</StyledTableCell>
              <StyledTableCell align="right">اکشن</StyledTableCell>
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
                <StyledTableCell align="right"> {direction.destination_country.name}</StyledTableCell>
                <StyledTableCell align="right">
                  <DeleteRoundedIcon onClick={() => handleDeleteDirection(direction.id)} color="secondary" />
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Direction);
