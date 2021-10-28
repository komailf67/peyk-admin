import produce from 'immer';
import stateTypes from '../../actions/stateTypes';

export const initialState = {
  list: [],
  requesting: false,
  success: false,
  error: false,
};

const all = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case stateTypes.GET_ALL_STATES.REQUESTING:
        draft.requesting = true;
        draft.success = false;
        draft.error = false;
        return draft;
      case stateTypes.GET_ALL_STATES.SUCCESS:
        draft.list = action.payload;
        draft.requesting = false;
        draft.success = true;
        draft.error = false;
        return draft;
      case stateTypes.GET_ALL_STATES.ERROR:
        draft.requesting = false;
        draft.success = false;
        draft.error = true;
        return draft;
      default:
        return draft;
    }
  });

export default all;
