import produce from 'immer';
import RedirectActions from '../../actions/redirectActions';

export const initialState = {
  destinationsUrl: false,
};

const redirect = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case RedirectActions.FILL:
        draft.destinationsUrl = action.payload;
        return draft;
      case RedirectActions.EMPTY:
        draft.destinationsUrl = false;
        return draft;
      default:
        return draft;
    }
  });

export default redirect;
