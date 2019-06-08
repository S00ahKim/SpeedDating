import React from "react";
import { View, Text } from "react-native";
import { ListItem, Icon } from 'react-native-elements';

export default class EditProfileScreen extends React.Component {
    static navigationOptions = {
      title: '눈송이 충전',
    };
  
    render() {
      return (
        <View>
          <ListItem
            title= {
              <Text> 페이스북으로 공유하기 </Text>
            }
            leftIcon = {
              <Icon name='thumb-up'/>
            }
            subtitle = {
              <Text> 10 눈송이 </Text>
            }
            onPress={() => this.props.navigation.navigate('SendSignal')}
            chevronColor="white"
            chevron
          />
          <ListItem
            title= {
              <Text> 카카오톡으로 공유하기 </Text>
            }
            leftIcon = {
              <Icon name='forum'/>
            }
            subtitle = {
              <Text> 10 눈송이 </Text>
            }
            onPress={() => this.props.navigation.navigate('SendSignal')}
            chevronColor="white"
            chevron
          />
          <ListItem
            title= {
              <Text> 데이트 폭력 교육 이수 </Text>
            }
            leftIcon = {
              <Icon name='theaters'/>
            }
            subtitle = {
              <Text> 10 눈송이 </Text>
            }
            onPress={() => this.props.navigation.navigate('SendSignal')}
            chevronColor="white"
            chevron
          />
        </View>
      );
    }
  }