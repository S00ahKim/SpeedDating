import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

import MyPageScreen from '../screens/MyPageScreen';
import SpeedDatingScreen from '../screens/SpeedDatingScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ChattingScreen from '../screens/ChattingScreen';

//마이페이지
const MyPageStack = createStackNavigator({
  MyPage: MyPageScreen,
});

MyPageStack.navigationOptions = {
  tabBarLabel: 'MyPage',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

//스피드데이팅
const SpeedDatingStack = createStackNavigator({
  SpeedDating: SpeedDatingScreen,
});

SpeedDatingStack.navigationOptions = {
  tabBarLabel: 'SpeedDating',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

//알림
const NotificationStack = createStackNavigator({
  Notification: NotificationScreen,
});

NotificationStack.navigationOptions = {
  tabBarLabel: 'Notification',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

//개인채팅
const ChattingStack = createStackNavigator({
  Chatting: ChattingScreen,
});

ChattingStack.navigationOptions = {
  tabBarLabel: 'Chatting',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  MyPageScreen,
  SpeedDatingScreen,
  NotificationScreen,
  ChattingScreen,
});
