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
import firebaseSvc from '../../FirebaseSvc';

const background = require('../../assets/images/background.png');

//누구랑 하는지 일단 불러온다 --> 걔를 하나씩 꺼내가면서 한다 setState

class SpeedDating extends Component {

  constructor(props) {
    super(props);
    this.state={
      people: [],
      selected: [],
      peoplenum: 3,
      message: '',
      user: this.currentUser,
      chatroom: ''
    };
    this.findPeople();
    this.selectPeople();
  }

  messages = [];
  color;
  currentUser = firebaseSvc.auth().currentUser;

  findPeople() {
    var people = [];
    var userID = this.currentUser.uid;
    firebaseSvc.database().ref('idealType/'+userID).once('value').then((snapshot) => {
      var sdgender = snapshot.val().gender;
      firebaseSvc.database().ref('users').orderByChild('gender').equalTo(sdgender).on("child_added", (snapshot) => {
        if (snapshot.val()){
          people.push(snapshot.val());
        }
        this.setState({ people: people })
      });
    })
  }

  selectPeople() {
    var newpeople = this.state.people;
    var selected = this.state.selected;
    var i;
    firebaseSvc.database().ref('users/'+userID).once('value').then((snapshot) => {
      var mygender = snapshot.val().gender;

      for (i = 0; i< 3 ; i++){
        var pplnum = this.state.people.length;
        var idx = this._getRandomInt(0, pplnum);
        let chatroom;
        if (mygender == 'boy') {
          chatroom = {
            boy: this.currentUser.uid,
            girl: '',
            messages: {},
            heart: 0
          }
        } else {
          chatroom = {
            boy: '',
            girl: this.currentUser.uid,
            messages: {},
            heart: 0
          }
        }
        firebaseSvc.database().ref('sdchats').push().set(chatroom, (error) => {
          if (error){
            console.log('사람고르는 에러');
            ToastAndroid.show('네트워크 오류: 다시 시도해 주세요', ToastAndroid.SHORT)
          } else {
            console.log('사람 잘골랐다');
            selected.push(newpeople[idx]);
            this.setState({ selected: selected });
            newpeople = newpeople.splice(idx, 1);
            this.setState({ people: newpeople });
          }
        })
      }
    });
  }

  _getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
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

  openNextRoom() {
    var userID = this.currentUser.uid;
    firebaseSvc.database().ref('users/'+userID).once('value').then((snapshot) => {
      if (snapshot.val().gender == 'boy'){
        var mygender = 'boy';
      } else{
        var mygender = 'girl';
      }//수정필요
      firebaseSvc.database().ref('sdchats').orderByChild(mygender).equalTo(mygender).on("child_added", (snapshot) => {
        if (snapshot.val()){
          people.push(snapshot.val());
        }
        this.setState({ people: people })
      });
    })
  }

  thisSDend() {
      var nowpplnum = this.state.peoplenum;
      var newpplnum = nowpplnum-1;
      this.setState({ peopelnum: newpplnum });
      console.log(this.state);
      if (this.state.peoplenum != 0){
        Alert.alert(
          '이번 만남 종료!',
          '확인을 누르시면 다음 만남으로 넘어갑니다~ XD',
          [
            {text: '확인', onPress: () => {this.openNextRoom.bind(this)}},
          ],
          {cancelable: false},
        );
      } else {
        Alert.alert(
          '모든 만남 종료!',
          '나는 누구와 연결되었을까? 대화 탭에서 확인하세요!',
          [
            {text: '확인', onPress: () => this.props.navigation.navigate('대화')},
          ],
          {cancelable: false},
        );
      }
  }

  onPushHeart(){
    console.log('하트 입력하기');
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <ImageBackground source={background} style={styles.header}  resizeMode="stretch">
            <Text style={styles.textTitle}>만남</Text>
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


export default SpeedDating;