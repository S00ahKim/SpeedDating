import React from "react";
import { View, Text } from "react-native";
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class EditProfileScreen extends React.Component {
    static navigationOptions = {
      title: '눈송이 충전',
    };
  
    render() {
      return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ListItem
            title= {
              <Icon name = 'thumb-up' size={20}> 
                <Text> 페이스북으로 공유 </Text>
              </Icon>
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
              <Icon name = 'question-answer' size={20}> 
                <Text> 카카오톡으로 공유 </Text>
              </Icon>
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
              <Icon name = 'theaters' size={20}> 
                <Text> 교육 이수 </Text>
              </Icon>
            }
            subtitle = {
              <Text> 15 눈송이 </Text>
            }
            onPress={() => this.props.navigation.navigate('SendSignal')}
            chevronColor="white"
            chevron
          />
        </View>
      );
    }
  }