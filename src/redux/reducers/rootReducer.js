import { combineReducers } from 'redux';
import auth from './auth';
import baseInfo from './baseInfo';
import cargo from './cargo';
import notification from './notification';
import country from './country';
import direction from './direction';
import redirect from './redirect';

const rootReducer = combineReducers({
  auth,
  baseInfo,
  cargo,
  notification,
  country,
  direction,
  redirect,
});

export default rootReducer;
