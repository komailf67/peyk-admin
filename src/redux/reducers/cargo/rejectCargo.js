import produce from 'immer';
import CargoActions from '../../actions/cargoActions';

export const initialState = {
  requesting: false,
  success: false,
  error: false,
};

const rejectCargo = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CargoActions.REJECT_CARGO.REQUESTING:
        draft.requesting = true;
        draft.success = false;
        draft.error = false;
        return draft;
      case CargoActions.REJECT_CARGO.SUCCESS:
        draft.requesting = false;
        draft.success = true;
        draft.error = false;
        return draft;
      case CargoActions.REJECT_CARGO.ERROR:
        draft.requesting = false;
        draft.success = false;
        draft.error = true;
        return draft;
      default:
        return draft;
    }
  });

export default rejectCargo;
