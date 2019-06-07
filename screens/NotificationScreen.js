import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class NotificationScreen extends React.Component {
  static navigationOptions = {
    title: '알림',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text> 알림이 들어올 곳 </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
