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
  Alert,
  ToastAndroid
} from 'react-native';
import CountDown from 'react-native-countdown-component';
import { Icon } from 'react-native-elements'
import styles from './style';
import moment from 'moment';
import firebaseSvc, { firebaseBasic } from '../../FirebaseSvc';

const background = require('../../assets/images/background.png');

class SpeedDating extends Component {
  chatroom = this.props.navigation.state.params.connect;

  findAddress () {
    var address;
    var girluser = this.chatroom.girl;
    firebaseSvc.database().ref('sdchats').orderByChild('boy').equalTo(this.chatroom.boy).on('value', (snapshot)=> {
      console.log(snapshot)
      snapshot.forEach(function(child) {
        if (child.val().girl == girluser){
          var addressurl = String(child.ref);
          var arr = addressurl.split('/');
          var len = arr.length;
          address = arr[len-1];
          address.substr(0, address.length -1);
          return true
        }
      })
    })
    //리턴위치때문에 삽질;;
    console.log('address', address)
    return address;
  }

  static navigationOptions = {
    header: null,
  };

  messages = [];
  color;

  currentUser = firebaseSvc.auth().currentUser;

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      user: this.currentUser,
    };
  }

  componentWillMount() {
    const { loadMessages } = this.props;
    var address = this.findAddress();
    loadMessages(address);
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
    var address = this.findAddress();
    putMessage(this.state.message, this.state.user, address);
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
              <TouchableOpacity onPress={() => this.onPushHeart()}>
                <Icon reverse name='heart' type='font-awesome' color='#5C7CB5' />
              </TouchableOpacity>
            </ImageBackground>   
          </View>  
          <View>
            <View>
              <CountDown
                  until={60 * 3}
                  size={20}
                  onFinish={() => this.thisSDend()}
                  digitStyle={{backgroundColor: '#FFF'}}
                  digitTxtStyle={{color: '#5C7CB5'}}
                  timeToShow={['M', 'S']}
                  timeLabels={{m: '분', s: '초'}}
              />            
            </View>
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
                          <View style={styles.info}>        
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>익명</Text>
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

  thisSDend() {
    var address = this.findAddress();
    var me;
    var you;
    var megender;
    var myname;
    var yourname;
    firebaseSvc.database().ref('users/' +this.state.user.uid).once('value').then((snapshot) => {
      myname = snapshot.val().name;
      megender = snapshot.val().gender;
    });
    firebaseSvc.database().ref('sdchats/' + address).once('value').then((snapshot) => {
      if (snapshot.val().heart == 2){
        console.log('이거 구현해야 하는데 ㅠㅠ');
        ToastAndroid.show('마음이 통하셨어요! 매칭 성공!')
      }
    })
    this.props.navigation.navigate('Main');
  }

  onPushHeart = async () => {
    var newheart;
    var address = this.findAddress();
    firebaseSvc.database().ref('sdchats/' + address).once('value').then((snapshot) => {
      heart = snapshot.val().heart;
      console.log(heart)
      newheart = heart+1;
    })
    await firebaseSvc.database().ref('sdchats/' + address ).update({ 
      heart: newheart, });
  }
}


export default SpeedDating;