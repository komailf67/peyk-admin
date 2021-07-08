import { combineReducers } from 'redux';
import auth from './auth';
import baseInfo from './baseInfo';
import cargo from './cargo';
import notification from './notification';
import country from './country';
import direction from './direction';

const rootReducer = combineReducers({
  auth,
  baseInfo,
  cargo,
  notification,
  country,
  direction,
});

export default rootReducer;
