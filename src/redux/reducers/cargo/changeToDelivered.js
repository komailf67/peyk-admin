import produce from 'immer';
import CargoActions from '../../actions/cargoActions';

export const initialState = {
  requesting: false,
  success: false,
  error: false,
};

const changeToDelivered = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CargoActions.CHANGE_STATE_TO_DELIVERED.REQUESTING:
        draft.requesting = true;
        draft.success = false;
        draft.error = false;
        return draft;
      case CargoActions.CHANGE_STATE_TO_DELIVERED.SUCCESS:
        draft.requesting = false;
        draft.success = true;
        draft.error = false;
        return draft;
      case CargoActions.CHANGE_STATE_TO_DELIVERED.ERROR:
        draft.requesting = false;
        draft.success = false;
        draft.error = true;
        return draft;
      default:
        return draft;
    }
  });

export default changeToDelivered;
