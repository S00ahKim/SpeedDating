import * as types from './constants';
import firebaseSvc from '../../FirebaseSvc';

const FIREBASE_REF_SD = firebaseSvc.database().ref('sdchats');

export function messagesLoadRequest() {
  return {
    type: types.SD_LOAD_REQUEST,
  };
}

export function messagesLoadRequestFail(error) {
  return {
    type: types.SD_LOAD_REQUEST_FAIL,
    error,
  };
}

export function messagesLoadRequestSuccess(messages) {
  return {
    type: types.SD_LOAD_REQUEST_SUCCESS,
    messages,
  };
}

export function getChatItems(data){
  return data ? Object.keys(data).map(key => data[key]) : [];
}

export function loadMessages() {
  console.log('로딩 중');
  return (dispatch) => {
    dispatch(messagesLoadRequest());
    return FIREBASE_REF_SD.on('value', (snapshot) => {
        const messages = getChatItems(snapshot.val());
        dispatch(messagesLoadRequestSuccess(messages));
      }, (errorObject) => {
        dispatch(messagesLoadRequestFail(errorObject.message))
      });
  };
}

export function messagePutRequest() {
  return {
    type: types.SD_PUT_REQUEST,
  };
}

export function messagePutRequestFail(error) {
  return {
    type: types.SD_PUT_REQUEST_FAIL,
    error,
  };
}

export function messagePutRequestSuccess(text) {
  console.log('스피드데이팅 메시지 보내기 성공');
  return {
    type: types.SD_PUT_REQUEST_SUCCESS,
    text,
  };
}

export function putMessage(message, currentUser) {
  console.log(" SD 메시지 보내기");
  let chatMessage = {
    text: message,
    createdAt: new Date().getTime(),
    user: {
      id: currentUser.uid,
      name: currentUser.displayName,
      photo: currentUser.photoURL,
      email: currentUser.email,
    }
  }
  return (dispatch) => {
    dispatch(messagePutRequest());
    return FIREBASE_REF_SD.push().set(chatMessage, (error) => {
      if (error) {
        dispatch(messagePutRequestFail(error.message));
      } else {
        dispatch(messagePutRequestSuccess(chatMessage));
      }
    });
  };
}
