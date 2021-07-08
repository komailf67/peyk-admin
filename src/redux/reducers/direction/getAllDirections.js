import produce from 'immer';
import DirectionActions from '../../actions/directionActions';

export const initialState = {
  list: [],
  requesting: false,
  success: false,
  error: false,
};

const getAllDirections = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DirectionActions.GET_ALL_DIRECTIONS.REQUESTING:
        draft.requesting = true;
        draft.success = false;
        draft.error = false;
        return draft;
      case DirectionActions.GET_ALL_DIRECTIONS.SUCCESS:
        draft.list = action.payload;
        draft.requesting = false;
        draft.success = true;
        draft.error = false;
        return draft;
      case DirectionActions.GET_ALL_DIRECTIONS.ERROR:
        draft.requesting = false;
        draft.success = false;
        draft.error = true;
        return draft;
      default:
        return draft;
    }
  });

export default getAllDirections;
