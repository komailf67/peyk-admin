import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab, Container, Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import CargoActions from '../../redux/actions/cargoActions';
import { TabPanel } from '../../components/TabMenu/tabPanel';
import CargoTable from '../../components/Tables/CargoTable';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  icon: {
    cursor: 'pointer',
  },
});

const Cargo = ({ getCargoes, cargoes }) => {
  const classes = useStyles();
  const states = ['pending', 'verified', 'paid', 'shipped', 'delivered', 'rejected'];
  const [value, setValue] = useState(states.indexOf('pending'));
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    getCargoes(states[value]);
  }, [value]);

  return (
    <Container className={classes.container} component="main" maxWidth="xl">
      <div className={classes.root}>
        <Paper square>
          <Tabs value={value} indicatorColor="primary" textColor="primary" onChange={handleChange} aria-label="disabled tabs example">
            <Tab label="در حال بررسی" {...a11yProps(states.indexOf('pending'))} />
            <Tab label="تایید شده" {...a11yProps(states.indexOf('verified'))} />
            <Tab label="پرداخت شده" {...a11yProps(states.indexOf('paid'))} />
            <Tab label="فرستاده شده" {...a11yProps(states.indexOf('shipped'))} />
            <Tab label="تحویل داده شده" {...a11yProps(states.indexOf('delivered'))} />
            <Tab label="رد شده" {...a11yProps(states.indexOf('rejected'))} />
          </Tabs>
        </Paper>
        <TabPanel value={value} index={states.indexOf('pending')}>
          <CargoTable cargoes={cargoes} stateEnum={states[value]} />
        </TabPanel>
        <TabPanel value={value} index={states.indexOf('verified')}>
          <CargoTable cargoes={cargoes} stateEnum={states[value]} />
        </TabPanel>
        <TabPanel value={value} index={states.indexOf('paid')}>
          <CargoTable cargoes={cargoes} stateEnum={states[value]} />
        </TabPanel>
        <TabPanel value={value} index={states.indexOf('delivered')}>
          <CargoTable cargoes={cargoes} stateEnum={states[value]} />
        </TabPanel>
        <TabPanel value={value} index={states.indexOf('shipped')}>
          <CargoTable cargoes={cargoes} stateEnum={states[value]} />
        </TabPanel>
        <TabPanel value={value} index={states.indexOf('rejected')}>
          <CargoTable cargoes={cargoes} stateEnum={states[value]} />
        </TabPanel>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    cargoes: state.cargo.cargoes.list,
    verifyModalStatus: state.cargo.cargoModalsStatus.verifyCargoStatus,
    rejectModalStatus: state.cargo.cargoModalsStatus.rejectCargoStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCargoes: (state) => {
      dispatch({ type: CargoActions.GET_ALL_CARGOES.REQUESTING, payload: state });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cargo);
