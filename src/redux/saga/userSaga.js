import { call, put, all, takeLatest } from 'redux-saga/effects';
import { userServices } from '../../services/userServices';
import NotificationActions from '../actions/notificationActions';
import UserTypes from '../actions/userActions';

function* handleGetUsers() {
  try {
    const res = yield call(userServices.getUsers);
    const { data } = res;
    yield put({
      type: UserTypes.GET_USERS.SUCCESS,
      payload: data.data,
    });
  } catch (err) {
    yield put({
      type: NotificationActions.NOTIFICATION.ERROR.SET_ERROR_RESPONSE,
      payload: err.response.data,
    });
  }
}
function* handleChangeUserState(action) {
  try {
    yield call(userServices.changeUserState, action.payload);
    yield put({
      type: UserTypes.GET_USERS.REQUESTING,
    });
  } catch (err) {
    yield put({
      type: NotificationActions.NOTIFICATION.ERROR.SET_ERROR_RESPONSE,
      payload: err.response.data,
    });
  }
}
function* handleChangeRole(action) {
  try {
    yield call(userServices.changeRole, action.payload);
    yield put({
      type: UserTypes.GET_USERS.REQUESTING,
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
    takeLatest(UserTypes.GET_USERS.REQUESTING, handleGetUsers),
    takeLatest(UserTypes.CHANGE_USER_STATE.REQUESTING, handleChangeUserState),
    takeLatest(UserTypes.CHANGE_ROLE.REQUESTING, handleChangeRole),
  ]);
}
