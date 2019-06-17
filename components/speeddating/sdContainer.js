import { connect } from 'react-redux';
import SpeedDating from './speeddating';
import { loadMessages, putMessage } from '../../reducers/speedDating/actions';

const mapStateToProps = (state) => ({
  ...state.sdchat,
});

const mapDispatchToProps = (dispatch) => ({
  loadMessages: () => {
    dispatch(loadMessages());
  },
  putMessage: (message, user) => {
    dispatch(putMessage(message, user));
  },
});

const SDContainer = connect(mapStateToProps, mapDispatchToProps)(SpeedDating);
export default SDContainer;