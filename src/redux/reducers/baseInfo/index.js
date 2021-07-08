import { combineReducers } from 'redux';

import directions from './directions';

const auth = combineReducers({
  directions: directions,
});

export default auth;
