import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  ImageBackground,
} from 'react-native';
import { ListItem, Button, Icon } from 'react-native-elements'
import { NavigationActions } from 'react-navigation';
import styles from '../chatroom/style';
import firebase, { firebaseBasic } from '../../FirebaseSvc';
import firebaseSvc from '../../FirebaseSvc';

const background = require('../../assets/images/background.png');

class SDroom extends Component {
  static navigationOptions = {
    header: null,
  };

  messages = [];
  color;

  currentUser = firebase.auth().currentUser;

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      user: this.currentUser,
    };
  }

  componentWillMount() {
    const { loadMessages } = this.props;
    loadMessages();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.successSignin) {
      this.setState({ user : nextProps.user}); 
    }
    if (nextProps.successloadMessages) {
      this.messages = nextProps.messages;
    }
  }

  render() {
    return (
        <View style={styles.container}>
          <View>
            <ImageBackground source={background} style={styles.header}  resizeMode="stretch">
              <Text style={styles.textTitle}>목록</Text>
            </ImageBackground>   
          </View>  
            <ScrollView 
              style={styles.fullScreen} ref={ref => this.scrollView = ref} 
              onContentSizeChange={(contentWidth, contentHeight)=>{        
                this.scrollView.scrollToEnd({animated: true})}}>
                  {this
                    .messages
                    .map((message, index) => {
                      return (
                            <ListItem
                              key = {index}
                              title= {
                                <Text> 당신을 기다리는 사람 </Text>
                              }
                              onPress={() => this.props.navigation.navigate('Date', {
                                connect: message,
                              }) }
                              chevronColor="white"
                              chevron
                            />
                      )
                        //   )
                        // }else if (message.boy != userID && message.girl != userID){
                        //   return (
                        //     <View style={styles.econtainer}>
                        //       <View style = {styles.msg}>
                        //         <Icon name = 'volume-off' size={80} color='#fff'/>
                        //         <Text style={styles.txt} > 잠시만 </Text>
                        //         <Text style={styles.txt} > 기다려 </Text>
                        //         <Text style={styles.txt}> 주세요! </Text>
                        //       </View>
                        //     </View>
                        //   )
                        // }
                    })}
            </ScrollView>
        </View>
    );
  }
}

export default SDroom;