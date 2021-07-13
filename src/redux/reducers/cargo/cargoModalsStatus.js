import produce from 'immer';
import CargoActions from '../../actions/cargoActions';

export const initialState = {
  verifyCargoStatus: false,
  rejectCargoStatus: false,
};

const cargoModalsStatus = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CargoActions.VERIFY_MODAL_STATUS:
        draft.verifyCargoStatus = action.payload;
        return draft;
      case CargoActions.REJECT_MODAL_STATUS:
        draft.rejectCargoStatus = action.payload;
        return draft;
      default:
        return draft;
    }
  });

export default cargoModalsStatus;
