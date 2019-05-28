import React from "react";
import { View, Text } from "react-native";

export default class EditProfileScreen extends React.Component {
    static navigationOptions = {
      title: '내 정보 수정',
    };
  
    render() {
      return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text>Home Screen</Text>
        </View>
      );
    }
  }