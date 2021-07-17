import { combineReducers } from 'redux';

import checkPhoneNumber from './checkPhoneNumber';
import checkSmsCode from './checkSmsCode';
import userInfo from './userInfo';

const auth = combineReducers({
  checkPhoneNumber,
  checkSmsCode,
  userInfo,
});

export default auth;
