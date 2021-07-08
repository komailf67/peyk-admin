import { call, put, fork, all, takeEvery, select } from 'redux-saga/effects';
import { BaseInfoServices } from '../../services/baseInfoServices';
import { DirectionServices } from '../../services/directionServices';
import history from '../../utils/history';
// import { AuthService } from '../../services/authService';
// import API from '../../utils/API';
import AuthActions from '../actions/authActions';
import BaseInfoActions from '../actions/baseInfoActions';
import CountryActions from '../actions/countryActions';
import DirectionActions from '../actions/directionActions';
import NotificationActions from '../actions/notificationActions';

function* handleGetAllDirections(action) {
  try {
    const res = yield call(DirectionServices.getAll, 'GET_ALL_DIRECTIONS');
    const { data } = res;
    const { message } = data;

    yield put({
      type: DirectionActions.GET_ALL_DIRECTIONS.SUCCESS,
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
function* handleCreateDirections(action) {
  try {
    const res = yield call(DirectionServices.create, 'CREATE_DIRECTION', action.payload);
    const { data } = res;
    const { message } = data;

    yield put({
      type: DirectionActions.CREATE_DIRECTION.SUCCESS,
      payload: data.data,
    });
    yield put({
      type: NotificationActions.NOTIFICATION.SUCCESS.SET_SUCCESS_RESPONSE,
      payload: message,
    });
    yield put({
      type: DirectionActions.GET_ALL_DIRECTIONS.REQUESTING,
    });
  } catch (err) {
    yield put({
      type: NotificationActions.NOTIFICATION.ERROR.SET_ERROR_RESPONSE,
      payload: err.response.data,
    });
  }
}

function* handleDeleteDirection(action) {
  try {
    const res = yield call(DirectionServices.delete, 'DELETE_DIRECTION', action.payload);
    const { data } = res;
    const { message } = data;
    yield put({
      type: DirectionActions.DELETE_DIRECTION.SUCCESS,
    });
    yield put({
      type: NotificationActions.NOTIFICATION.SUCCESS.SET_SUCCESS_RESPONSE,
      payload: message,
    });
    yield put({
      type: DirectionActions.GET_ALL_DIRECTIONS.REQUESTING,
    });
  } catch (err) {
    yield put({
      type: NotificationActions.NOTIFICATION.ERROR.SET_ERROR_RESPONSE,
      payload: err.response.data,
    });
  }
}

function* watchGetAllDirections() {
  yield takeEvery(DirectionActions.GET_ALL_DIRECTIONS.REQUESTING, handleGetAllDirections);
}
function* watchCreateDirections() {
  yield takeEvery(DirectionActions.CREATE_DIRECTION.REQUESTING, handleCreateDirections);
}
function* watchDeleteDirections() {
  yield takeEvery(DirectionActions.DELETE_DIRECTION.REQUESTING, handleDeleteDirection);
}
export default function* countrySaga() {
  yield all([fork(watchGetAllDirections), fork(watchCreateDirections), fork(watchDeleteDirections)]);
}
