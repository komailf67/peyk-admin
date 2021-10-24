import { combineReducers } from 'redux';

import getAllCargoes from './getAllCargoes';
import cargoModalsStatus from './cargoModalsStatus';
import verifyCargo from './verifyCargo';
import rejectCargo from './rejectCargo';
import changeToShipped from './changeToShipped';
import changeToDelivered from './changeToDelivered';
import cargoesStates from './cargoesStates';
import userCargoes from './userCargoes';
import cargoModals from './cargoModals';

const auth = combineReducers({
  cargoes: getAllCargoes,
  cargoModalsStatus,
  verifyCargo,
  rejectCargo,
  changeToShipped,
  changeToDelivered,
  cargoesStates,
  userCargoes,
  cargoModals,
});

export default auth;
