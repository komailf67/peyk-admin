import produce from 'immer';
import AuthActions from '../../actions/authActions';

export const initialState = {
  requesting: false,
  success: false,
  error: false,
};

/* eslint-disable default-case, no-param-reassign */
const checkSmsCode = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case AuthActions.AUTH.CHECK_SMS_CODE.REQUESTING:
        draft.requesting = true;
        draft.success = false;
        draft.error = false;
        return draft;
      case AuthActions.AUTH.CHECK_SMS_CODE.SUCCESS:
        draft.requesting = false;
        draft.success = true;
        draft.error = false;
        return draft;
      case AuthActions.AUTH.CHECK_SMS_CODE.ERROR:
        draft.requesting = false;
        draft.success = false;
        draft.error = true;
        return draft;
      default:
        return draft;
    }
  });

export default checkSmsCode;
