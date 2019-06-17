import { connect } from 'react-redux';
import SDroom from './sdroom';
import { loadMessages } from '../../reducers/sdroom/actions';

const mapStateToProps = (state) => ({
  ...state.sdroom,
});

const mapDispatchToProps = (dispatch) => ({
  loadMessages: () => {
    dispatch(loadMessages());
  }
});

const SDroomContainer = connect(mapStateToProps, mapDispatchToProps)(SDroom);
export default SDroomContainer;