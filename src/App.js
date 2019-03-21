import React, { Component } from 'react';

import { Root } from 'native-base';
import Navigation from './App.routes';
import { Provider } from 'react-redux';
import CONSTANTS from './App.constants';
import { AsyncStorage } from 'react-native';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'

type Props = {};
export default class App extends Component < Props > {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            isLoaded: false
        };
    }

    componentDidMount() {
    }

    renderInitialView() {

        const AppNavigation = Navigation({loggedIn: this.state.isLoggedIn});
        return <AppNavigation />
    }

    render() {

        return (
            <Root>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        {this.renderInitialView()}
                    </PersistGate>
                </Provider>
            </Root>
        );
    }
}