import produce from 'immer';
import NotificationActions from '../../actions/notificationActions';

export const initialState = {
  successResponse: [],
  errorResponse: [],
};

/* eslint-disable default-case, no-param-reassign */
const notification = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case NotificationActions.NOTIFICATION.SUCCESS.SET_SUCCESS_RESPONSE:
        draft.successResponse = action.payload;
        return draft;
      case NotificationActions.NOTIFICATION.SUCCESS.EMPTY_SUCCESS_RESPONSE:
        draft.successResponse = [];
        return draft;
      case NotificationActions.NOTIFICATION.ERROR.SET_ERROR_RESPONSE:
        draft.errorResponse = action.payload;
        return draft;
      case NotificationActions.NOTIFICATION.ERROR.EMPTY_ERROR_RESPONSE:
        draft.errorResponse = [];
        return draft;
      default:
        return draft;
    }
  });

export default notification;
