import firebase from 'firebase';
import { firebaseConfig } from './constants/firebaseConfig';
import uuid from 'uuid';

let instance = null
 
class FirebaseSvc {
  constructor() {
    if (!instance) {
      this.app = firebase.initializeApp(firebaseConfig);
      instance = this;
    }
    return instance;
  }

  createAccount = async (user) => {
    firebase.auth()
      .createUserWithEmailAndPassword(user.email, user.password)
    .then(function() {
      var userf = firebase.auth().currentUser;
      userf.updateProfile({ 
        displayName: user.name,
        photoURL: user.avatar,
      })
      .then(function() {
        firebase.database().ref('users/'+userf.uid).set(user);
        console.log("반갑습니다! " + user.name + "님의 계정이 만들어졌습니다.");
      }, function(error) {
        console.warn("닉네임 오류.");
      });
    }, function(error) {
      console.error("에러:" + error.message);
      alert("일시적인 네트워크 오류입니다 ㅠㅠ ");
    });
  }

  login = async(user, success_callback, failed_callback) => {
    await firebase.auth()
      .signInWithEmailAndPassword(user.email, user.password)
    .then(success_callback, failed_callback);
  }

  uploadImage = async (uri) => {
    console.log(uri);
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const ref = firebase
      .storage()
      .ref('post_images')
      .child(uuid.v4());
  
    var snapshot = await ref.put(blob);
    blob.close();
    return snapshot.ref.getDownloadURL()
  }

  makeChatRoom(me, you, megender, myname, yourname) {
    let chatroom;
    if (megender == 'boy'){
      chatroom = {
        boy: me,
        girl: you,
        messages: {},
        boyname: myname,
        girlname: yourname,
      }
    }else {
      chatroom = {
        boy: you,
        girl: me,
        messages: {},
        boyname: yourname,
        girlname: myname,
      }
    }
    firebase.database().ref('messages').push().set(chatroom, (error) => {
      if (error){
        console.log('챗창 개설에 문제 있음');
      }else {
        console.log('잘 만들어짐');
      }
    })
  }

  // updateAvatar = async (uploadUrl) => {
  //   var user = firebase.auth().currentUser;
  //   user.updateProfile({
  //     photoURL: uploadUrl,
  //   }).then(function() {
  //     firebase.database().ref('users/' + user.uid ).set({ avatar: uploadUrl }, (error) => {
  //       if (error){
  //         console.log('이미지 제대로 안올라감')
  //       } else {
  //         console.log('아바타업뎃')
  //       }
  //     });
  //   })
  // }
}

const firebaseBasic = new FirebaseSvc();
const firebaseSvc = firebaseBasic.app;
export { firebaseBasic };
export default firebaseSvc;
