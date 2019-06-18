import React, { PropTypes, Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  Image,
  AsyncStorage,
  Keyboard, TextInput, Alert, KeyboardAvoidingView
} from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

import styles from './style';
import { Icon } from 'react-native-elements'

import {firebaseSvc, firebaseBasic} from '../../FirebaseSvc';

class Login extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        email: '',
        password: '',
    };

    componentDidMount() {
        const { restoreSession } = this.props;
        restoreSession();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.successSignin) {
            this
            .props
            .navigation
            .navigate('App');
        }
    }

    onPressLogin = async () => {
        const user = {
            email: this.state.email,
            password: this.state.password,
        };
        firebaseBasic.login(user, this.loginSuccess, this.loginFailed);
    };

    onPressCreateAccount = async () => {
        this.props.navigation.navigate('CreateAccount')
    };

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
                <View style={styles.loginScreenContainer}>
                    <View style={styles.logo}>
                        <Image
                            source={require('../../assets/images/bluelogo.png')}
                            style={{ 
                                height: 90, 
                                alignItems: 'center',
                            }}
                            resizeMode={'contain'}
                        />
                    </View>
                    <View style={styles.loginFormView}>
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
                            title="아직 SpeedDating의 회원이 아니세요?"
                            type= 'clear'
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}


export default Login;