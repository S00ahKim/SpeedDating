import React from 'react';
import { createStackNavigator } from 'react-navigation';

import MyPageScreen from '../screens/MyPageScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import SendSignalScreen from '../screens/SendSignalScreen';
import ChargeSnowScreen from '../screens/ChargeSnowScreen';
import SongyiScreen from '../screens/SongyiScreen';
import SpecificProfileScreen from '../screens/SpecificProfileScreen';
import IdealTypeScreen from '../screens/IdealTypeScreen';
import DeleteProfileScreen from '../screens/DeleteProfileScreen';

export default MyPageNavigator = createStackNavigator(
    {
      MyPage: MyPageScreen,
      EditProfile: EditProfileScreen,
      SendSignal: SendSignalScreen,
      ChargeSnow: ChargeSnowScreen,
      Songyi: SongyiScreen,
      SpecificProfile: SpecificProfileScreen,
      IdealType: IdealTypeScreen,
      DeleteProfile: DeleteProfileScreen
    },
    {
      initialRouteName: "MyPage"
    }  
);
  