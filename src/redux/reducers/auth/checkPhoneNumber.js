import produce from 'immer';
import AuthActions from '../../actions/authActions';

export const initialState = {
  requesting: false,
  success: false,
  error: false,
  phoneNumber: false,
};

/* eslint-disable default-case, no-param-reassign */
const checkPhoneNumber = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case AuthActions.CHECK_PHONE.REQUESTING:
        draft.requesting = true;
        draft.success = false;
        draft.error = false;
        return draft;
      case AuthActions.CHECK_PHONE.SUCCESS:
        draft.phoneNumber = action.payload;
        draft.requesting = false;
        draft.success = true;
        draft.error = false;
        return draft;
      case AuthActions.CHECK_PHONE.ERROR:
        draft.requesting = false;
        draft.success = false;
        draft.error = true;
        return draft;
      case AuthActions.CHECK_PHONE.EMPTY:
        draft.requesting = false;
        draft.success = false;
        draft.error = true;
        return draft;
      default:
        return draft;
    }
  });

export default checkPhoneNumber;
