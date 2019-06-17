import React from 'react';
import { Constants, ImagePicker, Permissions } from 'expo';
import {
  StyleSheet, Text, Keyboard,
  TextInput, KeyboardAvoidingView, View,TouchableWithoutFeedback,
  ImageEditor, TouchableOpacity, Image, Picker
} from 'react-native';
import { Button } from 'react-native-elements';

import firebaseSvc, { firebaseBasic } from '../../FirebaseSvc';
import styles from './style';

class BasicInfo extends React.Component {

  state = {
    name: '',
    email: '',
    password: '',
    avatar: '',
    gender: '',
  };

  onPressCreate = async () => {
    try {
      const user = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        avatar: this.state.avatar,
        gender: this.state.gender,
      };
      await firebaseBasic.createAccount(user);
    } catch ({ message }) {
      console.log('회원 가입에 실패했습니다. 에러 메시지: ' + message);
    }
  };

  onChangeTextEmail = email => this.setState({ email });
  onChangeTextPassword = password => this.setState({ password });
  onChangeTextName = name => this.setState({ name });

  onImageUpload = async () => {
    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    try {
      // 허가를 받아야 카메라 롤을 쓸 수 있음
      if (cameraRollPerm === 'granted') {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [3, 3],
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
        let uploadUrl = await firebaseBasic.uploadImage(resizedUri);
        this.setState({avatar: uploadUrl});
        //await firebaseBasic.updateAvatar(uploadUrl);
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
            <Text style={styles.alertmsg} > 이메일과 성별은 수정할 수 없어요! </Text>
                <View style={styles.caFormView}>
                    <Text style={styles.imagetitle}> ♥ 정면 사진을 추천해요! ♥ </Text>
                    <TouchableOpacity style={styles.imagealign} onPress={this.onImageUpload}>
                        <Image style={styles.imagestyle} source={require('../../assets/images/default_profile.jpg')} />
                    </TouchableOpacity>
                    <Text style={styles.title}>이메일</Text>
                    <TextInput
                        style={styles.nameInput}
                        onChangeText={this.onChangeTextEmail}
                        value={this.state.email}
                        style={styles.caFormTextInput}
                        placeholder="ex. iloveyou@google.com"
                    />
                    <Text style={styles.title}>비밀번호</Text>
                    <TextInput
                        style={styles.nameInput}
                        onChangeText={this.onChangeTextPassword}
                        style={styles.caFormTextInput}
                        value={this.state.password}
                        placeholder="여섯 자리 이상의 비밀번호를 입력해 주세요."
                    />
                    <Text style={styles.title}>닉네임</Text>
                    <TextInput
                        style={styles.nameInput}
                        onChangeText={this.onChangeTextName}
                        style={styles.caFormTextInput}
                        value={this.state.name}
                        placeholder="개성을 표현하는 닉네임을 입력해 주세요."
                    />
                    <Text style={styles.title}>성별</Text>
                    <Picker
                        selectedValue={this.state.gender}
                        style={styles.pickerelement}
                        onValueChange={ (gender) => this.setState({ gender })}
                        mode="dropdown">
                          <Picker.Item label="여성" value="girl" />
                          <Picker.Item label="남성" value="boy" />
                    </Picker>
                    <Button
                        title="회원가입"
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



export default BasicInfo;