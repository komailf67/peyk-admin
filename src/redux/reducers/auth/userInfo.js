import produce from 'immer';
import AuthActions from '../../actions/authActions';

export const initialState = {
  list: [],
};

const userInfo = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case AuthActions.AUTH.USER_INFO.FILL:
        draft.list = action.payload;
        return draft;
      default:
        return draft;
    }
  });

export default userInfo;
