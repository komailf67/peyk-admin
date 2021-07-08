import produce from 'immer';
import DirectionActions from '../../actions/directionActions';

export const initialState = {
  requesting: false,
  success: false,
  error: false,
};

const createDirection = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DirectionActions.CREATE_DIRECTION.REQUESTING:
        draft.requesting = true;
        draft.success = false;
        draft.error = false;
        return draft;
      case DirectionActions.CREATE_DIRECTION.SUCCESS:
        draft.requesting = false;
        draft.success = true;
        draft.error = false;
        return draft;
      case DirectionActions.CREATE_DIRECTION.ERROR:
        draft.requesting = false;
        draft.success = false;
        draft.error = true;
        return draft;
      default:
        return draft;
    }
  });

export default createDirection;
