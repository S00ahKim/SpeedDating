import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Login from '../components/login'
import MainTabNavigator from '../navigation/MainTabNavigator';
import BasicInfo from '../components/userinfo/basicInfo';

export default createAppContainer(createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions:{
      header: null,
    }
  },
  CreateAccount: {
    screen: BasicInfo,
    navigationOptions:{
      header: null,
    }
  },
  App: {
    screen: MainTabNavigator,
    navigationOptions:{
      header: null,
    }
  },
}));