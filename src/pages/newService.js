import React, { useEffect } from 'react';
import {
  Card,
  CardContent,
  CssBaseline,
  CardActions,
  TextField,
  Button,
  Typography,
  Container,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Grid,
  FormControlLabel,
  Checkbox,
  CardHeader,
} from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import DropDownMenu from '../components/menus/DropDownMenu';
import { connect } from 'react-redux';
import BaseInfoActions from '../redux/actions/baseInfoActions';
import CargoActions from '../redux/actions/cargoActions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    minWidth: 275,
    marginBottom: '20px',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));
const NewService = ({ getDiretions, directions, createCargo }) => {
  const classes = useStyles();
  const [direction, setDirection] = React.useState('');

  useEffect(() => {
    getDiretions();
  }, []);

  const handleChangeDirection = (event) => {
    setDirection(event.target.value);
  };

  // const validationSchema = yup.object({
  //   email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  //   password: yup.string('Enter your password').min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
  // });

  const formik = useFormik({
    initialValues: {
      senderName: '',
      senderNationalCode: '',
      senderPhone: '',
      senderCity: '',
      senderState: '',
      senderAddress: '',
      senderPlateNumber: '',
      senderUnit: '',
      senderPostalCode: '',
      receiverName: '',
      receiverNationalCode: '',
      receiverPhone: '',
      receiverCity: '',
      receiverState: '',
      receiverAddress: '',
      receiverPlateNumber: '',
      receiverUnit: '',
      receiverPostalCode: '',
      content: '',
      weight: '',
      value: '',
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      const selectedDirection = directions.find((item) => item.id === direction);
      const dataToSend = {
        content: values.content,
        weight: values.weight,
        value: values.value,
        origin_address: {
          country_id: selectedDirection.origin_country.id,
          city_name: values.senderCity,
          province_name: values.senderState,
          full_name: values.senderName,
          national_code: values.senderNationalCode,
          postal_code: values.senderPostalCode,
          phone: values.senderPhone,
          address_line_one: values.senderAddress,
          address_line_two: null,
          plate_number: values.senderPlateNumber,
          unit: values.senderUnit,
          // unit3: 4,
        },
        destination_address: {
          country_id: selectedDirection.destination_country.id,
          city_name: values.receiverCity,
          province_name: values.receiverState,
          full_name: values.receiverName,
          national_code: values.receiverNationalCode,
          postal_code: values.receiverPostalCode,
          phone: values.receiverPhone,
          address_line_one: values.receiverAddress,
          address_line_two: null,
          plate_number: values.receiverPlateNumber,
          unit: values.receiverUnit,
          // unit3: 4,
        },
      };
      createCargo(dataToSend);
    },
  });

  return (
    <Container component="main" maxWidth="md">
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Card className={classes.card}>
          {/* <CardHeader title="Shrimp and Chorizo Paella" /> */}
          {/* <Box> */}
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">انتخاب مسیر</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={direction} onChange={handleChangeDirection}>
              {directions.length &&
                directions.map(({ id, origin_country, destination_country }, index) => (
                  <MenuItem value={id}>
                    {origin_country.name} به {destination_country.name}
                  </MenuItem>
                ))}
              {/* <MenuItem value={10}>Ten</MenuItem> */}
            </Select>
          </FormControl>
          {/* <DropDownMenu buttonName="انتخاب مسیر" /> */}
          {/* </Box> */}
        </Card>
        <Card className={classes.card}>
          <CardHeader title="آدرس فرستنده" />
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="senderName"
                  name="senderName"
                  label="نام و نام خانوادگی"
                  fullWidth
                  autoComplete="shipping address-level2"
                  value={formik.values.senderName}
                  onChange={formik.handleChange}
                  // error={formik.touched.senderName && Boolean(formik.errors.senderName)}
                  // helperText={formik.touched.senderName && formik.errors.senderName}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField id="senderNationalCode" name="senderNationalCode" label="کد ملی" fullWidth value={formik.values.senderNationalCode} onChange={formik.handleChange} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField id="senderPhone" name="senderPhone" label="شماره تماس" fullWidth autoComplete="شماره تماس" value={formik.values.senderPhone} onChange={formik.handleChange} />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField id="senderCity" name="senderCity" label="شهر" fullWidth autoComplete="shipping address-level2" value={formik.values.senderCity} onChange={formik.handleChange} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField id="senderState" name="senderState" label="استان" fullWidth value={formik.values.senderState} onChange={formik.handleChange} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="senderAddress"
                  name="senderAddress"
                  label="آدرس فرستنده"
                  fullWidth
                  autoComplete="shipping address-line1"
                  value={formik.values.senderAddress}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField id="senderPlateNumber" name="senderPlateNumber" label="پلاک" fullWidth autoComplete="پلاک" value={formik.values.senderPlateNumber} onChange={formik.handleChange} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField id="senderUnit" name="senderUnit" label="واحد" fullWidth autoComplete="واحد" value={formik.values.senderUnit} onChange={formik.handleChange} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField id="senderPostalCode" name="senderPostalCode" label="کد پستی" fullWidth autoComplete="کد پستی" value={formik.values.senderPostalCode} onChange={formik.handleChange} />
              </Grid>
            </Grid>
          </Box>
        </Card>
        <Card className={classes.card}>
          <CardHeader title="آدرس گیرنده" />
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="receiverName"
                  name="receiverName"
                  label="نام و نام خانوادگی"
                  fullWidth
                  autoComplete="shipping address-level2"
                  value={formik.values.receiverName}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField id="receiverNationalCode" name="receiverNationalCode" label="کد ملی" fullWidth value={formik.values.receiverNationalCode} onChange={formik.handleChange} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField id="receiverPhone" name="receiverPhone" label="شماره تماس" fullWidth autoComplete="شماره تماس" value={formik.values.receiverPhone} onChange={formik.handleChange} />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField id="receiverCity" name="receiverCity" label="شهر" fullWidth autoComplete="shipping address-level2" value={formik.values.receiverCity} onChange={formik.handleChange} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField id="receiverState" name="receiverState" label="استان" fullWidth value={formik.values.receiverState} onChange={formik.handleChange} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="receiverAddress"
                  name="receiverAddress"
                  label="آدرس فرستنده"
                  fullWidth
                  autoComplete="shipping address-line1"
                  value={formik.values.receiverAddress}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField id="receiverPlateNumber" name="receiverPlateNumber" label="پلاک" fullWidth autoComplete="پلاک" value={formik.values.receiverPlateNumber} onChange={formik.handleChange} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField id="receiverUnit" name="receiverUnit" label="واحد" fullWidth autoComplete="واحد" value={formik.values.receiverUnit} onChange={formik.handleChange} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField id="receiverPostalCode" name="receiverPostalCode" label="کد پستی" fullWidth autoComplete="کد پستی" value={formik.values.receiverPostalCode} onChange={formik.handleChange} />
              </Grid>
            </Grid>
          </Box>
        </Card>
        <Card className={classes.card}>
          <CardHeader title="مشخصات بسته" />
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl className={classes.formControl} disabled>
                  <InputLabel id="demo-simple-select-disabled-label">نوع بسته</InputLabel>
                  <Select
                    labelId="demo-simple-select-disabled-label"
                    id="demo-simple-select-disabled"
                    value={1}
                    // onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>پاکت</MenuItem>
                  </Select>
                </FormControl>{' '}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField id="content" name="content" label="محتویات بسته" fullWidth value={formik.values.content} onChange={formik.handleChange} />
              </Grid>
              <Grid item xs={12}>
                <TextField id="value" name="value" label="ارزش بسته(تومان)" fullWidth value={formik.values.value} onChange={formik.handleChange} />
              </Grid>
              <Grid item xs={12}>
                <TextField id="weight" name="weight" label="وزن بسته" fullWidth value={formik.values.weight} onChange={formik.handleChange} />
              </Grid>
            </Grid>
          </Box>
        </Card>
        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
          ادامه
        </Button>
      </form>
    </Container>
    // <Container component="main" maxWidth="md">
    //   <CssBaseline />
    //   <div className={classes.paper}>
    //     <Typography component="h1" variant="h5">
    //       ثبت درخواست
    //     </Typography>

    //     <form className={classes.form} noValidate>
    //       <Box>
    //         <DropDownMenu buttonName="انتخاب مسیر" />
    //       </Box>
    //       <FormControl className={classes.formControl} disabled>
    //         <InputLabel id="demo-simple-select-disabled-label">کشور مبدا</InputLabel>
    //         <Select
    //           labelId="demo-simple-select-disabled-label"
    //           id="demo-simple-select-disabled"
    //           value={10}
    //           // onChange={handleChange}
    //         >
    //           <MenuItem value="">
    //             <em>None</em>
    //           </MenuItem>
    //           <MenuItem value={10}>Ten</MenuItem>
    //         </Select>
    //         <div>
    //           <TextField  id="outlined-required" label="شهر" defaultValue="" variant="outlined" />
    //           <TextField required id="outlined-required" label="استان" defaultValue="" variant="outlined" />
    //         </div>
    //         <div>
    //           <TextField required id="outlined-required" label="آدرس" defaultValue="" variant="outlined" />
    //         </div>
    //       </FormControl>
    //     </form>
    //     <form className={classes.form} noValidate>
    //       <Box>
    //         <DropDownMenu buttonName="انتخاب مسیر" />
    //       </Box>
    //       <FormControl className={classes.formControl} disabled>
    //         <InputLabel id="demo-simple-select-disabled-label">کشور مبدا</InputLabel>
    //         <Select
    //           labelId="demo-simple-select-disabled-label"
    //           id="demo-simple-select-disabled"
    //           value={10}
    //           // onChange={handleChange}
    //         >
    //           <MenuItem value="">
    //             <em>None</em>
    //           </MenuItem>
    //           <MenuItem value={10}>Ten</MenuItem>
    //         </Select>
    //         <div>
    //           <TextField required id="outlined-required" label="شهر" defaultValue="" variant="outlined" />
    //           <TextField required id="outlined-required" label="استان" defaultValue="" variant="outlined" />
    //         </div>
    //         <div>
    //           <TextField required id="outlined-required" label="آدرس" defaultValue="" variant="outlined" />
    //         </div>
    //       </FormControl>
    //     </form>
    //     <Button type="button" fullWidth variant="contained" color="primary" className={classes.submit}>
    //       ادامه
    //     </Button>
    //   </div>
    // </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    directions: state.baseInfo.directions.list,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getDiretions: () => {
    dispatch({
      type: BaseInfoActions.BASE_INFO.DIRECTIONS.REQUESTING,
    });
  },
  createCargo: (data) => {
    dispatch({
      type: CargoActions.CARGO.CREATE.REQUESTING,
      payload: data,
    });
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(NewService);
