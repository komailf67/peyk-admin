import { call, put, fork, all, takeEvery, select } from 'redux-saga/effects';
import { cargoServices } from '../../services/cargoService';
import history from '../../utils/history';
import AuthActions from '../actions/authActions';
import BaseInfoActions from '../actions/baseInfoActions';
import CargoActions from '../actions/cargoActions';
import NotificationActions from '../actions/notificationActions';
import { ActionTypes } from '../types';

function* handleCreateCargo(action) {
  try {
    const res = yield call(cargoServices.create, 'CREATE_CARGO', action.payload);
    const { data } = res;
    const { message } = data;

    yield put({
      type: CargoActions.CARGO.CREATE.SUCCESS,
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

function* watchCreateCargo() {
  yield takeEvery(CargoActions.CARGO.CREATE.REQUESTING, handleCreateCargo);
}

export default function* cargoSaga() {
  yield all([fork(watchCreateCargo)]);
}
