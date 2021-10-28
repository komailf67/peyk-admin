import { combineReducers } from 'redux';
import all from './all';

const auth = combineReducers({
  all,
});

export default auth;
