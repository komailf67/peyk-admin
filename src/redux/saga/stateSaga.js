import { call, put, all, takeLatest } from 'redux-saga/effects';
import { stateServices } from '../../services/stateServices';
import NotificationActions from '../actions/notificationActions';
import stateTypes from '../actions/stateTypes';

function* handleGetStates() {
  try {
    const res = yield call(stateServices.getStates);
    const { data } = res;
    yield put({
      type: stateTypes.GET_ALL_STATES.SUCCESS,
      payload: data.data,
    });
  } catch (err) {
    yield put({
      type: NotificationActions.NOTIFICATION.ERROR.SET_ERROR_RESPONSE,
      payload: err.response.data,
    });
  }
}
function* handleCreateState(action) {
  try {
    yield call(stateServices.createState, action.payload.params);
    yield put({
      type: stateTypes.GET_ALL_STATES.REQUESTING,
    });
    action.payload.resetForm();
  } catch (err) {
    yield put({
      type: NotificationActions.NOTIFICATION.ERROR.SET_ERROR_RESPONSE,
      payload: err.response.data,
    });
  }
}
function* handleDeleteState(action) {
  try {
    yield call(stateServices.deleteState, action.payload);
    yield put({
      type: stateTypes.GET_ALL_STATES.REQUESTING,
    });
  } catch (err) {
    yield put({
      type: NotificationActions.NOTIFICATION.ERROR.SET_ERROR_RESPONSE,
      payload: err.response.data,
    });
  }
}

export default function* authSaga() {
  yield all([
    takeLatest(stateTypes.GET_ALL_STATES.REQUESTING, handleGetStates),
    takeLatest(stateTypes.CREATE_STATE.REQUESTING, handleCreateState),
    takeLatest(stateTypes.DELETE_STATE.REQUESTING, handleDeleteState),
  ]);
}
