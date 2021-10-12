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

const Cargo = ({ getCargoes, cargoes, getCargoesStates, cargoesStates }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [cargoState, setCargoState] = useState({ value: 0, stateName: '' });
  const states = cargoesStates.result?.map((item) => item.slug);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setCargoState({ value: newValue, stateName: event.target.innerText });
  };
  useEffect(() => {
    getCargoesStates(); //TODO: runs twice
  }, []);
  useEffect(() => {
    if (!!states && states.length > 0) {
      getCargoes(states[value]);
    }
  }, [value, states?.length]);
  return (
    <Container className={classes.container} component="main" maxWidth="xl">
      <div className={classes.root}>
        <Paper square>
          <Tabs value={value} indicatorColor="primary" textColor="primary" onChange={handleChange} aria-label="disabled tabs example">
            {cargoesStates.result?.map((item) => (
              <Tab label={item.name} {...a11yProps(states.indexOf(item.slug))} />
            ))}
          </Tabs>
        </Paper>
        {cargoesStates.result?.map((item, index) => (
          <TabPanel value={cargoState.value} index={index}>
            <CargoTable cargoes={cargoes} stateEnum={item.slug} changableStates={item.changeable_state} />
          </TabPanel>
        ))}
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    cargoes: state.cargo.cargoes.list,
    verifyModalStatus: state.cargo.cargoModalsStatus.verifyCargoStatus,
    rejectModalStatus: state.cargo.cargoModalsStatus.rejectCargoStatus,
    cargoesStates: state.cargo.cargoesStates.list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCargoes: (state) => {
      dispatch({ type: CargoActions.GET_ALL_CARGOES.REQUESTING, payload: state });
    },
    getCargoesStates: () => {
      dispatch({ type: CargoActions.GET_ALL_CARGOES_STATES.REQUESTING });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cargo);
