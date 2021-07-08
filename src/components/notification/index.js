import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { SnackbarProvider, useSnackbar } from 'notistack';
import NotificationActions from '../../redux/actions/notificationActions';
import { createStructuredSelector } from 'reselect';
import { errorResponseSelector, successResponseSelector } from '../../redux/selectors/notification';

const Notification = ({ errorResponse, successResponse, emptySuccessResponse, emptyErrorResponse }) => {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (successResponse?.length) {
      enqueueSnackbar(successResponse, {
        variant: 'success',
        autoHideDuration: 3000,
      });
      emptySuccessResponse();
    }
  }, [successResponse]);

  useEffect(() => {
    if (errorResponse && errorResponse.length) {
      errorResponse.map((error) => {
        enqueueSnackbar(error, {
          variant: 'error',
          autoHideDuration: 3000,
        });
      });
      emptyErrorResponse();
    }
  }, [errorResponse]);

  return null;
  // enqueueSnackbar('This is a success message!', { variant });
};

/* eslint-disable */
const IntegrationNotistack = ({ errorResponse, successResponse, emptySuccessResponse, emptyErrorResponse }) => {
  return (
    <SnackbarProvider
      className="Plz-notic"
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      maxSnack={3}
    >
      <Notification errorResponse={errorResponse} successResponse={successResponse} emptySuccessResponse={emptySuccessResponse} emptyErrorResponse={emptyErrorResponse} />
    </SnackbarProvider>
  );
};

const mapState = createStructuredSelector({
  successResponse: successResponseSelector,
  errorResponse: errorResponseSelector,
});

const mapDispatch = (dispatch) => ({
  emptySuccessResponse() {
    dispatch({
      type: NotificationActions.NOTIFICATION.SUCCESS.EMPTY_SUCCESS_RESPONSE,
    });
  },
  emptyErrorResponse() {
    dispatch({
      type: NotificationActions.NOTIFICATION.ERROR.EMPTY_ERROR_RESPONSE,
    });
  },
});

export default connect(mapState, mapDispatch)(IntegrationNotistack);
