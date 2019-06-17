import React from "react";
import { View, ToastAndroid } from "react-native";
import Dialog from "react-native-dialog"; 
import firebaseSvc from "../FirebaseSvc";

export default class DeleteProfileScreen extends React.Component {
  state = {
    dialogVisible: true,
  }

  showDialog = () => {
    this.setState({ dialogVisible: true });
  };
 
  handleCancel = () => {
    const {goBack} = this.props.navigation;
    this.setState({ dialogVisible: false });
    ToastAndroid.show('취소되었습니다', ToastAndroid.SHORT);
    goBack()
  };
 
  handleDelete = () => {
    var user = firebaseSvc.auth().currentUser;
    const {goBack} = this.props.navigation.navigate('Login');
    user.delete().then(function() {
      goBack() 
      ToastAndroid.show('지금까지 이용해 주셔서 감사합니다.', ToastAndroid.SHORT);
    }).catch(function(error) {
      console.log(error)
    });
  };

  render() {

    return (
      <View>
        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title>계정 삭제</Dialog.Title>
          <Dialog.Description>
            정말 계정을 삭제하시겠어요? 계정을 삭제하시면 되돌릴 수 없습니다.
          </Dialog.Description>
          <Dialog.Button label="취소" onPress={this.handleCancel} />
          <Dialog.Button label="삭제" onPress={this.handleDelete} />
        </Dialog.Container>
      </View>
    );
  }
}