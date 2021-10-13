import produce from 'immer';
import UserTypes from '../../actions/userActions';

export const initialState = {
  list: [],
  requesting: false,
  success: false,
  error: false,
};

const users = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case UserTypes.GET_USERS.REQUESTING:
        draft.requesting = true;
        draft.success = false;
        draft.error = false;
        return draft;
      case UserTypes.GET_USERS.SUCCESS:
        draft.list = action.payload;
        draft.requesting = false;
        draft.success = true;
        draft.error = false;
        return draft;
      case UserTypes.GET_USERS.ERROR:
        draft.requesting = false;
        draft.success = false;
        draft.error = true;
        return draft;
      default:
        return draft;
    }
  });

export default users;
