import { combineReducers } from 'redux';

import getAllCargoes from './getAllCargoes';
import cargoModalsStatus from './cargoModalsStatus';
import verifyCargo from './verifyCargo';
import rejectCargo from './rejectCargo';
import changeToShipped from './changeToShipped';
import changeToDelivered from './changeToDelivered';
import cargoesStates from './cargoesStates';

const auth = combineReducers({
  cargoes: getAllCargoes,
  cargoModalsStatus,
  verifyCargo,
  rejectCargo,
  changeToShipped,
  changeToDelivered,
  cargoesStates,
});

export default auth;
