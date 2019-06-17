import { combineReducers } from 'redux';
import chat from './chat/chatReducer';
import sdchat from './speedDating/sdReducer';
import session from './session/sessionReducer';

const rootReducer = combineReducers({ chat, sdchat , session });

export default rootReducer;