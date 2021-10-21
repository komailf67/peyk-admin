import { combineReducers } from 'redux';

import checkPhoneNumber from './checkPhoneNumber';
import checkSmsCode from './checkSmsCode';
import userInfo from './userInfo';
import fullnameModalStatus from './fullnameModalStatus';

const auth = combineReducers({
  checkPhoneNumber,
  checkSmsCode,
  userInfo,
  fullnameModalStatus,
});

export default auth;
