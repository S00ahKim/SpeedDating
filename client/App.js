import React from 'react';
import {  
  View, 
  StyleSheet } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import AppNavigator from './navigation/AppNavigator';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <AppNavigator />
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

export default createAppContainer(createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions:{
      header: null,
    }
  },
  CreateAccount: {
    screen: CreateAccount,
    navigationOptions:{
      header: null,
    }
  },
  App: {
    screen: HomeScreen,
    navigationOptions:{
      header: null,
    }
  },
}));