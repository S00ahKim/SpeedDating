import React from "react";
import { View, ToastAndroid } from "react-native";
import Dialog from "react-native-dialog";

export default class DeleteProfileScreen extends React.Component {
  state = {
    dialogVisible: true,
  }

  showDialog = () => {
    this.setState({ dialogVisible: true });
  };
 
  handleCancel = () => {
    this.setState({ dialogVisible: false });
    ToastAndroid.show('취소되었습니다', ToastAndroid.SHORT);
  };
 
  handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    this.setState({ dialogVisible: false });
    ToastAndroid.show('이용해 주셔서 감사합니다.', ToastAndroid.SHORT);
  };

  render() {

    return (
      <View>
        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title>계정 삭제</Dialog.Title>
          <Dialog.Description>
            정말 계정을 삭제하시겠습니까? 계정을 삭제하시면 되돌릴 수 없습니다.
          </Dialog.Description>
          <Dialog.Button label="취소" onPress={this.handleCancel} />
          <Dialog.Button label="삭제" onPress={this.handleDelete} />
        </Dialog.Container>
      </View>
    );
  }
}