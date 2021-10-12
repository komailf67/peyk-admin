import produce from 'immer';
import CargoActions from '../../actions/cargoActions';

export const initialState = {
  list: [],
  requesting: false,
  success: false,
  error: false,
};

const cargoesStates = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CargoActions.GET_ALL_CARGOES_STATES.REQUESTING:
        draft.requesting = true;
        draft.success = false;
        draft.error = false;
        return draft;
      case CargoActions.GET_ALL_CARGOES_STATES.SUCCESS:
        draft.list = action.payload;
        draft.requesting = false;
        draft.success = true;
        draft.error = false;
        return draft;
      case CargoActions.GET_ALL_CARGOES_STATES.ERROR:
        draft.requesting = false;
        draft.success = false;
        draft.error = true;
        return draft;
      default:
        return draft;
    }
  });

export default cargoesStates;
