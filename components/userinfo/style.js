const React = require("react-native");

const { StyleSheet } = React;
const offset = 16;

export default {
      title: {
        marginTop: offset,
        marginLeft: offset,
        fontSize: offset,
        fontWeight: 'bold',
      },
      alertmsg:{
        backgroundColor: '#5C7CB5',
        marginTop: offset,
        marginLeft: offset,
        marginRight: offset,
        fontSize: offset,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 8,
      },
      nameInput: {
        height: offset * 2,
        margin: offset,
        paddingHorizontal: offset,
        borderColor: '#111111',
        borderWidth: 1,
        fontSize: offset,
      },
      pickerelement:{
        height: offset * 2,
        margin: offset,
        paddingHorizontal: offset,
        borderColor: '#111111',
        borderWidth: 1,
      },
      caButton: {
        backgroundColor: '#5C7CB5',
        borderRadius: 5,
        height: 45,
        paddingLeft: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        marginBottom: 5,
      },
      containerView: {
        flex: 1,
        },
        caScreenContainer: {
            flex: 1,
        },
        caFormView: {
            flex: 1
        },
        caFormTextInput: {
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
        title: {
            marginTop: offset,
            marginLeft: offset,
            fontSize: offset,
        },
        imagetitle: {
            marginTop: 30,
            textAlign: 'center',
            fontSize: offset,
            marginBottom: 5,
        },
        imagealign: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        imagestyle: {
          borderRadius: 400/ 2,
          height: offset*8,
          width: offset*8,
        },
        nameInput: {
            height: offset * 2,
            margin: offset,
            paddingHorizontal: offset,
            borderColor: '#111111',
            borderWidth: 1,
            fontSize: offset,
        },
}