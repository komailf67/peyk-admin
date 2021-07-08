import { combineReducers } from 'redux';
import getAllDirections from './getAllDirections';
import createDirection from './createDirection';

const auth = combineReducers({
  directions: getAllDirections,
  createDirection,
});

export default auth;
