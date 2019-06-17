import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  ImageBackground,
} from 'react-native';
import { ListItem } from 'react-native-elements'
import { NavigationActions } from 'react-navigation';
import styles from './style';
import firebase from '../../FirebaseSvc';
import firebaseSvc from '../../FirebaseSvc';

const background = require('../../assets/images/background.png');

class SDroom extends Component {

  
  static navigationOptions = {
    header: null,
  };

  messages = [];
  color;

  currentUser = firebase.auth().currentUser;

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      user: this.currentUser
    };
  }

  componentWillMount() {
    const { loadMessages } = this.props;
    loadMessages();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.successSignin) {
      this.setState({ user : nextProps.user}); 
    }
    if (nextProps.successloadMessages) {
      this.messages = nextProps.messages;
    }
  }

  moveToChat(chatroom){
    return (
      console.log(chatroom)
    )
  }

  render() {
    return (
        <View style={styles.container}>
          <View>
            <ImageBackground source={background} style={styles.header}  resizeMode="stretch">
              <Text style={styles.textTitle}>목록</Text>
            </ImageBackground>   
          </View>  
            <ScrollView 
              style={styles.fullScreen} ref={ref => this.scrollView = ref} 
              onContentSizeChange={(contentWidth, contentHeight)=>{        
                this.scrollView.scrollToEnd({animated: true})}}>
                  {this
                    .messages
                    .map((message, index) => {
                      var userID = firebaseSvc.auth().currentUser.uid;
                        if (this.message.boy == userID || this.message.girl == userID) {
                          return (
                            <ListItem
                              key = {index}
                              title= {
                                <Text> {message.boyname} ♡ {message.girlname} </Text>
                              }
                              onPress={() => {this.moveToChat.bind(this,message)} }
                              chevronColor="white"
                              chevron
                            />
                          );
                        }else{
                          return (
                            <View style={styles.econtainer}>
                              <View style = {styles.msg}>
                                <Icon name = 'volume-off' size={80} color='#fff'/>
                                <Text style={styles.txt} > 잠시만 </Text>
                                <Text style={styles.txt} > 기다려 </Text>
                                <Text style={styles.txt} > 주세요 </Text>
                              </View>
                            </View>
                          )
                        }
                    })}
            </ScrollView>
        </View>
    );
  }
}


export default SDroom;