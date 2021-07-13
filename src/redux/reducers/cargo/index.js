import { combineReducers } from 'redux';

import getAllCargoes from './getAllCargoes';
import cargoModalsStatus from './cargoModalsStatus';
import verifyCargo from './verifyCargo';
import rejectCargo from './rejectCargo';

const auth = combineReducers({
  cargoes: getAllCargoes,
  cargoModalsStatus,
  verifyCargo,
  rejectCargo,
});

export default auth;
