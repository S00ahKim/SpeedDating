import React from 'react';
import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';
import { Button } from 'react-native-elements';
import styles from "./loginstyle";
import firebaseSvc from '../FirebaseSvc';

const appId = "1047121222092614";
// 페이스북 로그인은 만들어 놓기만 했음

export default class Login extends React.Component {
    state = {
        email: 'admin@speeddating.com',
        password: 'admin123',
    };

    onPressLogin = async () => {
        const user = {
            email: this.state.email,
            password: this.state.password,
        };
        firebaseSvc.login(user, this.loginSuccess, this.loginFailed);
    };

    onPressCreateAccount = async () => {
        this.props.navigation.navigate('CreateAccount')
    };

    async onFbLoginPress() {
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(appId, {
            permissions: ['public_profile', 'email'],
        });
        if (type === 'success') {
        const response = await fetch(
            `https://graph.facebook.com/me?access_token=${token}`);
        Alert.alert(
            '로그인 되었습니다!',
            `Hi ${(await response.json()).name}!`,
        );
        }
    }
    
    loginSuccess = () => {
        console.log('성공적으로 로그인하였습니다.');
        this.props.navigation.navigate('App', {
            name: this.state.name,
            email: this.state.email,
        });
    };
    
    loginFailed = () => {
        alert('이메일이나 비밀번호가 맞지 않습니다.');
    };

    onChangeTextEmail = email => this.setState({ email });
    onChangeTextPassword = password => this.setState({ password });

    render() {
        return (
            <KeyboardAvoidingView style={styles.containerView} behavior="padding">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.loginScreenContainer}>
                        <View style={styles.loginFormView}>
                            <Text style={styles.logoText}>SpeedDating</Text>
                                <TextInput 
                                    placeholder="email" 
                                    placeholderColor="#c4c3cb" 
                                    style={styles.loginFormTextInput}
                                    onChangeText={(email) => this.setState({email})}
                                    value={this.state.email} />
                                <TextInput 
                                    placeholder="password" 
                                    placeholderColor="#c4c3cb" 
                                    style={styles.loginFormTextInput} 
                                    secureTextEntry={true}
                                    onChangeText={(password) => this.setState({password})}
                                    value={this.state.password}/>
                                <Button
                                    buttonStyle={styles.loginButton}
                                    onPress={() => this.onPressLogin()}
                                    title="로그인"
                                />
                                <Button
                                    buttonStyle={styles.createAccountButton}
                                    onPress={() => this.onPressCreateAccount()}
                                    title="회원 가입"
                                    type= 'clear'
                                />
                                <Button
                                    buttonStyle={styles.fbLoginButton}
                                    onPress={() => this.onFbLoginPress()}
                                    title="페이스북으로 로그인"
                                    type= 'clear'
                                />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    }
}
