import { connect } from 'react-redux';
import SpeedDating from './speeddating';
import { loadMessages, putMessage } from '../../reducers/speedDating/actions';

const mapStateToProps = (state) => ({
  ...state.sdchat,
});

const mapDispatchToProps = (dispatch) => ({
  loadMessages: (address) => {
    dispatch(loadMessages(address));
  },
  putMessage: (message, user, address) => {
    dispatch(putMessage(message, user, address));
  },
});

const SDContainer = connect(mapStateToProps, mapDispatchToProps)(SpeedDating);
export default SDContainer;