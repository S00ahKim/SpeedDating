import { connect } from 'react-redux';
import Login from './login';
import { restoreSession } from './../../reducers/session/actions';

const mapStateToProps = (state) => ({
  ...state.session,
});

const mapDispatchToProps = (dispatch) => ({
  restoreSession: () => {
    dispatch(restoreSession());
  }
});

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);
export default LoginContainer;