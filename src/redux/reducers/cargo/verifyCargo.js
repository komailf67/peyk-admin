import produce from 'immer';
import CargoActions from '../../actions/cargoActions';

export const initialState = {
  requesting: false,
  success: false,
  error: false,
};

const verifyCargo = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CargoActions.VERIFY_CARGO.REQUESTING:
        draft.requesting = true;
        draft.success = false;
        draft.error = false;
        return draft;
      case CargoActions.VERIFY_CARGO.SUCCESS:
        draft.requesting = false;
        draft.success = true;
        draft.error = false;
        return draft;
      case CargoActions.VERIFY_CARGO.ERROR:
        draft.requesting = false;
        draft.success = false;
        draft.error = true;
        return draft;
      default:
        return draft;
    }
  });

export default verifyCargo;
