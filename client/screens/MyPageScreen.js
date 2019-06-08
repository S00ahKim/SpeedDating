import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { ListItem, Icon } from 'react-native-elements';
import { createStackNavigator, createAppContainer } from "react-navigation";

import EditProfileScreen from './EditProfileScreen';
import SendSignalScreen from './SendSignalScreen';
import ChargeSnowScreen from './ChargeSnowScreen';
import SongyiScreen from './SongyiScreen';
import DeleteProfileScreen from './DeleteProfileScreen';

const avatar = require('../assets/images/default_profile.jpg');

class MyPageScreen extends React.Component {
  static navigationOptions = {
    title: '마이페이지',
  };

  render() {
    return (
      <View>
        <ListItem
          leftAvatar={{ rounded: true, source: avatar, showEditButton: true,}}
          title= { <Text> 닉네임 들어갈 곳 </Text>}
          onPress={() => this.props.navigation.navigate('EditProfile')}
          chevronColor="white"
          chevron
        />
        <ListItem
          title= {
            <Text> 시그널 보내기 </Text>
          }
          leftIcon = {
            <Icon name='radio'/>
          }
          onPress={() => this.props.navigation.navigate('SendSignal')}
          chevronColor="white"
          chevron
        />
        <ListItem
          title= {
            <Text> 눈송이 충전 </Text>
          }
          leftIcon = {
            <Icon name='ac-unit'/>
          }
          onPress={() => this.props.navigation.navigate('ChargeSnow')}
          chevronColor="white"
          chevron
        />
        <ListItem
          title= {
            <Text> 램프의 요정 송이 </Text>
          }
          leftIcon = {
            <Icon name='tag-faces'/>
          }
          onPress={() => this.props.navigation.navigate('Songyi')}
          chevronColor="white"
          chevron
        />
        <ListItem
          title= {
            <Text> 계정 삭제 </Text>
          }
          leftIcon = {
            <Icon name='delete-forever'/>
          }
          onPress={() => this.props.navigation.navigate('DeleteProfile')}
          chevronColor="white"
          chevron
        />      
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