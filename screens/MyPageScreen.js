import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import EditProfileScreen from './EditProfileScreen';
import SendSignalScreen from './SendSignalScreen';
import ChargeSnowScreen from './ChargeSnowScreen';
import SongyiScreen from './SongyiScreen';
import DeleteProfileScreen from './DeleteProfileScreen';

class MyPageScreen extends React.Component {
  static navigationOptions = {
    title: '마이페이지',
  };

  render() {
    return (
      <View style={styles.container}>
        <View style = {styles.img}>
          <Image
              style = {styles.imgd}
              source = {require('../assets/images/default_profile.jpg')}
            />
        </View>
        <View style={styles.listitem}>
          <Text style={styles.listitemtxt}> 닉네임 들어갈 곳 </Text>
        </View>
        <View style={styles.listitem}>
          <Text style={styles.listitemtxt} onPress={() => this.props.navigation.navigate('EditProfile')}> 프로필 수정 </Text>
        </View><View style={styles.listitem}>
          <Text style={styles.listitemtxt} onPress={() => this.props.navigation.navigate('SendSignal')}> 시그널 보내기 </Text>
        </View><View style={styles.listitem}>
          <Text style={styles.listitemtxt} onPress={() => this.props.navigation.navigate('ChargeSnow')}> 눈송이 충전 </Text>
        </View><View style={styles.listitem}>
          <Text style={styles.listitemtxt} onPress={() => this.props.navigation.navigate('Songyi')}> 램프의 요정 송이 </Text>
        </View><View style={styles.listitem}>
          <Text style={styles.listitemtxt} onPress={() => this.props.navigation.navigate('DeleteProfile')}> 계정 삭제 </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 15,
    margin: 15,
    backgroundColor: '#fff',
  },
  img:{
    flex: 3,
  },
  imgd:{
    alignSelf: 'center',
    height: 120,
    width: 120,
  },
  listitem: {
    flex:1,
  },
  listitemtxt:{
    fontSize: 25,
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