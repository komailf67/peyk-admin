import produce from 'immer';
import AuthActions from '../../actions/authActions';

export const initialState = {
  status: false,
};

/* eslint-disable default-case, no-param-reassign */
const fullnameModalStatus = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case AuthActions.CHANGE_FULLNAME_MODAL_STATUS:
        draft.status = action.payload;
        return draft;
      default:
        return draft;
    }
  });

export default fullnameModalStatus;
