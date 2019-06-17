import * as types from './constants';

const initialState = {
  loading: false,
  apiError: '',
  message: '',
  messages: {},
  successloadMessages: false,
  successPutMessage: false,
};

const sdchat = (state = initialState, action) => {
  switch (action.type) {
    case types.SD_LOAD_REQUEST:
    case types.SD_PUT_REQUEST:
      return {
        ...state,
        loading: true,
        apiError: '',
      };
    case types.SD_LOAD_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        apiError: action.error,
        messages: {},
        successloadMessages: false,
      };
    case types.SD_LOAD_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        apiError: '',
        messages: action.messages,
        successloadMessages: true,
      };
    case types.SD_PUT_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        apiError: action.error,
        message: '',
        successPutMessage: false,
      };
    case types.SD_PUT_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        apiError: '',
        message: action.message,
        successPutMessage: true,
      };
    default:
      return state;
  }
};

export default sdchat;