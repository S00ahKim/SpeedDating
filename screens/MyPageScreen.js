import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

class MyPageScreen extends React.Component {
  static navigationOptions = {
    title: '마이페이지',
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    MyPage: MyPageScreen,
    EditProfile: EditProfileScreen,
    SendSignal: SendSignalScreen,
    ChargeSnow: ChargeSnowScreen,
    Songyi: SongyiScreen,
    DeleteProfile: DeleteProfileScreen
  },
  {
    initialRouteName: "MyPage"
  }  
);

export default createAppContainer(AppNavigator);