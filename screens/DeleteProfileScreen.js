import React from "react";
import { View, Text } from "react-native";
import Dialog from "react-native-dialog";

export default class EditProfileScreen extends React.Component {
  state = {
    dialogVisible: true,
  }

  showDialog = () => {
    this.setState({ dialogVisible: true });
  };
 
  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };
 
  handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    this.setState({ dialogVisible: false });
  };

  render() {

    return (
      <View>
        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title> 계정 삭제 </Dialog.Title>
          <Dialog.Description>
            정말 계정을 삭제하시겠습니까?
          </Dialog.Description>
          <Dialog.Button label="취소" onPress={this.handleCancel}/>
          <Dialog.Button label="삭제" onPress={this.handleDelete}/>
        </Dialog.Container>
      </View>
    );
  }
}