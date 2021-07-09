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

function* watchGetAllCargoes() {
  yield takeEvery(CargoActions.GET_ALL_CARGOES.REQUESTING, handleGetAllCargoes);
}

export default function* cargoSaga() {
  yield all([fork(watchGetAllCargoes)]);
}
