import React, { Component } from "react";

import Chatroom from "../components/chatroom";

export default class ChattingScreen extends Component {
  
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <Chatroom />
    );
  }
}
