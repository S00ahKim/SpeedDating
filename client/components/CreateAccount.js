import React from 'react';
import { Constants, ImagePicker, Permissions } from 'expo';
import {
  StyleSheet, Text, Keyboard,
  TextInput, KeyboardAvoidingView, View,TouchableWithoutFeedback,
  ImageEditor, TouchableOpacity, Image,
} from 'react-native';
import { Button } from 'react-native-elements';

import firebaseSvc from '../FirebaseSvc';

class CreateAccount extends React.Component {

  state = {
    name: '',
    email: 'ex. iloveyou@google.com',
    password: '',
    avatar: '',
  };

  onPressCreate = async () => {
    try {
      const user = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      };
      await firebaseSvc.createAccount(user);
    } catch ({ message }) {
      console.log('회원 가입에 실패했습니다. 에러 메시지: ' + message);
    }
  };

  onChangeTextEmail = email => this.setState({ email });
  onChangeTextPassword = password => this.setState({ password });
  onChangeTextName = name => this.setState({ name });

  createAccount = async (user) => {
    firebase.auth()
    .createUserWithEmailAndPassword(user.email, user.password)
    .then(function() {
      var userf = firebase.auth().currentUser;
      userf.updateProfile({ displayName: user.name})
      .then(function() {
        alert("회원 가입이 완료되었습니다.");
      }, function(error) {
        console.warn("이미 존재하는 이름입니다.");
      });
    }, function(error) {
      alert("회원 가입에 실패했습니다. 에러 메시지: "+error.message);
    });
  }

  onImageUpload = async () => {
    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    try {
      // only if user allows permission to camera roll
      if (cameraRollPerm === 'granted') {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
        console.log(
          '이 이미지로 올릴게요 ---> :' + JSON.stringify(pickerResult)
        );

        var wantedMaxSize = 150;
        var rawheight = pickerResult.height;
        var rawwidth = pickerResult.width;
        var ratio = rawwidth / rawheight;
        var wantedwidth = wantedMaxSize;
        var wantedheight = wantedMaxSize/ratio;
        // check vertical or horizontal
        if(rawheight > rawwidth){
            wantedwidth = wantedMaxSize*ratio;
            wantedheight = wantedMaxSize;
        }
        let resizedUri = await new Promise((resolve, reject) => {
          ImageEditor.cropImage(pickerResult.uri,
          {
              offset: { x: 0, y: 0 },
              size: { width: pickerResult.width, height: pickerResult.height },
              displaySize: { width: wantedwidth, height: wantedheight },
              resizeMode: 'contain',
          },
          (uri) => resolve(uri),
          () => reject(),
          );
        });
        let uploadUrl = await firebaseSvc.uploadImage(resizedUri);
        this.setState({avatar: uploadUrl});
        await firebaseSvc.updateAvatar(uploadUrl);
      }
    } catch (err) {
      console.log('이미지 업로드 에러:' + err.message);
      alert('이미지 업로드 에러:' + err.message);
    }
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.caScreenContainer}>
                <View style={styles.caFormView}>
                    <Text style={styles.imagetitle}> ♥ 사진을 올리면 매칭 확률 up up! ♥ </Text>
                    <TouchableOpacity style={styles.imagestyle} onPress={this.onImageUpload}>
                        <Image source={require('../assets/images/default_profile.jpg')} />
                    </TouchableOpacity>
                    <Text style={styles.title}>이메일</Text>
                    <TextInput
                        style={styles.nameInput}
                        onChangeText={this.onChangeTextEmail}
                        value={this.state.email}
                        style={styles.caFormTextInput}
                    />
                    <Text style={styles.title}>비밀번호</Text>
                    <TextInput
                        style={styles.nameInput}
                        onChangeText={this.onChangeTextPassword}
                        style={styles.caFormTextInput}
                        value={this.state.password}
                    />
                    <Text style={styles.title}>닉네임</Text>
                    <TextInput
                        style={styles.nameInput}
                        onChangeText={this.onChangeTextName}
                        style={styles.caFormTextInput}
                        value={this.state.name}
                    />
                    <Button
                        title="회원 가입"
                        buttonStyle={styles.caButton}
                        onPress={this.onPressCreate}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const offset = 16;
const styles = StyleSheet.create({
  title: {
    marginTop: offset,
    marginLeft: offset,
    fontSize: offset,
  },
  nameInput: {
    height: offset * 2,
    margin: offset,
    paddingHorizontal: offset,
    borderColor: '#111111',
    borderWidth: 1,
    fontSize: offset,
  },
  caButton: {
    backgroundColor: '#5C7CB5',
    borderRadius: 5,
    height: 45,
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
  },
  containerView: {
    flex: 1,
    },
    caScreenContainer: {
        flex: 1,
    },
    caFormView: {
        flex: 1
    },
    caFormTextInput: {
        height: 43,
        fontSize: 14,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#eaeaea',
        backgroundColor: '#fafafa',
        paddingLeft: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        marginBottom: 5,
    },
    title: {
        marginTop: offset,
        marginLeft: offset,
        fontSize: offset,
    },
    imagetitle: {
        marginTop: 30,
        textAlign: 'center',
        fontSize: offset,
    },
    imagestyle: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    nameInput: {
        height: offset * 2,
        margin: offset,
        paddingHorizontal: offset,
        borderColor: '#111111',
        borderWidth: 1,
        fontSize: offset,
    },
});

export default CreateAccount;