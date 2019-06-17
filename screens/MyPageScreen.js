import React from "react";
import { View, StyleSheet, Text, Image, Dimensions } from "react-native";
import { ListItem, Icon } from 'react-native-elements';
import firebaseSvc from '../FirebaseSvc';
//leftAvatar={{ rounded: true, source: firebaseSvc.auth().currentUser.photoURL, showEditButton: true,}} 리스트아이템 가운데정렬

export default class MyPageScreen extends React.Component {
  static navigationOptions = {
    title: '마이페이지',
  };

  render() {
    console.log("이 사람이 로그인 중 ---> ", firebaseSvc.auth().currentUser.displayName);
    return (
      <View>
        <View style = {{ alignItems: 'center' }} >
          <Image source = { { uri: firebaseSvc.auth().currentUser.photoURL } } 
                  style = {{ height:100, 
                              width: 100, 
                              borderRadius:50, 
                              alignContent: 'center',
                              marginTop: 10,
                            }} />
            <Text style = {{ textAlign: 'center', color: '#5C7CB5', fontSize: 16, fontWeight: 'bold',}}> {firebaseSvc.auth().currentUser.displayName}님, 반갑습니다! </Text>
        </View>
        <View>
          <ListItem
            title= { <Text> 기본 정보 수정 </Text>}
            leftIcon = {
              <Icon name='create'/>
            }
            onPress={() => this.props.navigation.navigate('EditProfile')}
            chevronColor="white"
            chevron
          />
          <ListItem
            title= {
              <Text> 상세 프로필 작성 </Text>
            }
            leftIcon = {
              <Icon name='content-paste'/>
            }
            onPress={() => this.props.navigation.navigate('SpecificProfile')}
            chevronColor="white"
            chevron
          />
          <ListItem
            title= {
              <Text> 내 이상형 </Text>
            }
            leftIcon = {
              <Icon name='favorite'/>
            }
            onPress={() => this.props.navigation.navigate('IdealType')}
            chevronColor="white"
            chevron
          />
          <ListItem
            title= {
              <Text> 시그널 보내기 </Text>
            }
            leftIcon = {
              <Icon name='radio'/>
            }
            onPress={() => this.props.navigation.navigate('SendSignal')}
            chevronColor="white"
            chevron
          />
          <ListItem
            title= {
              <Text> 눈송이 충전 </Text>
            }
            leftIcon = {
              <Icon name='ac-unit'/>
            }
            onPress={() => this.props.navigation.navigate('ChargeSnow')}
            chevronColor="white"
            chevron
          />
          <ListItem
            title= {
              <Text> 램프의 요정 송이 </Text>
            }
            leftIcon = {
              <Icon name='tag-faces'/>
            }
            onPress={() => this.props.navigation.navigate('Songyi')}
            chevronColor="white"
            chevron
          />
          <ListItem
            title= {
              <Text> 계정 삭제 </Text>
            }
            leftIcon = {
              <Icon name='delete-forever'/>
            }
            onPress={() => this.props.navigation.navigate('DeleteProfile')}
            chevronColor="white"
            chevron
          />      
        </View>
      </View>
    );
  }
}