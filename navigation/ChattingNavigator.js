import React from 'react';
import { createStackNavigator } from 'react-navigation';

import Chatroom from "../components/chatroom";
import Chat from "../components/chat";

export default ChattingNavigator = createStackNavigator(
    {
      Main: Chatroom,
      Chat: Chat,
    },
    {
      initialRouteName: "Main"
    }  
);
  