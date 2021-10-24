import produce from 'immer';
import CargoActions from '../../actions/cargoActions';

export const initialState = {
  list: [],
  requesting: false,
  success: false,
  error: false,
};

const userCargoes = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CargoActions.GET_USER_CARGOES.REQUESTING:
        draft.list = [];
        draft.requesting = true;
        draft.success = false;
        draft.error = false;
        return draft;
      case CargoActions.GET_USER_CARGOES.SUCCESS:
        draft.list = action.payload;
        draft.requesting = false;
        draft.success = true;
        draft.error = false;
        return draft;
      case CargoActions.GET_USER_CARGOES.ERROR:
        draft.requesting = false;
        draft.success = false;
        draft.error = true;
        return draft;
      default:
        return draft;
    }
  });

export default userCargoes;
