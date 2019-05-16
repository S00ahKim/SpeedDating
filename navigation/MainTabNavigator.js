import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

import SpeedDatingScreen from '../screens/SpeedDatingScreen';
import SignalScreen from '../screens/SignalScreen';
import ChattingScreen from '../screens/ChattingScreen';
import MyPageScreen from '../screens/MyPageScreen';

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

const SignalStack = createStackNavigator({
  Signal: SignalScreen,
});

SignalStack.navigationOptions = {
  tabBarLabel: 'Signal',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

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

export default createBottomTabNavigator({
  SpeedDatingScreen,
  SignalScreen,
  ChattingScreen,
  MyPageScreen,
});
