import { combineReducers } from 'redux';

import createCargo from './createCargo';

const auth = combineReducers({
  createCargo: createCargo,
});

export default auth;
