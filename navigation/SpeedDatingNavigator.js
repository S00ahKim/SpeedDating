import React from 'react';
import { createStackNavigator } from 'react-navigation';

import SpeedDatingScreen from '../screens/SpeedDatingScreen';
import DateScreen from '../screens/DateScreen';

export default MyPageNavigator = createStackNavigator(
    {
      Main: SpeedDatingScreen,
      Date: DateScreen,
    },
    {
      initialRouteName: "Main"
    }  
);
  