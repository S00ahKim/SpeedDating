import React from 'react';
import { Constants, ImagePicker, Permissions } from 'expo';
import {
  StyleSheet, Text, Keyboard, ToastAndroid,
  TextInput, KeyboardAvoidingView, View,TouchableWithoutFeedback,
  ImageEditor, TouchableOpacity, Image, Picker, ScrollView,
} from 'react-native';
import { Button } from 'react-native-elements';

import firebaseSvc from '../../FirebaseSvc';
import styles from './style';

// 와나 네시간걸림ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ진짜 황당하네
// 삽질: 1. 셋스테이트 (안먹힘) 2. 다른함수호출(ㄴㄴ) 3. 처음에 셋 -> 두번째로 셋 (같은함수내) ㄴㄴ 4. 렌더링할때 걍 값 줘버리고 그뒤수정
class DetailInfo extends React.Component {

  state = {
    age: '',
    location: '',
    education: '',
    religion: '',
    interest: '',
    keyword: '',
  };


  onPressCreate = async () => {
    const currentUser = firebaseSvc.auth().currentUser;
    const detailInfoCollection = firebaseSvc.database().ref('userDetail/'+currentUser.uid);
 
    try {
      const detailInfo = {
          user: currentUser.uid,
          age: this.state.age,
          location: this.state.location,
          education: this.state.education,
          religion: this.state.religion,
          interest: this.state.interest,
          keyword: this.state.keyword,
      };
      await detailInfoCollection.update(detailInfo);
      console.log('추가됨. 수정도 같은 방식으로 하면 됨.')
      ToastAndroid.show('정보 수정 완료!', ToastAndroid.SHORT);
    } catch ({ message }) {
      console.log('정보 추가 실패: ' + message);
      ToastAndroid.show('ERROR! 다시 시도해 주세요.', ToastAndroid.SHORT);
    }
  };

  onChangeTextAge = age => this.setState({ age });

  render() {
    const currentUser = firebaseSvc.auth().currentUser;
    const detailInfoCollection = firebaseSvc.database().ref('userDetail/'+currentUser.uid);

    firebaseSvc.database().ref('users/'+currentUser.uid)
    .once('value')
    .then(function(snapshot) {
        var gender = snapshot.val().gender
        const detailInfoImsi = {
            user: '',
            age: '',
            gender: gender,
            location: '',
            education: '',
            religion: '',
            interest: '',
            keyword: '',
        };
        detailInfoCollection.set(detailInfoImsi);
    })
    return (
        <ScrollView 
            style={styles.fullScreen} ref={ref => this.scrollView = ref} 
            onContentSizeChange={(contentWidth, contentHeight)=>{        
            this.scrollView.scrollToEnd({animated: true})}}>
            <KeyboardAvoidingView style={styles.containerView} behavior="padding">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.caScreenContainer}>
                        <View style={styles.caFormView}>
                            <Text style={styles.title}>나이</Text>
                            <TextInput
                                style={styles.nameInput}
                                onChangeText={this.onChangeTextAge}
                                value={this.state.age}
                                style={styles.caFormTextInput}
                                placeholder="ex. 25"
                            />
                            <Text style={styles.title}>지역</Text>
                            <Picker
                                selectedValue={this.state.location}
                                style={styles.pickerelement}
                                onValueChange={(location) =>
                                    this.setState({location})
                                }>
                                <Picker.Item label="수도권" value="1" />
                                <Picker.Item label="강원" value="2" />
                                <Picker.Item label="충북" value="3" />
                                <Picker.Item label="충남" value="4" />
                                <Picker.Item label="전북" value="5" />
                                <Picker.Item label="전남" value="6" />
                                <Picker.Item label="경북" value="7" />
                                <Picker.Item label="경남" value="8" />
                                <Picker.Item label="제주" value="9" />
                            </Picker>
                            <Text style={styles.title}>학력</Text>
                            <Picker
                                selectedValue={this.state.education}
                                style={styles.pickerelement}
                                onValueChange={(education) =>
                                    this.setState({education})
                                }>
                                <Picker.Item label="고졸" value="hschool" />
                                <Picker.Item label="초대졸/재학" value="college" />
                                <Picker.Item label="대졸/재학" value="univ" />
                                <Picker.Item label="대학원졸/재학" value="dr" />
                            </Picker>
                            <Text style={styles.title}>종교</Text>
                            <Picker
                                selectedValue={this.state.religion}
                                style={styles.pickerelement}
                                onValueChange={(religion) =>
                                    this.setState({religion})
                                }>
                                <Picker.Item label="무교" value="none" />
                                <Picker.Item label="기독교" value="christian" />
                                <Picker.Item label="천주교" value="catholic" />
                                <Picker.Item label="불교" value="buddhism" />
                                <Picker.Item label="기타" value="etc" />
                            </Picker>
                            <Text style={styles.title}>관심사</Text>
                            <Picker
                                selectedValue={this.state.interest}
                                style={styles.pickerelement}
                                onValueChange={(interest) =>
                                    this.setState({interest})
                                }>
                                <Picker.Item label="독서하기" value="read" />
                                <Picker.Item label="영화보기" value="movie" />
                                <Picker.Item label="운동하기" value="exercise" />
                                <Picker.Item label="맛집탐방" value="eat" />
                                <Picker.Item label="드라이브" value="drive" />
                            </Picker>
                            <Text style={styles.title}>나를 대표하는 키워드</Text>   
                            <Picker
                                selectedValue={this.state.keyword}
                                style={styles.pickerelement}
                                onValueChange={(keyword) =>
                                    this.setState({keyword})
                                }>
                                <Picker.Item label="다정다감" value="soft" />
                                <Picker.Item label="무한긍정" value="positive" />
                                <Picker.Item label="열정만땅" value="passion" />
                                <Picker.Item label="재치만점" value="humor" />
                                <Picker.Item label="감성충만" value="sense" />
                            </Picker>         
                            <Button
                                title="업데이트"
                                buttonStyle={styles.caButton}
                                onPress={this.onPressCreate}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
  }
}

export default DetailInfo;