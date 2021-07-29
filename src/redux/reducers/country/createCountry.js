import produce from 'immer';
import CountryActions from '../../actions/countryActions';

export const initialState = {
  requesting: false,
  success: false,
  error: false,
};

const createCountry = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CountryActions.CREATE_COUNTRY.REQUESTING:
        draft.requesting = true;
        draft.success = false;
        draft.error = false;
        return draft;
      case CountryActions.CREATE_COUNTRY.SUCCESS:
        draft.requesting = false;
        draft.success = true;
        draft.error = false;
        return draft;
      case CountryActions.CREATE_COUNTRY.ERROR:
        draft.requesting = false;
        draft.success = false;
        draft.error = true;
        return draft;
      case CountryActions.CREATE_COUNTRY.FORM_SUBMIT_STATE:
        draft.success = action.payload;
        return draft;
      default:
        return draft;
    }
  });

export default createCountry;
