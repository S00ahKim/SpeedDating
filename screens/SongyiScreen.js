import React from "react";
import { View, Text, ImageBackground, ScrollView, Image } from "react-native";
import styles from '../components/chat/style';
import MsgScreen from '../components/msgscreen';

const background = require('../assets/images/background.png');

export default class SongyiScreen extends React.Component {
    static navigationOptions = {
      title: '램프의 요정 송이',
      header: null,
    };

    messages = [
      {text: '안녕하세요! 저는 램프의 요정 송이예요.'},
      {text: '정말 반가워요! 오늘 알려주고 싶은 것은...'},
      {text: '바로 호감을 불러일으키는 첫마디!'},
      {text: '궁금하죠?'},
      {text: '궁'},
      {text: '금'},
      {text: '하'},
      {text: '면'},
      {text: '오'},
      {text: '백'},
      {text: '원'},
      {text: 'ㅎㅎㅎ'},
      {text: '장난이에요!'},
      {text: '첫만남에 호감을 불러일으키는 말은 남녀노소를 불문하고 상대방에게 관심을 가지는 말이었다고 해요!'},
      {text: '잘 참고해서 좋은 사람과 만남 이루길 바래요 ^.^~'}
    ]

    render() {
      return (
        <View style={styles.container}>
        <View>
          <ImageBackground source={background} style={styles.header}  resizeMode="stretch">
            <Text style={styles.textTitle}>램프의 요정 송이</Text>
          </ImageBackground>   
        </View>  
        <ScrollView 
          style={styles.fullScreenS}>
              {this
                .messages
                .map((message, index) => {
                    return (
                      <View style={styles.row} key={index}>
                      <Image source={require('../assets/images/songyi.png')} style={[styles.photoUser,{  borderColor: '#5C7CB5' }]}/>
                      <View style={styles.info}>        
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}> 램프의 요정 송이 </Text>
                        <Text>{message.text}</Text>
                      </View>
                    </View>
                    );
                })}
                <MsgScreen />
        </ScrollView>
      </View>
      );
    }
  }