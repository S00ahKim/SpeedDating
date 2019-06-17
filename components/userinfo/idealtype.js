import React from 'react';
import { Constants, ImagePicker, Permissions } from 'expo';
import {
  StyleSheet, Text, Keyboard, Alert,
  TextInput, KeyboardAvoidingView, View,TouchableWithoutFeedback,
  ImageEditor, TouchableOpacity, Image, Picker, ScrollView,
} from 'react-native';
import { Button } from 'react-native-elements';

import firebaseSvc from '../../FirebaseSvc';
import styles from './style';

export default class IdealType extends React.Component {
    
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
    const idealTypeCollection = firebaseSvc.database().ref('idealType/'+currentUser.uid);

    try {
      const idealType = {
          age: this.state.age,
          location: this.state.location,
          education: this.state.education,
          religion: this.state.religion,
          interest: this.state.interest,
          keyword: this.state.keyword,
      };
      await idealTypeCollection.update(idealType);
      Alert.alert(
        '이상형 저장 완료!',
        '이 정보를 바탕으로 만남과 시그널 전송이 이루어집니다 XD',
        [
          {
            text: '내용 수정하기',
            onPress: () => console.log('취소함'),
            style: 'cancel',
          },
          {text: '좋아요!', onPress: () => console.log('좋아요!가 눌림')},
        ],
        {cancelable: true},
      );
    } catch ({ message }) {
      console.log('에러 메시지: ' + message);
    }
  };

  onChangeTextAge = age => this.setState({ age });

  render() {
    const currentUser = firebaseSvc.auth().currentUser;
    const idealTypeCollection = firebaseSvc.database().ref('idealType/'+currentUser.uid);

    firebaseSvc.database().ref('users/'+currentUser.uid)
    .once('value')
    .then(function(snapshot) {
        var gender = snapshot.val().gender
        if (gender == 'boy'){
            ygender = 'girl'
        }else{
            ygender = 'boy'
        }
        const idealTypeInfoImsi = {
            gender: ygender,
            age: '',
            location: '',
            education: '',
            religion: '',
            interest: '',
            keyword: '',
        };
        idealTypeCollection.set(idealTypeInfoImsi);
    })
    return (
        <ScrollView 
            style={styles.fullScreen} ref={ref => this.scrollView = ref} 
            onContentSizeChange={(contentWidth, contentHeight)=>{        
            this.scrollView.scrollToEnd({animated: true})}}>
            <KeyboardAvoidingView style={styles.containerView} behavior="padding">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.caScreenContainer}>
                        <Text style={styles.alertmsg} > 설정이 필요한 항목만 클릭! </Text>
                        <View style={styles.caFormView}>
                            <Text style={styles.title}>나잇대</Text>
                            <Picker
                                selectedValue={this.state.age}
                                style={styles.pickerelement}
                                onValueChange={(location) =>
                                    this.setState({location})
                                }>
                                <Picker.Item label="20-24" value="1" />
                                <Picker.Item label="25-29" value="2" />
                                <Picker.Item label="30-34" value="3" />
                                <Picker.Item label="35-39" value="4" />
                            </Picker>
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
                            <Text style={styles.title}> 이상형은 이런 사람이면 좋겠어요 </Text>   
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
                                title="설정하기"
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