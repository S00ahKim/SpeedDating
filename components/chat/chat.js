import React, { PropTypes, Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  ImageBackground,
  KeyboardAvoidingView,
  AsyncStorage,
  Platform,
} from 'react-native';
import { Icon } from 'react-native-elements'
import { NavigationActions } from 'react-navigation';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from './style';
import moment from 'moment';
import firebase from '../../FirebaseSvc';

const background = require('../../assets/images/background.png');
const logo = require('../../assets/images/icon.png');

class Chat extends Component {

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
    if (nextProps.successPutMessage) {
      this.setState({ message : ''});
    }
  }

  onPutMessage(){
    const { putMessage } = this.props;
    putMessage(this.state.message, this.state.user);
  }

  onSignOut(){
    const { signOut } = this.props;
    signOut();
  }

  getTime(time) {
    return moment(time).fromNow(true);
  }

  render() {
    return (
        <View style={styles.container}>
          <View>
            <ImageBackground source={background} style={styles.header}  resizeMode="stretch">
              <Text style={styles.textTitle}>대화</Text>
            </ImageBackground>   
          </View>  
            <ScrollView 
              style={styles.fullScreen} ref={ref => this.scrollView = ref} 
              onContentSizeChange={(contentWidth, contentHeight)=>{        
                this.scrollView.scrollToEnd({animated: true})}}>
                  {this
                    .messages
                    .map((message, index) => {
                        return (
                          <View style={styles.row} key={index}>
                          <Image source={{ uri:message.user.photo }} style={[styles.photoUser,{  borderColor: this.state.user.uid === message.user.id ? '#18A55C' : '#5C7CB5'}]}/>
                          <View style={styles.info}>        
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{message.user.name}</Text>
                            <Text>{message.text}</Text>
                            <View style={styles.time}>
                              <Icon name='av-timer' size={10} color='#777'/> 
                              <Text style={{ fontSize: 10, color: '#777', fontStyle: 'italic'}}>{this.getTime(message.createdAt)}</Text>
                            </View>
                          </View>
                        </View>
                        );
                    })}
            </ScrollView>
            <View style={[styles.overlay, styles.bottomOverlay]}>
              <View>
                <TextInput
                  onChangeText={message => this.setState({ message })}
                  value={this.state.message}
                  style={styles.inputStyle}
                  placeholder="여기에 메시지를 입력하세요"
                  underlineColorAndroid="#5C7CB5"
                />
                </View>
                <TouchableOpacity onPress={() => this.onPutMessage()}>
                  <Icon reverse name='paper-plane' type='font-awesome' color='#5C7CB5' />
                </TouchableOpacity>
            </View>
        </View>
    );
  }
}


export default Chat;