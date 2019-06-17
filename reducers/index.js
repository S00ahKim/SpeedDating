import { combineReducers } from 'redux';
import chat from './chat/chatReducer';
import sdchat from './speedDating/sdReducer';
import chatroom from './chatroom/chatroomReducer';
import session from './session/sessionReducer';

const rootReducer = combineReducers({ chat, sdchat , chatroom, session });

export default rootReducer;