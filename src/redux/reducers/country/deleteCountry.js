import produce from 'immer';
import CountryActions from '../../actions/countryActions';

export const initialState = {
  requesting: false,
  success: false,
  error: false,
};

const deleteCountry = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CountryActions.GET_ALL_COUNTRIES.REQUESTING:
        draft.requesting = true;
        draft.success = false;
        draft.error = false;
        return draft;
      case CountryActions.GET_ALL_COUNTRIES.SUCCESS:
        draft.requesting = false;
        draft.success = true;
        draft.error = false;
        return draft;
      case CountryActions.GET_ALL_COUNTRIES.ERROR:
        draft.requesting = false;
        draft.success = false;
        draft.error = true;
        return draft;
      default:
        return draft;
    }
  });

export default deleteCountry;
