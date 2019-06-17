import { connect } from 'react-redux';
import Chat from './chat';
import { loadMessages, putMessage } from '../../reducers/chat/actions';

const mapStateToProps = (state) => ({
  ...state.chat,
});

const mapDispatchToProps = (dispatch) => ({
  loadMessages: (address) => {
    dispatch(loadMessages(address));
  },
  putMessage: (message, user, address) => {
    dispatch(putMessage(message, user, address));
  },
});

const ChatContainer = connect(mapStateToProps, mapDispatchToProps)(Chat);
export default ChatContainer;