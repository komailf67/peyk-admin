const stateTypes = {
  GET_ALL_STATES: {
    REQUESTING: 'GET_ALL_STATES_REQUESTING',
    SUCCESS: 'GET_ALL_STATES_SUCCESS',
    ERROR: 'GET_ALL_STATES_ERROR',
  },
  CREATE_STATE: {
    REQUESTING: 'CREATE_STATE_REQUESTING',
    SUCCESS: 'CREATE_STATE_SUCCESS',
    ERROR: 'CREATE_STATE_ERROR',
  },
  DELETE_STATE: {
    REQUESTING: 'DELETE_STATE_REQUESTING',
    SUCCESS: 'DELETE_STATE_SUCCESS',
    ERROR: 'DELETE_STATE_ERROR',
  },
  UPDATE_STATE: {
    REQUESTING: 'UPDATE_STATE_REQUESTING',
    SUCCESS: 'UPDATE_STATE_SUCCESS',
    ERROR: 'UPDATE_STATE_ERROR',
  },
};

export default stateTypes;
