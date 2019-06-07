import React from 'react';
import { ListItem } from 'react-native-elements';
import { View, Text, StyleSheet } from 'react-native';

const list = [
  {
    title: 'Appointments',
    icon: 'av-timer'
  },
  {
    title: 'Trips',
    icon: 'flight-takeoff'
  }
]

export default class NotificationScreen extends React.Component {
  static navigationOptions = {
    title: '알림',
  };

  render() {
    return (
      <View style={styles.container}>
        {
          list.map((item, i) => (
            <ListItem
              key={i}
              title={item.title}
              leftIcon={{ name: item.icon }}
            />
          ))
        }
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
