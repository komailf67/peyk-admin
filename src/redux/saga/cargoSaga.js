import { call, put, fork, all, takeEvery, select } from 'redux-saga/effects';
import { cargoServices } from '../../services/cargoService';
import history from '../../utils/history';
import AuthActions from '../actions/authActions';
import BaseInfoActions from '../actions/baseInfoActions';
import CargoActions from '../actions/cargoActions';
import NotificationActions from '../actions/notificationActions';
import { ActionTypes } from '../types';

function* handleGetAllCargoes(action) {
  try {
    const res = yield call(cargoServices.index, 'GET_CARGOES');
    const { data } = res;
    const { message } = data;

    yield put({
      type: CargoActions.GET_ALL_CARGOES.SUCCESS,
      payload: data,
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
    // yield put({ type: ActionTypes.AUTH.CHECK_PHONE.ERROR });
  }
}
function* handleVerifyCargo(action) {
  try {
    const res = yield call(cargoServices.verify, 'VERIFY_CARGO', action.payload.body, action.payload.cargoId);
    const { data } = res;
    const { message } = data;

    yield put({
      type: CargoActions.VERIFY_CARGO.SUCCESS,
    });
    yield put({
      type: CargoActions.GET_ALL_CARGOES.REQUESTING,
    });
    yield put({
      type: CargoActions.VERIFY_MODAL_STATUS,
      payload: false,
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
    // yield put({ type: ActionTypes.AUTH.CHECK_PHONE.ERROR });
  }
}
function* handleRejectCargo(action) {
  try {
    const res = yield call(cargoServices.reject, 'REJECT_CARGO', action.payload.body, action.payload.cargoId);
    const { data } = res;
    const { message } = data;

    yield put({
      type: CargoActions.REJECT_CARGO.SUCCESS,
    });
    yield put({
      type: CargoActions.GET_ALL_CARGOES.REQUESTING,
    });
    yield put({
      type: CargoActions.REJECT_MODAL_STATUS,
      payload: false,
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
    // yield put({ type: ActionTypes.AUTH.CHECK_PHONE.ERROR });
  }
}

function* watchGetAllCargoes() {
  yield takeEvery(CargoActions.GET_ALL_CARGOES.REQUESTING, handleGetAllCargoes);
}
function* watchVerifyCargo() {
  yield takeEvery(CargoActions.VERIFY_CARGO.REQUESTING, handleVerifyCargo);
}
function* watchRejectCargo() {
  yield takeEvery(CargoActions.REJECT_CARGO.REQUESTING, handleRejectCargo);
}

export default function* cargoSaga() {
  yield all([fork(watchGetAllCargoes), fork(watchVerifyCargo), fork(watchRejectCargo)]);
}
