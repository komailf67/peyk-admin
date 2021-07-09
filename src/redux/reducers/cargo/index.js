import { combineReducers } from 'redux';

import getAllCargoes from './getAllCargoes';

const auth = combineReducers({
  cargoes: getAllCargoes,
});

export default auth;
