import produce from 'immer';
import BaseInfoActions from '../../actions/baseInfoActions';

export const initialState = {
  list: [],
  requesting: false,
  success: false,
  error: false,
};

/* eslint-disable default-case, no-param-reassign */
const directions = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case BaseInfoActions.BASE_INFO.DIRECTIONS.REQUESTING:
        draft.requesting = true;
        draft.success = false;
        draft.error = false;
        return draft;
      case BaseInfoActions.BASE_INFO.DIRECTIONS.SUCCESS:
        draft.list = action.payload;
        draft.requesting = false;
        draft.success = true;
        draft.error = false;
        return draft;
      case BaseInfoActions.BASE_INFO.DIRECTIONS.ERROR:
        draft.requesting = false;
        draft.success = false;
        draft.error = true;
        return draft;
      default:
        return draft;
    }
  });

export default directions;
