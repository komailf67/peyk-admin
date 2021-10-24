import produce from 'immer';
import CargoActions from '../../actions/cargoActions';

export const initialState = {
  userCargoesModalStatus: false,
  showCargoModalStatus: false,
};

/* eslint-disable default-case, no-param-reassign */
const cargoModals = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CargoActions.USER_CARGOES_MODAL_STATE:
        draft.userCargoesModalStatus = action.payload;
        return draft;
      case CargoActions.SHOW_CARGO_MODAL_STATE:
        draft.showCargoModalStatus = action.payload;
        return draft;
      default:
        return draft;
    }
  });

export default cargoModals;
