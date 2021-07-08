import { combineReducers } from 'redux';
import getAllCountries from './getAllCountries';
import deleteCountry from './deleteCountry';
import createCountry from './createCountry';

const auth = combineReducers({
  countries: getAllCountries,
  deleteCountry,
  createCountry,
});

export default auth;
