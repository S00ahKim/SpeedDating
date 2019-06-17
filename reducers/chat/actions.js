import * as types from './constants';
import firebaseSvc from '../../FirebaseSvc';

export function messagesLoadRequest() {
  return {
    type: types.MESSAGES_LOAD_REQUEST,
  };
}

export function messagesLoadRequestFail(error) {
  return {
    type: types.MESSAGES_LOAD_REQUEST_FAIL,
    error,
  };
}

export function messagesLoadRequestSuccess(messages) {
  return {
    type: types.MESSAGES_LOAD_REQUEST_SUCCESS,
    messages,
  };
}

export function getChatItems(data){
  return data ? Object.keys(data).map(key => data[key]) : [];
}

export function loadMessages(address) {
  console.log('로딩중.........')
  console.log('로딩중인 챗룸정보   ', address)
  return (dispatch) => {
    dispatch(messagesLoadRequest());
    return firebaseSvc.database().ref('messages/'+ address).on('value', (snapshot) => {
        console.log('점검')
        const messages = getChatItems(snapshot.val().messages);
        dispatch(messagesLoadRequestSuccess(messages));
      }, (errorObject) => {
        dispatch(messagesLoadRequestFail(errorObject.message))
      });
  };
}

export function messagePutRequest() {
  return {
    type: types.MESSAGE_PUT_REQUEST,
  };
}

export function messagePutRequestFail(error) {
  return {
    type: types.MESSAGE_PUT_REQUEST_FAIL,
    error,
  };
}

export function messagePutRequestSuccess(text) {
  return {
    type: types.MESSAGE_PUT_REQUEST_SUCCESS,
    text,
  };
}

export function putMessage(message, currentUser, address) {
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
    console.log('여기')
    firebaseSvc.database().ref('messages/'+ address+'/messages').push().set(chatMessage, (error) => {
        if (error) {
          console.log('에러')
          dispatch(messagePutRequestFail(error.message));
        } else {
          console.log('잘감')
          dispatch(messagePutRequestSuccess(chatMessage));
        }
    })
  };
}
