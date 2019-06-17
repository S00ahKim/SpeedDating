import React from 'react';
import thunk from 'redux-thunk';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers/index';
import AppNavigator from './navigation/AppNavigator';

const store = createStore(reducers, applyMiddleware(thunk));

export default class App extends React.Component {
    render() {
        return (
            <Provider store={ store }>
                <AppNavigator/>
            </Provider>
        )
    }
} 