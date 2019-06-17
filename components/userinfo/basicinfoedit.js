import React from 'react';
import { Constants, ImagePicker, Permissions } from 'expo';
import {
  StyleSheet, Text, Keyboard,
  TextInput, KeyboardAvoidingView, View,TouchableWithoutFeedback,
  ImageEditor, TouchableOpacity, Image, Picker, ScrollView, ToastAndroid,
} from 'react-native';
import { Button } from 'react-native-elements';

import firebaseSvc, { firebaseBasic } from '../../FirebaseSvc';
import styles from './style';


class BasicInfoEdit extends React.Component {

    state = {
        name:firebaseSvc.auth().currentUser.displayName,
        avatar: firebaseSvc.auth().currentUser.photoURL,
    };

    onPressSubmit = async () => {
        console.log('여기는 왔니')
        const usersCollection = firebaseSvc.database().ref('users/'+firebaseSvc.auth().currentUser.uid);
        firebaseSvc.auth().currentUser.updateProfile({
            displayName: this.state.name,
            photoURL: this.state.avatar
        }).then(function() {
            console.log('성공적으로 수정하였습니다')
            ToastAndroid.show('성공적으로 수정하였습니다 ^^', ToastAndroid.SHORT);
        }).catch(function(error) {
            console.log('정보 수정에 실패했습니다. 에러 메시지: ' + error);
            ToastAndroid.show('성공적으로 수정하였습니다 ^^', ToastAndroid.SHORT);
        });

        usersCollection.once('value').then((snapshot) => {
            var email = snapshot.val().email;
            var pwd = snapshot.val().password;
            var gender = snapshot.val().gender;
            usersCollection.update({
                avatar: this.state.avatar,
                email: email,
                gender: gender,
                name: this.state.name,
                password: pwd
            });
            console.log('성공적으로 수정하였습니다')
            ToastAndroid.show('성공적으로 수정하였습니다 ^^', ToastAndroid.SHORT);
        });
    };

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
            <ScrollView 
                style={styles.fullScreen} ref={ref => this.scrollView = ref} 
                onContentSizeChange={(contentWidth, contentHeight)=>{        
                    this.scrollView.scrollToEnd({animated: true})}}>
                <KeyboardAvoidingView style={styles.containerView} behavior="padding">
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.caScreenContainer}>
                            <View style={styles.caFormView}>
                                <Text style={styles.imagetitle}> ♥ 정면 사진을 추천해요! ♥ </Text>
                                <TouchableOpacity style={styles.imagealign} onPress={this.onImageUpload}>
                                    <Image style={styles.imagestyle} source={{ uri: this.state.avatar}} />
                                </TouchableOpacity>
                                <Text style={styles.title}>닉네임</Text>
                                <TextInput
                                    style={styles.nameInput}
                                    onChangeText={this.onChangeTextName}
                                    style={styles.caFormTextInput}
                                    value={this.state.name}
                                />
                                <Button
                                    title="정보 수정"
                                    buttonStyle={styles.caButton}
                                    onPress={this.onPressSubmit}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}



export default BasicInfoEdit;