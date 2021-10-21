import { call, put, fork, all, takeLatest, takeEvery, select } from 'redux-saga/effects';
import { AuthService } from '../../services/authService';
import history from '../../utils/history';
import AuthActions from '../actions/authActions';
import NotificationActions from '../actions/notificationActions';
import RedirectActions from '../actions/redirectActions';

function* handleCheckPhone(action) {
  try {
    const res = yield call(AuthService.checkPhone, 'checkPhone', action.payload);
    const { data } = res;
    const { message } = data;
    yield put({
      type: AuthActions.CHECK_PHONE.SUCCESS,
      // payload: data.data.phone,
      payload: data?.data?.phone,
    });
    yield put({
      type: NotificationActions.NOTIFICATION.SUCCESS.SET_SUCCESS_RESPONSE,
      payload: message,
    });
    yield put({
      type: RedirectActions.FILL,
      payload: '/auth/login',
    });
    // yield call(forwardTo, '/auth/login');

    // history.push('/auth/login');
  } catch (err) {
    yield put({
      type: NotificationActions.NOTIFICATION.ERROR.SET_ERROR_RESPONSE,
      payload: err.response.data,
    });
  }
}

function* handleCheckSms(action) {
  try {
    const res = yield call(AuthService.login, 'login', action.payload);
    const { data } = res;
    const { message } = data;
    /**
     * userinfo set in redux in utils/api file
     * because after login, when the next api called, localStorage.getItem('access_token) returns null
     */
    if (data?.data?.is_admin === false) {
      yield put({
        type: NotificationActions.NOTIFICATION.ERROR.SET_ERROR_RESPONSE,
        payload: {
          message: 'شما نمیتوانید به بخش ادمین دسترسی داشته باشید',
        },
      });
    } else {
      if (data.data?.name === null) {
        yield put({ type: AuthActions.CHANGE_FULLNAME_MODAL_STATUS, payload: true });
      } else {
        yield put({
          type: NotificationActions.NOTIFICATION.SUCCESS.SET_SUCCESS_RESPONSE,
          payload: message,
        });
        yield put({
          type: RedirectActions.FILL,
          payload: '/cargoes',
        });
      }
    }
  } catch (err) {
    yield put({
      type: NotificationActions.NOTIFICATION.ERROR.SET_ERROR_RESPONSE,
      payload: err.response.data,
    });
  }
}
function* handleUpdateFullName(action) {
  try {
    const res = yield call(AuthService.update, action.payload);
    const { data } = res;
    const { message } = data;
    /**
     * userinfo set in redux in utils/api file
     * because after login, when the next api called, localStorage.getItem('access_token) returns null
     */
    yield put({ type: AuthActions.CHANGE_FULLNAME_MODAL_STATUS, payload: false });
    yield put({
      type: NotificationActions.NOTIFICATION.SUCCESS.SET_SUCCESS_RESPONSE,
      payload: message,
    });
    yield put({
      type: RedirectActions.FILL,
      payload: '/cargoes',
    });
  } catch (err) {
    yield put({
      type: NotificationActions.NOTIFICATION.ERROR.SET_ERROR_RESPONSE,
      payload: err.response.data,
    });
  }
}

function* watchCheckPhone() {
  yield takeEvery(AuthActions.CHECK_PHONE.REQUESTING, handleCheckPhone);
}

function* watchCheckSmsCode() {
  yield takeEvery(AuthActions.CHECK_SMS_CODE.REQUESTING, handleCheckSms);
}
function* watchUpdateProfile() {
  yield takeEvery(AuthActions.UPDATE_PROFILE.REQUESTING, handleUpdateFullName);
}

export default function* authSaga() {
  yield all([fork(watchCheckPhone), fork(watchCheckSmsCode), fork(watchUpdateProfile)]);
}
