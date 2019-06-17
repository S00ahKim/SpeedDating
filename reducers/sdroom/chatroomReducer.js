import * as types from './constants';

const initialState = {
  loading: false,
  apiError: '',
  message: '',
  messages: {},
  successloadMessages: false,
};

const sdroom = (state = initialState, action) => {
  switch (action.type) {
    case types.ROOM_LOAD_REQUEST:
    case types.ROOM_LOAD_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        apiError: action.error,
        messages: {},
        successloadMessages: false,
      };
    case types.ROOM_LOAD_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        apiError: '',
        messages: action.messages,
        successloadMessages: true,
      };
    default:
      return state;
  }
};

export default sdroom;