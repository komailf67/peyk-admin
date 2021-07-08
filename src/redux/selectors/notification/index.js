import { createSelector } from 'reselect';

const successResponse = (state) => state.notification.successResponse;
export const successResponseSelector = createSelector(successResponse, (notif) => {
  if (notif) {
    return notif;
  }
  return {};
});

const errorResponse = (state) => state.notification.errorResponse;
export const errorResponseSelector = createSelector(errorResponse, (notif) => {
  const errors = [];
  if (notif && notif.error !== undefined && Object.keys(notif.error.data).length) {
    Object.keys(notif.error.data).map((notifKey) => {
      notif.error.data[notifKey].map((err) => {
        errors.push(err);
      });
    });
    return errors;
  } else if (notif && notif.message !== undefined && notif.message.length) {
    errors.push(notif.message);
    return errors;
  }
  return [];
});
