import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { TableContainer, TextField, Card, Box, Button, Input, FormControl, InputLabel, MenuItem, Select, Container, Grid, Typography, Checkbox, ListItemText } from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import DirectionActions from '../../redux/actions/directionActions';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import EditIcon from '@material-ui/icons/Edit';
import CountryActions from '../../redux/actions/countryActions';
import stateTypes from '../../redux/actions/stateTypes';
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

const useStyles = makeStyles((theme) => ({
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
  formControl: {
    // margin: theme.spacing(1),
    minWidth: '100%',
    // maxWidth: 300,
  },
  actions: {
    display: 'flex',
  },
  buttons: {
    display: 'flex',
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const States = ({ getStates, states, updateState, createDirection, createState, changeDirectionState, deleteState }) => {
  const classes = useStyles();
  const [formState, setFormState] = useState('create');
  const init = {
    name: '',
    slug: '',
    needed_field: '',
    action_name: '',
    changeable_states: [],
    stateId: '',
  };
  const [initialValues, setInitialValues] = useState(init);
  useEffect(() => {
    getStates();
  }, []);
  const handleResetForm = () => {
    setFormState('create');
    setInitialValues(init);
  };
  const formik = useFormik({
    initialValues: initialValues,

    onSubmit: (values) => {
      if (formState === 'create') {
        createState(values, formik.resetForm);
      } else {
        updateState(values.stateId, values, handleResetForm);
      }
    },
    enableReinitialize: true,
  });

  const handleDeleteState = (stateId) => {
    deleteState(stateId);
  };
  const handleEditState = (state) => {
    setFormState('edit');
    setInitialValues({
      name: state.name ?? '',
      slug: state.slug ?? '',
      needed_field: state.needed_field ?? '',
      action_name: state.action_name ?? '',
      changeable_states: Array.isArray(state.changeable_state) ? state.changeable_state.map((item) => item.id) : [],
      stateId: state.id,
    });
  };

  return (
    <Container className={classes.container} component="main" maxWidth="md">
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Typography variant="h6" gutterBottom>
            ساخت مسیر{' '}
          </Typography>{' '}
          <Card className={classes.card}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3}>
                <TextField
                  variant="standard"
                  id="name"
                  label="نام"
                  placeholder="نام"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  // error={formik.touched.senderName && Boolean(formik.errors.senderName)}
                  // helperText={formik.touched.senderName && formik.errors.senderName}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  variant="standard"
                  id="slug"
                  label="اسلاگ"
                  value={formik.values.slug}
                  onChange={formik.handleChange}
                  // error={formik.touched.senderName && Boolean(formik.errors.senderName)}
                  // helperText={formik.touched.senderName && formik.errors.senderName}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">فیلد درخواستی</InputLabel>
                  <Select labelId="demo-simple-select-label" id="demo-simple-select" value={formik.values.needed_field} onChange={(e) => formik.setFieldValue('needed_field', e.target.value)}>
                    <MenuItem value={'reason'}>{'reason'}</MenuItem>
                    <MenuItem value={'cost'}>{'cost'}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  id="action_name"
                  label="نام اکشن"
                  variant="standard"
                  value={formik.values.action_name}
                  onChange={formik.handleChange}
                  disabled={formik.values.needed_field.length === 0}
                  // error={formik.touched.senderName && Boolean(formik.errors.senderName)}
                  // helperText={formik.touched.senderName && formik.errors.senderName}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-mutiple-checkbox-label">استیت های مجاز</InputLabel>
                  <Select
                    labelId="demo-mutiple-checkbox-label"
                    id="demo-mutiple-checkbox"
                    multiple
                    value={formik.values.changeable_states}
                    onChange={(e) => formik.setFieldValue('changeable_states', e.target.value)}
                    input={<Input />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {states.result &&
                      states.result.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          <Checkbox checked={formik.values.changeable_states.indexOf(item.id) > -1} />
                          <ListItemText primary={item.slug} />
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} className={classes.buttons}>
                <Box>
                  <Button type="submit" variant="contained" color="primary" className={classes.submit}>
                    Submit
                  </Button>
                </Box>
                <Box paddingLeft={'1rem'}>
                  <Button
                    type="button"
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    onClick={() => {
                      formik.resetForm();
                      setFormState('create');
                      setInitialValues(init);
                    }}
                  >
                    Reset
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Card>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>ردیف</StyledTableCell>
                  <StyledTableCell>نام</StyledTableCell>
                  <StyledTableCell>اسلاگ</StyledTableCell>
                  <StyledTableCell>استیت های مجاز</StyledTableCell>
                  {/* <StyledTableCell>وضعیت</StyledTableCell> */}
                  <StyledTableCell>اکشن</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {states?.result?.map((state, index) => (
                  <StyledTableRow key={state.name}>
                    <StyledTableCell component="th" scope="row">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {state.name}
                    </StyledTableCell>
                    <StyledTableCell> {state.slug}</StyledTableCell>
                    <StyledTableCell>
                      {(() => {
                        if (state?.changeable_state?.length > 0) {
                          return state?.changeable_state?.reduce(
                            (prevValue, currentValue, index) => (index + 1 === state.changeable_state.length ? prevValue + currentValue?.name : prevValue + currentValue?.name + ', '),
                            ''
                          );
                        } else {
                          return '';
                        }
                      })()}
                    </StyledTableCell>
                    {/* <StyledTableCell>
                      <Switch checked={state.is_active} onChange={() => handleChangeDirectionState(state.id)} name="checkedA" inputProps={{ 'aria-label': 'secondary checkbox' }} />
                    </StyledTableCell> */}
                    <StyledTableCell className={classes.actions}>
                      <Box paddingRight={'1rem'}>
                        <DeleteRoundedIcon onClick={() => handleDeleteState(state.id)} color="primary" className={classes.icon} />
                      </Box>
                      <Box>
                        <EditIcon onClick={() => handleEditState(state)} color="primary" className={classes.icon} />
                      </Box>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </form>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    states: state.state.all.list,
    countries: state.country.countries,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStates: () => {
      dispatch({ type: stateTypes.GET_ALL_STATES.REQUESTING });
    },
    createState: (params, resetForm) => {
      dispatch({ type: stateTypes.CREATE_STATE.REQUESTING, payload: { params, resetForm } });
    },
    updateState: (stateId, params, resetForm) => {
      dispatch({ type: stateTypes.UPDATE_STATE.REQUESTING, payload: { stateId, params, resetForm } });
    },
    deleteState: (stateId) => {
      dispatch({ type: stateTypes.DELETE_STATE.REQUESTING, payload: stateId });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(States);
