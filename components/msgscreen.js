import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  ImageBackground,
  ToastAndroid,
} from 'react-native';
import { ListItem, Button } from 'react-native-elements'
import { NavigationActions } from 'react-navigation';
import styles from './speeddating/style';
import firebaseSvc, { firebaseBasic } from '../FirebaseSvc';

export default class MessageScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  messages = [];
  color;

  constructor(props) {
    super(props);
    this.state = {
      user: firebaseSvc.auth().currentUser,
      peopleArr: []
    };
    this.findPeople();
  }

  findPeople() {
    var people = [];
    var userID = firebaseSvc.auth().currentUser.uid;
    firebaseSvc.database().ref('idealType/'+userID).once('value').then((snapshot) => {
      var sdgender = snapshot.val().gender;
      firebaseSvc.database().ref('users').orderByChild('gender').equalTo(sdgender).on("child_added", (snapshot) => {
        if (snapshot.val()){
          people.push(snapshot.val());
        }
        console.log(people, 'dddddddddddd')
        this.setState({ peopleArr : people })
      });
    })
  }

  setting(){
    var me;
    var mygender;
    var currentUser = firebaseSvc.auth().currentUser;
    var peopleArr = this.state.peopleArr;
    firebaseSvc.database().ref('users/'+ currentUser.uid).once('value').then((snapshot) => {
      me = snapshot.val().name;
      mygender = snapshot.val().gender;
      for (i=0; i<peopleArr.length; i++){
        var you = peopleArr[i].name;
        firebaseBasic.makeSpeedDating(me, you, mygender);
      }
    });
    ToastAndroid.show('만남 탭으로 가보세요!', ToastAndroid.SHORT);
  }

  render() {
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 16}}> 스피드데이팅은 익명의 상대방과 3분 동안 대화할 수 있는 기능입니다 :) 상대가 마음에 든다면 오른쪽 상단 하트를 콕! 눌러주세요~ </Text>
            <Button
                title="스피드 데이팅 하고 싶어요!"
                type="clear"
                onPress={() => this.setting() }/>
        </View>
    );
  }
}