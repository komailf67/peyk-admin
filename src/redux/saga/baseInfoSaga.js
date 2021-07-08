import { call, put, fork, all, takeEvery, select } from 'redux-saga/effects';
import { BaseInfoServices } from '../../services/baseInfoServices';
import history from '../../utils/history';
// import { AuthService } from '../../services/authService';
// import API from '../../utils/API';
import AuthActions from '../actions/authActions';
import BaseInfoActions from '../actions/baseInfoActions';
import { ActionTypes } from '../types';

function* handleGetDirections(action) {
  try {
    const res = yield call(BaseInfoServices.directions, 'BASE_INFO_DIRECTIONS');
    const { data } = res;

    yield put({
      type: BaseInfoActions.BASE_INFO.DIRECTIONS.SUCCESS,
      payload: data.data,
    });
  } catch (err) {
    // yield put({
    //   type: ActionTypes.NOTIFICATION.ERROR.SET_ERROR_RESPONSE,
    //   payload: err.response.data,
    // });
    // yield put({ type: ActionTypes.AUTH.CHECK_PHONE.ERROR });
  }
}

function* watchGetDirections() {
  yield takeEvery(BaseInfoActions.BASE_INFO.DIRECTIONS.REQUESTING, handleGetDirections);
}

export default function* baseInfoSaga() {
  yield all([fork(watchGetDirections)]);
}
