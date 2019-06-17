import React from "react";
import { View, ToastAndroid } from "react-native";
import DialogInput from 'react-native-dialog-input'; 
import firebaseSvc from "../FirebaseSvc";

// 시그널은 약간,,, 전광판 같은 거임,,,

export default class EditProfileScreen extends React.Component {
  state = {
    isDialogVisible: true,
  }

  sendInput = async (inputText) => {
    const {goBack} = this.props.navigation;
    const currentUser = firebaseSvc.auth().currentUser;
    const signalCollection = firebaseSvc.database().ref('signal/'+currentUser.uid);

    firebaseSvc.database().ref('userDetail/'+currentUser.uid)
    .once('value')
    .then(function(snapshot) {
        var age = snapshot.val().age;
        var keyword = snapshot.val().keyword;
        const signalInfo = {
          text: inputText,
          createdAt: new Date().getTime(),
          sender: {
            id: currentUser.uid,
            age: age,
            keyword: keyword,
          },
          type: 1
        };
        signalCollection.set(signalInfo);
        console.log('시그널 잘 보냄');
        ToastAndroid.show('전송되었습니다', ToastAndroid.SHORT);
    })

    this.setState({ isdialogVisible: false });
    goBack()
  };

  showDialog(status){
    const {goBack} = this.props.navigation;

    if (status=="close"){
      ToastAndroid.show('취소되었습니다', ToastAndroid.SHORT);
      this.setState({ isdialogVisible: false });
      goBack()
      // 눈송이 차감하기
    }
  }
  
  render() {
    return (
      <View>
        <DialogInput 
          isDialogVisible={this.state.isDialogVisible}
          title={"시그널 보내기"}
          message={"160자 이내의 글을 작성해 주세요~"}
          hintInput ={"선호 이성에게 랜덤으로 전송됩니다."}
          submitInput={ (inputText) => {this.sendInput(inputText)} }
          closeDialog={ () => {this.showDialog("close")}}
          cancelText={"취소"}
          submitText={"전송"}>
        </DialogInput>
      </View>
    );
  }
}