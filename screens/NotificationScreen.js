import React from 'react';
import { ScrollView, Text, StyleSheet, Dimensions, View, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import { ListItem, Icon, Button } from 'react-native-elements';
import firebaseSvc, { firebaseBasic } from '../FirebaseSvc';

// 보내는 사람이 여러 디비에 뿌리는 것이 아니라 관련 키워드 가진 사람 찾아서 걔가 만든 시그널 카드를 봄
// 나중에 뭐 검색을 막든가,, 시그널 일정 시간 지나면 지워지든가 해도 될듯
// 시그널은--->> interest 기반으로 함 

export default class NotificationScreen extends React.Component {
  static navigationOptions = {
    title: '시그널',
  };

  constructor(props) {
    super(props);
    this.state={
      signals: [],
      replies: [],
      reply: '',
    };
    this.findSignal();
    this.findReplies();
  }

  findSignal() {
    var userID = firebaseSvc.auth().currentUser.uid;
    var signals = [];
    firebaseSvc.database().ref('idealType/'+userID).once('value').then((snapshot) => {
      var idealTypeQuery = snapshot.val().interest;
      var idealTypeGender = snapshot.val().gender;
      firebaseSvc.database().ref('userDetail').orderByChild('interest').equalTo(idealTypeQuery).on("child_added", (snapshot) => {
        if (snapshot.val().gender == idealTypeGender){
          var uuid = snapshot.val().user;
          firebaseSvc.database().ref('signal/'+ uuid ).once('value').then((snapshot) => {
            if (snapshot.val()){
              signals.push(snapshot.val());
            }
            console.log('여기', signals)
            this.setState({ signals: signals })
            console.log('언제까지찍히는거')
          });
        }
      });
    });
  }

  findReplies() {
    var userID = firebaseSvc.auth().currentUser.uid;
    var replies = [];
    firebaseSvc.database().ref('replies').orderByChild('to').equalTo(userID).on("child_added", (snapshot) => {
      replies.push(snapshot.val())
      this.setState({ replies: replies })
      console.log('답장들')
    })
  }

  replyTo(receiver){
    let reply = {
      from: firebaseSvc.auth().currentUser.uid,
      to: receiver.sender.id,
      text: this.state.reply,
    }
    firebaseSvc.database().ref('replies').push().set(reply, (error) => {
      if (error) {
        console.log('에러났다');
        ToastAndroid.show('네트워크 오류: 다시 시도해 주세요', ToastAndroid.SHORT)
      } else {
        console.log('답장잘했다');
        ToastAndroid.show('전송되었습니다 XD', ToastAndroid.SHORT)
        this.setState({ replies: '' });
      }
    });;
  }

  connectChat(makechatwith) {
    //채팅창 개설하는 함수~
    firebaseSvc.database().ref('users/'+makechatwith.to).once('value').then((snapshot) =>{
      var megender = snapshot.val().gender;
      var myname = snapshot.val().name;
      firebaseSvc.database().ref('users/'+makechatwith.from).once('value').then((snapshot) =>{
        var yourname = snapshot.val().name;
        firebaseBasic.makeChatRoom(makechatwith.to, makechatwith.from, megender, myname, yourname);
      })
    })
  }

  render() {
    var signals = this.state.signals;
    var replies = this.state.replies;
    if (signals && replies ){
      return (
        <ScrollView>
          <ScrollView 
            style={styles.container} ref={ref => this.scrollView = ref} 
            onContentSizeChange={(contentWidth, contentHeight)=>{        
              this.scrollView.scrollToEnd({animated: true})}}>
              {
                signals.map((signal, idx) => {
                  return(
                    <View style={styles.signal} key={idx}>
                      <Text style={styles.title}> Signal </Text>
                      <Text style={styles.content}> {signal.text} </Text>
                      <View style={ styles.tagContainer }>
                        <Text style={styles.tag}>
                          #{signal.sender.keyword}
                        </Text>
                      </View>
                      <Text style={styles.sender}> from. 익명의 {signal.sender.age}세 이성 </Text>
                      <View style={styles.overlay}>
                          <TextInput 
                            placeholder="답장 보내기..." 
                            placeholderColor="#c4c3cb" 
                            style={styles.reply} 
                            onChangeText={(reply) => this.setState({reply})}
                            value={this.state.reply} />
                          <TouchableOpacity onPress={this.replyTo.bind(this,signal)}>
                            <Icon reverse name='paper-plane' type='font-awesome' color='#5C7CB5' />
                          </TouchableOpacity>
                      </View>
                    </View>
                );
              })}
          </ScrollView>
          <ScrollView 
            style={styles.container} ref={ref => this.scrollView = ref} 
            onContentSizeChange={(contentWidth, contentHeight)=>{        
              this.scrollView.scrollToEnd({animated: true})}}>
              {
                replies.map((reply, idx) => {
                  return(
                    <View style={styles.replyview} key={idx}>
                      <Text style={styles.rtitle}> Reply </Text>
                      <View style={styles.overlay}>
                        <Text style={styles.rcontent}> {reply.text} </Text>
                        <Button
                          title="연결"
                          type="clear"
                          onPress={this.connectChat.bind(this,reply)}
                        />
                      </View>
                    </View>
                );
              })}
          </ScrollView>
        </ScrollView>
      )
    } else if (signals && !replies) {
      return (
          <ScrollView 
            style={styles.container} ref={ref => this.scrollView = ref} 
            onContentSizeChange={(contentWidth, contentHeight)=>{        
              this.scrollView.scrollToEnd({animated: true})}}>
              {
                signals.map((signal, idx) => {
                  return(
                    <View style={styles.signal} key={idx}>
                      <Text style={styles.title}> Signal </Text>
                      <Text style={styles.content}> {signal.text} </Text>
                      <View style={ styles.tagContainer }>
                        <Text style={styles.tag}>
                          #{signal.sender.keyword}
                        </Text>
                      </View>
                      <Text style={styles.sender}> from. 익명의 {signal.sender.age}세 이성 </Text>
                      <View style={styles.overlay}>
                          <TextInput 
                            placeholder="답장 보내기..." 
                            placeholderColor="#c4c3cb" 
                            style={styles.reply} 
                            onChangeText={(reply) => this.setState({reply})}
                            value={this.state.reply} />
                          <TouchableOpacity onPress={this.replyTo.bind(this,signal)}>
                            <Icon reverse name='paper-plane' type='font-awesome' color='#5C7CB5' />
                          </TouchableOpacity>
                      </View>
                    </View>
                );
              })}
          </ScrollView>
      )
    } else if (!signals && replies) {
      return (
        <ScrollView 
            style={styles.container} ref={ref => this.scrollView = ref} 
            onContentSizeChange={(contentWidth, contentHeight)=>{        
              this.scrollView.scrollToEnd({animated: true})}}>
              {
                replies.map((reply, idx) => {
                  return(
                    <View style={styles.replyview} key={idx}>
                      <Text style={styles.rtitle}> Reply </Text>
                      <View style={styles.overlay}>
                        <Text style={styles.rcontent}> {reply.text} </Text>
                        <Button
                          title="연결"
                          type="clear"
                          onPress={this.connectChat.bind(this,reply)}
                        />
                      </View>
                    </View>
                );
              })}
        </ScrollView>
      )
    } else {
      return(
        <View style={styles.econtainer}>
          <View style = {styles.msg}>
            <Icon name = 'volume-off' size={80} color='#fff'/>
            <Text style={styles.txt} > 아직 </Text>
            <Text style={styles.txt} > 도착한 시그널이 </Text>
            <Text style={styles.txt} > 없습니다 ㅠ.ㅠ </Text>
            <Text style={styles.txt}> 조금만 기다려 주세요~ </Text>
          </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: 'column',
  },
  overlay:{
    padding: 16,
    right: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
    flex: 1,
    bottom: 0,
  },
  signal:{
    padding: 10,
    backgroundColor: '#5C7CB5',
  },
  replyview:{
    padding: 10,
    backgroundColor: '#fff'
  },
  title:{
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff'
  },
  content:{
    fontSize: 15,
    padding: 20,
    color: '#fff'
  },
  rtitle:{
    fontWeight: 'bold',
    fontSize: 20,
    color: '#5C7CB5'
  },
  rcontent:{
    fontSize: 15,
    padding: 20,
    color: '#5C7CB5'
  },
  sender:{
    fontSize:15,
    color: '#fff',
    textAlign: 'right'
  },
  tagContainer:{
    alignSelf: 'flex-start',
    paddingLeft: 16
  },
  tag:{
    backgroundColor: '#969191',
    color: '#fff',
    borderRadius:40,
  },
  reply:{
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    alignItems: 'center',
    width: 200,
    color: '#000',
    justifyContent: 'center',
    fontSize: 14,
  },
  econtainer:{
    flex:1,
    backgroundColor: '#5C7CB5',
  },
  msg:{
    margin: 40,
  },
  txt:{
    textAlign: 'center', 
    fontWeight: 'bold',
    fontSize: 25,
    color: '#fff'
  }
});
