import React, { Component } from 'react';

import { Root } from 'native-base';
import Navigation from './App.routes';
import { Provider } from 'react-redux';
import CONSTANTS from './App.constants';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ActivityIndicator, AsyncStorage, View, Text } from 'react-native';



const  jwt_decode = require('jwt-decode');

type Props = {};
export default class App extends Component < Props > {

    constructor(props) {
        super(props);
        this.state = {
            isFirstTime: false,
            isLoggedIn: false,
            isLoaded: false
        };
    }

    componentDidMount() {
        AsyncStorage.getItem(CONSTANTS.CONFIG.JWT_KEY).then( async (data) => {

            token = JSON.parse(data);

            if(!token){
                this.setState({ isLoggedIn: false });
                return;
            }

            var user = jwt_decode(token);

            store.dispatch({
                type: CONSTANTS.ACTIONS.CREATE_USER,
                payload: user
            });

            this.setState({ isLoggedIn: true });   
        }).done(() => {
            this.setState({ isLoaded: true });
        });
    }

    componentWillUnmount() {}

    renderInitialView() {

        if(!this.state.isLoaded)
            return <Loading size="large" subtitle="take a chill pill" />;

        const AppNavigation = Navigation({loggedIn: this.state.isLoggedIn, firstTime: this.state.isFirstTime});
        return <AppNavigation />
    }

    render() {

        return (
            <Root>
                <Provider store={store}>
                    <PersistGate loading={<Loading />} persistor={persistor}>
                        {this.renderInitialView()}
                    </PersistGate>
                </Provider>
            </Root>
        );
    }
}

const Loading = ({subtitle = ''}) => {
    return(
        <View 
            style={{backgroundColor: CONSTANTS.COLORS.PRIMARY, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size={'large'} />
                <Text style={{color: '#fff', marginTop: 10}}>Hold on, we are brewing your data</Text>
                <Text style={{color: '#fefefe', marginTop: 5, fontSize: 12}}>{subtitle}</Text>
            </View>
        </View>
    );
}