import * as types from './constants';
import firebaseSvc from '../../FirebaseSvc';

const FIREBASE_REF_ROOMSD = firebaseSvc.database().ref('sdchats'); 

export function messagesLoadRequest() {
  return {
    type: types.ROOMSD_LOAD_REQUEST,
  };
}

export function messagesLoadRequestFail(error) {
  return {
    type: types.ROOMSD_LOAD_REQUEST_FAIL,
    error,
  };
}

export function messagesLoadRequestSuccess(messages) {
  return {
    type: types.ROOMSD_LOAD_REQUEST_SUCCESS,
    messages,
  };
}

export function getChatroomItems(data){
  return data ? Object.keys(data).map(key => data[key]) : [];
}

export function loadMessages() {
  console.log('들어옴?')
  return (dispatch) => {
    dispatch(messagesLoadRequest());
    return FIREBASE_REF_ROOMSD.on('value', (snapshot) => {
        const messages = getChatroomItems(snapshot.val());
        console.log(messages)
        dispatch(messagesLoadRequestSuccess(messages));
      }, (errorObject) => {
        dispatch(messagesLoadRequestFail(errorObject.message))
      });
  };
}