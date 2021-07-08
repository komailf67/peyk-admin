import { combineReducers } from 'redux';

import checkPhoneNumber from './checkPhoneNumber';
import checkSmsCode from './checkSmsCode';

const auth = combineReducers({
  checkPhoneNumber,
  checkSmsCode,
});

export default auth;
