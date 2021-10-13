import { combineReducers } from 'redux';
import users from './users';

const user = combineReducers({
  users,
});

export default user;
