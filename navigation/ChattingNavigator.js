import React from 'react';
import { createStackNavigator } from 'react-navigation';

import ChattingScreen from '../screens/ChattingScreen';
import ChatScreen from '../screens/ChatScreen';

export default ChattingNavigator = createStackNavigator(
    {
      Main: ChattingScreen,
      Chat: ChatScreen,
    },
    {
      initialRouteName: "Main"
    }  
);
  