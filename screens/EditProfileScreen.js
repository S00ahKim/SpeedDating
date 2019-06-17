import React from "react";
import { View, Text } from "react-native";
import BasicInfoEdit from "../components/userinfo/basicinfoedit";

export default class EditProfileScreen extends React.Component {
    static navigationOptions = {
      title: '기본 정보 수정',
    };
    render() {
      return (
        <BasicInfoEdit />
      );
    }
  }