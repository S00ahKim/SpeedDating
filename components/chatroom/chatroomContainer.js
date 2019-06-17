import { connect } from 'react-redux';
import Chatroom from './chatroom';
import { loadMessages } from '../../reducers/chatroom/actions';

const mapStateToProps = (state) => ({
  ...state.chatroom,
});

const mapDispatchToProps = (dispatch) => ({
  loadMessages: () => {
    dispatch(loadMessages());
  }
});

const ChatroomContainer = connect(mapStateToProps, mapDispatchToProps)(Chatroom);
export default ChatroomContainer;