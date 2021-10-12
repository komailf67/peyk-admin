import { call, put, fork, all, takeEvery, takeLatest } from 'redux-saga/effects';
import { cargoServices } from '../../services/cargoService';
import CargoActions from '../actions/cargoActions';
import NotificationActions from '../actions/notificationActions';

function* handleGetAllCargoes(action) {
  try {
    const res = yield call(cargoServices.index, 'GET_CARGOES', action.payload);
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
  }
}
function* handleGetAllCargoesStates() {
  try {
    const res = yield call(cargoServices.getCargoesStates, 'GET_CARGOES_STATES');
    const { data } = res;

    yield put({
      type: CargoActions.GET_ALL_CARGOES_STATES.SUCCESS,
      payload: data.data,
    });
  } catch (err) {
    yield put({
      type: NotificationActions.NOTIFICATION.ERROR.SET_ERROR_RESPONSE,
      payload: err.response.data,
    });
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
      payload: 'pending',
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
      payload: 'pending',
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
  }
}

function* ChangeToShippedCargo(action) {
  try {
    const res = yield call(cargoServices.shipped, 'CHANGE_TO_SHIPPED', action.payload);
    const { data } = res;
    const { message } = data;

    yield put({
      type: CargoActions.CHANGE_STATE_TO_SHIPPED.SUCCESS,
    });
    yield put({
      type: CargoActions.GET_ALL_CARGOES.REQUESTING,
      payload: 'paid',
    });
    yield put({
      type: NotificationActions.NOTIFICATION.SUCCESS.SET_SUCCESS_RESPONSE,
      payload: message,
    });
  } catch (err) {
    yield put({
      type: NotificationActions.NOTIFICATION.ERROR.SET_ERROR_RESPONSE,
      payload: err?.response?.data,
    });
  }
}
function* ChangeToDeliveredCargo(action) {
  try {
    const res = yield call(cargoServices.delivered, 'CHANGE_TO_DELIVERED', action.payload);
    const { data } = res;
    const { message } = data;

    yield put({
      type: CargoActions.CHANGE_STATE_TO_DELIVERED.SUCCESS,
    });
    yield put({
      type: CargoActions.GET_ALL_CARGOES.REQUESTING,
      payload: 'shipped',
    });
    yield put({
      type: NotificationActions.NOTIFICATION.SUCCESS.SET_SUCCESS_RESPONSE,
      payload: message,
    });
  } catch (err) {
    yield put({
      type: NotificationActions.NOTIFICATION.ERROR.SET_ERROR_RESPONSE,
      payload: err?.response?.data,
    });
  }
}
function* handleChangeCargoState(action) {
  try {
    const { body, cargoId, stateId, setOpen, stateEnum } = action.payload;
    const res = yield call(cargoServices.changeState, 'CHANGE_CARGO_STATE', body, cargoId, stateId);
    setOpen(false);
    yield put({
      type: CargoActions.GET_ALL_CARGOES.REQUESTING,
      payload: stateEnum,
    });
    const { message } = res.data;
    yield put({
      type: NotificationActions.NOTIFICATION.SUCCESS.SET_SUCCESS_RESPONSE,
      payload: message,
    });
  } catch (err) {
    yield put({
      type: NotificationActions.NOTIFICATION.ERROR.SET_ERROR_RESPONSE,
      payload: err?.response?.data,
    });
  }
}

function* watchGetAllCargoes() {
  yield takeEvery(CargoActions.GET_ALL_CARGOES.REQUESTING, handleGetAllCargoes);
}
function* watchGetAllCargoesStates() {
  yield takeLatest(CargoActions.GET_ALL_CARGOES_STATES.REQUESTING, handleGetAllCargoesStates);
}
function* watchVerifyCargo() {
  yield takeEvery(CargoActions.VERIFY_CARGO.REQUESTING, handleVerifyCargo);
}
function* watchChangeCargoState() {
  yield takeEvery(CargoActions.CHANGE_CARGO_STATE.REQUESTING, handleChangeCargoState);
}
function* watchRejectCargo() {
  yield takeEvery(CargoActions.REJECT_CARGO.REQUESTING, handleRejectCargo);
}
function* watchChangeToShippedCargo() {
  yield takeEvery(CargoActions.CHANGE_STATE_TO_SHIPPED.REQUESTING, ChangeToShippedCargo);
}
function* watchChangeToDeliveredCargo() {
  yield takeEvery(CargoActions.CHANGE_STATE_TO_DELIVERED.REQUESTING, ChangeToDeliveredCargo);
}

export default function* cargoSaga() {
  yield all([
    fork(watchGetAllCargoes),
    fork(watchVerifyCargo),
    fork(watchChangeCargoState),
    fork(watchRejectCargo),
    fork(watchChangeToShippedCargo),
    fork(watchChangeToDeliveredCargo),
    fork(watchChangeCargoState),
    fork(watchGetAllCargoesStates),
  ]);
}
