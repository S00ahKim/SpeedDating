import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialIcons';

import MypageNavigator from './MyPageNavigator';
import SpeedDatingNavigator from './SpeedDatingNavigator';
import NotificationScreen from '../screens/NotificationScreen';
import ChattingScreen from '../screens/ChattingScreen';


export default createBottomTabNavigator({
  개인: {
    screen: MypageNavigator,
    navigationOptions: () => ({
      tabBarIcon: ({tintColor}) => (
        <Icon
            name="person"
            color={tintColor}
            size={24}
        />
      )
    }),
    tabBarOptions: {
      showLabel: true, // hide labels
      activeTintColor: '#5C7CB5', // active icon color
      inactiveTintColor: '#586589',  // inactive icon color
        style: {
            backgroundColor: '#171F33' // TabBar background
        }      
      }
  },

  만남: {
    screen: SpeedDatingNavigator,
    navigationOptions: () => ({
      tabBarIcon: ({tintColor}) => (
        <Icon
            name="local-cafe"
            color={tintColor}
            size={24}
        />
      )
    })
  },

  시그널: {
    screen: NotificationScreen,
    navigationOptions: () => ({
      tabBarIcon: ({tintColor}) => (
        <Icon
            name="notifications"
            color={tintColor}
            size={24}
        />
      )
    })
  },

  대화: {
    screen: ChattingScreen,
    navigationOptions: () => ({
      tabBarIcon: ({tintColor}) => (
        <Icon
            name="chat-bubble"
            color={tintColor}
            size={24}
        />
      )
    })
  }
});
