import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
      <View style={styles.container}>
        <ListItem
          leftAvatar={{ rounded: true, source: avatar }}
          title= { <Text> 닉네임 들어갈 곳 </Text>}
          onPress={() => this.props.navigation.navigate('EditProfile')}
          chevronColor="white"
          chevron
        />
        <ListItem
          title= {
            <Icon name = 'radio' size={20}> 
              <Text> 시그널 보내기 </Text>
            </Icon>
          }
          onPress={() => this.props.navigation.navigate('SendSignal')}
          chevronColor="white"
          chevron
        />
        <ListItem
          title= {
            <Icon name='ac-unit' size={20}>
              <Text> 눈송이 충전 </Text>
            </Icon>
          }
          onPress={() => this.props.navigation.navigate('ChargeSnow')}
          chevronColor="white"
          chevron
        />
        <ListItem
          title= {
            <Icon name='tag-faces' size={20}>
              <Text> 램프의 요정 송이 </Text>
            </Icon>
          }
          onPress={() => this.props.navigation.navigate('Songyi')}
          chevronColor="white"
          chevron
        />
        <ListItem
          title= {
            <Icon name='delete-forever' size={20}>
              <Text> 계정 삭제 </Text>
            </Icon>
          }
          onPress={() => this.props.navigation.navigate('DeleteProfile')}
          chevronColor="white"
          chevron
        />      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  }
});

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