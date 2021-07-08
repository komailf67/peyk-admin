import { call, put, fork, all, takeEvery, select } from 'redux-saga/effects';
import { BaseInfoServices } from '../../services/baseInfoServices';
import { CountryServices } from '../../services/countryServices';
import history from '../../utils/history';
// import { AuthService } from '../../services/authService';
// import API from '../../utils/API';
import AuthActions from '../actions/authActions';
import BaseInfoActions from '../actions/baseInfoActions';
import CountryActions from '../actions/countryActions';
import NotificationActions from '../actions/notificationActions';
import { ActionTypes } from '../types';

function* handleGetAllCountries(action) {
  try {
    const res = yield call(CountryServices.getAll, 'GET_ALL_COUNTRIES');
    const { data } = res;
    const { message } = data;

    yield put({
      type: CountryActions.GET_ALL_COUNTRIES.SUCCESS,
      payload: data.data,
    });
    yield put({
      type: NotificationActions.NOTIFICATION.SUCCESS.SET_SUCCESS_RESPONSE,
      payload: message,
    });
  } catch (err) {
    yield put({
      type: NotificationActions.NOTIFICATION.ERROR.SET_ERROR_RESPONSE,
      payload: err.response.data,
    });
  }
}
function* handleDeleteCountries(action) {
  try {
    const res = yield call(CountryServices.delete, 'DELETE_COUNTRY', action.payload);
    const { data } = res;
    const { message } = data;
    yield put({
      type: CountryActions.DELETE_COUNTRY.SUCCESS,
    });
    yield put({
      type: NotificationActions.NOTIFICATION.SUCCESS.SET_SUCCESS_RESPONSE,
      payload: message,
    });
    yield put({
      type: CountryActions.GET_ALL_COUNTRIES.REQUESTING,
    });
  } catch (err) {
    yield put({
      type: NotificationActions.NOTIFICATION.ERROR.SET_ERROR_RESPONSE,
      payload: err.response.data,
    });
  }
}
function* handleCreateCountry(action) {
  try {
    const res = yield call(CountryServices.create, 'CREATE_COUNTRY', action.payload);
    const { data } = res;
    const { message } = data;
    yield put({
      type: CountryActions.CREATE_COUNTRY.SUCCESS,
    });
    yield put({
      type: NotificationActions.NOTIFICATION.SUCCESS.SET_SUCCESS_RESPONSE,
      payload: message,
    });
    yield put({
      type: CountryActions.GET_ALL_COUNTRIES.REQUESTING,
    });
  } catch (err) {
    yield put({
      type: NotificationActions.NOTIFICATION.ERROR.SET_ERROR_RESPONSE,
      payload: err.response.data,
    });
  }
}

function* watchGetAllCountries() {
  yield takeEvery(CountryActions.GET_ALL_COUNTRIES.REQUESTING, handleGetAllCountries);
}
function* watchDeleteCountry() {
  yield takeEvery(CountryActions.DELETE_COUNTRY.REQUESTING, handleDeleteCountries);
}
function* watchCreateCountry() {
  yield takeEvery(CountryActions.CREATE_COUNTRY.REQUESTING, handleCreateCountry);
}

export default function* countrySaga() {
  yield all([fork(watchGetAllCountries), fork(watchCreateCountry), fork(watchDeleteCountry)]);
}
