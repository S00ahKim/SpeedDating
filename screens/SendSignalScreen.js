import React from "react";
import { View, ToastAndroid } from "react-native";
import DialogInput from 'react-native-dialog-input';

export default class EditProfileScreen extends React.Component {
  state = {
    isDialogVisible: true,
  }

  sendInput(){
    // todo 메시지 전달 내용 작성
    ToastAndroid.show('전송되었습니다', ToastAndroid.SHORT);
    this.setState({ isdialogVisible: false });
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
          hintInput ={"선호하는 이성에게 랜덤으로 전송됩니다."}
          submitInput={ (inputText) => {this.sendInput(inputText)} }
          closeDialog={ () => {this.showDialog("close")}}
          cancelText={"취소"}
          submitText={"전송"}>
        </DialogInput>
      </View>
    );
  }
}