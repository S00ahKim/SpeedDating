import React from "react";
import { View, Text } from "react-native";
import DetailInfo from "../components/userinfo/detailInfo";

export default class SpecificProfileScreen extends React.Component {
    static navigationOptions = {
      title: '상세 프로필',
    };
    render() {
      return (
        <DetailInfo />
      );
    }
  }