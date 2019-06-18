import { combineReducers } from 'redux';
import chat from './chat/chatReducer';
import sdchat from './speedDating/sdReducer';
import chatroom from './chatroom/chatroomReducer';
import sdroom from './sdroom/sdroomReducer';
import session from './session/sessionReducer';

const rootReducer = combineReducers({ chat, sdchat , chatroom, sdroom, session });

export default rootReducer;