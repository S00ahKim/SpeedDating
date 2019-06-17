import React from "react";
import { View, Text } from "react-native";
import IdealType from '../components/userinfo/idealtype';

export default class IdealTypeScreen extends React.Component {
    static navigationOptions = {
      title: '내 이상형',
    };
    render() {
      return (
        <IdealType />
      );
    }
  }