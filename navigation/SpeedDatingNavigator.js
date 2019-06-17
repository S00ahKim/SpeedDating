import React from 'react';
import { createStackNavigator } from 'react-navigation';

import SpeedDatingList from "../components/sdroom";
import SpeedDating from "../components/speeddating";

export default SpeedDatingNavigator = createStackNavigator(
    {
      Main: SpeedDatingList,
      Date: SpeedDating,
    },
    {
      initialRouteName: "Main"
    }  
);
  