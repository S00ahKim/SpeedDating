import * as types from './constants';
import * as firebase from 'firebase';
import { AsyncStorage } from 'react-native';
import firebaseSvc from '../../FirebaseSvc';

const FIREBASE_AUTH =  firebase.auth();

export function sessionRestoring(){
  return {
    type: types.SESSION_RESTORING,
  };
};

export function signinRequest() {
  return {
    type: types.SIGNIN_REQUEST,
  };
}
  
export function signinRequestFail(error) {
  return {
    type: types.SIGNIN_REQUEST_FAIL,
    error,
  };
}
  
export function signinRequestSuccess(user) {
  return {
    type: types.SIGNIN_REQUEST_SUCCESS,
    user,
  };
}

export function signOutRequest(){
  return {
    type: types.SIGNOUT_REQUEST,
  };
};

export function signOutRequestFail(error) {
  return {
    type: types.SIGNOUT_REQUEST_FAIL,
    error,
  };
};

export function signOutRequestSuccess() {
  return {
    type: types.SIGNOUT_REQUEST_SUCCESS,
  };
};

export function restoreSession() {
  return (dispatch) => {
    dispatch(sessionRestoring());
        return FIREBASE_AUTH.onAuthStateChanged(user => {
          if(user) {
            dispatch(signinRequestSuccess(user))
          } 
        });
    };
}

export function signOut(){
  return (dispatch) => {
    dispatch(signOutRequest())
        FIREBASE_AUTH.signOut().then(() => {
          dispatch(signOutRequestSuccess())
        }).catch(error => {
          dispatch(signOutRequestFail(error.message))
        });
    };
}