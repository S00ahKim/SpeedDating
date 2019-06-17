import * as types from './constants';
import firebaseSvc from '../../FirebaseSvc';

const FIREBASE_REF_ROOM = firebaseSvc.database().ref('messages');

export function messagesLoadRequest() {
  return {
    type: types.ROOM_LOAD_REQUEST,
  };
}

export function messagesLoadRequestFail(error) {
  return {
    type: types.ROOM_LOAD_REQUEST_FAIL,
    error,
  };
}

export function messagesLoadRequestSuccess(messages) {
  return {
    type: types.ROOM_LOAD_REQUEST_SUCCESS,
    messages,
  };
}

export function getChatroomItems(data){
  return data ? Object.keys(data).map(key => data[key]) : [];
}

export function loadMessages() {
  return (dispatch) => {
    dispatch(messagesLoadRequest());
    return FIREBASE_REF_ROOM.on('value', (snapshot) => {
        const messages = getChatroomItems(snapshot.val());
        dispatch(messagesLoadRequestSuccess(messages));
      }, (errorObject) => {
        dispatch(messagesLoadRequestFail(errorObject.message))
      });
  };
}