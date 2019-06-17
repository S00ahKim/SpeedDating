import React from "react";
import { View, Text, StyleSheet, Linking, ToastAndroid } from "react-native";
import { ListItem, Icon } from 'react-native-elements';

export default class ChargeSnowScreen extends React.Component {
    static navigationOptions = {
      title: '눈송이 충전',
    };

    educateViolence() {
      Linking.openURL('https://www.youtube.com/watch?v=MfOD8YptSIc').catch(err => console.error('An error occurred', err))
      //눈송이 더해주기
    }

    buySnowflake(quantity) {
      //눈송이에 quantity 만큼 더해주기
      ToastAndroid.show('[눈송이 '+quantity+'개 구매 완료!]', ToastAndroid.SHORT);
    }
  
    render() {
      return (
        <View>
          <ListItem
            title= {
              <Text style={styles.title}> 무료 충전소 </Text>
            }
          />
          <ListItem
            title= {
              <Text> 페이스북 친구에게 알려주기 </Text>
            }
            leftIcon = {
              <Icon name='thumb-up'/>
            }
            subtitle = {
              <Text> 10 눈송이 </Text>
            }
            onPress={() => console.log('이 기능은 만들지 않았습니다')}
            chevronColor="white"
            chevron
          />
          <ListItem
            title= {
              <Text> 카카오톡 친구에게 알려주기 </Text>
            }
            leftIcon = {
              <Icon name='forum'/>
            }
            subtitle = {
              <Text> 10 눈송이 </Text>
            }
            onPress={() => console.log('이 기능은 만들지 않았습니다~')}
            chevronColor="white"
            chevron
          />
          <ListItem
            title= {
              <Text> 데이트 폭력 교육 이수 </Text>
            }
            leftIcon = {
              <Icon name='theaters'/>
            }
            subtitle = {
              <Text> 10 눈송이 </Text>
            }
            onPress={() => this.educateViolence()}
            chevronColor="white"
            chevron
          />
          <ListItem
            title= {
              <Text style={styles.title}> 눈송이 충전소 </Text>
            }
          />
          <ListItem
            title= {
              <Text> 눈송이 500개 충전하기 </Text>
            }
            onPress={() => this.buySnowflake(500) }
            badge={{ value: '5000원', textStyle: { color: 'white' }, containerStyle: { marginTop: -10 } }}
          />
          <ListItem
            title= {
              <Text> 눈송이 1000개 충전하기 </Text>
            }
            onPress={() => this.buySnowflake(1000) }
            badge={{ value: '10000원', textStyle: { color: 'white' }, containerStyle: { marginTop: -10 } }}
          />
          <ListItem
            title= {
              <Text> [인기] 눈송이 2500개 충전하기 </Text>
            }
            onPress={() => this.buySnowflake(2500) }
            badge={{ value: '20000원', textStyle: { color: 'white' }, containerStyle: { marginTop: -10 } }}
          />
        </View>
      );
    }
  }

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#5C7CB5'
  },
  ttfh:{
    fontWeight: 'bold'
  }
})