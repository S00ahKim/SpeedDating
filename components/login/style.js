const React = require("react-native");

const { StyleSheet } = React;

export default {

containerView: {
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: 'white',
},
loginScreenContainer: {
  flex: 1,
},
logo:{
  flex: 1,
  justifyContent: 'flex-end',
  alignItems: 'center',
  marginBottom: 30
},
loginFormView: {
  flex: 1.5
},
loginFormTextInput: {
  height: 43,
  fontSize: 14,
  borderRadius: 5,
  borderWidth: 1,
  borderColor: '#eaeaea',
  backgroundColor: '#fafafa',
  paddingLeft: 10,
  marginLeft: 15,
  marginRight: 15,
  marginTop: 5,
  marginBottom: 5,

},
loginButton: {
  backgroundColor: '#5C7CB5',
  borderRadius: 5,
  height: 45,
  paddingLeft: 10,
  marginLeft: 15,
  marginRight: 15,
  marginTop: 5,
  marginBottom: 5,
},
createAccountButton: {
  borderRadius: 5,
  height: 45,
  paddingLeft: 10,
  marginLeft: 15,
  marginRight: 15,
  marginTop: 5,
  marginBottom: 5,
},
};