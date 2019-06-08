import React from 'react';
import {  
  ActivityIndicator,
  AsyncStorage,
  Button,
  View, 
  Platform, 
  StyleSheet } from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import { AppLoading, Asset, Font, Icon } from 'expo';
import { Container, Header, Content, Form, Item, Input, Label, Text } from 'native-base';

import ApiKeys from './constants/ApiKeys';
import * as firebase from 'firebase';
import AppNavigator from './navigation/AppNavigator';

// 로그인하지 않았을 때 뜨는 화면
class SignInScreen extends React.Component {

  render() {
    return (
      <Container style={styles.container}>
        <Header />
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>전화번호</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>비밀번호</Label>
              <Input />
            </Item>
          </Form>
          <Button full light onPress={this._signInAsync}>
            <Text> 로그인 </Text>
          </Button>
          <Button full>
            <Text> 페이스북으로 로그인 </Text>
          </Button>
        </Content>
      </Container>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'dbwjxhzmsdPtl');
    this.props.navigation.navigate('App');
  };
}

// 로그인을 했을 때의 화면 (로그아웃은 만들지 않음. 앱을 삭제해야 함.)
class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
    }

    //파이어베이스 initialize
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FireaseConfig);
    }
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          <AppNavigator />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const AppStack = createStackNavigator({ Home: HomeScreen }, { headerMode: 'none' });
const AuthStack = createStackNavigator({ SignIn: SignInScreen }, { headerMode: 'none' });

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));