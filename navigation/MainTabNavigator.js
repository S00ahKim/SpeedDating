import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialIcons';

import MyPageScreen from '../screens/MyPageScreen';
import SpeedDatingScreen from '../screens/SpeedDatingScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ChattingScreen from '../screens/ChattingScreen';

//마이페이지
const MyPageStack = createStackNavigator({
  MyPage: MyPageScreen,
});

//스피드데이팅
const SpeedDatingStack = createStackNavigator({
  SpeedDating: SpeedDatingScreen,
});


//알림
const NotificationStack = createStackNavigator({
  Notification: NotificationScreen,
});


//개인채팅
const ChattingStack = createStackNavigator({
  Chatting: ChattingScreen,
});


export default createBottomTabNavigator({
  개인: {
    screen: MyPageScreen,
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
      showLabel: false, // hide labels
      activeTintColor: '#F8F8F8', // active icon color
      inactiveTintColor: '#586589',  // inactive icon color
        style: {
            backgroundColor: '#171F33' // TabBar background
        }      
      }
  },

  만남: {
    screen: SpeedDatingScreen,
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

  알림: {
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
