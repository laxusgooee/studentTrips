import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Welcome from './welcome';
import Login from './login';

const AuthStack = ({showWelcomeScreen = false }) => {
    return createStackNavigator ({
        Welcome: {
            screen: Welcome,
            navigationOptions: {
                title: 'Welcome',
                header: null,
            },
        },
        Login: {
            screen: Login,
            navigationOptions: {
                title: '',
                header: null
            },
        }
    }, {
            mode: 'screen',
            //headerMode: 'none',
            initialRouteName: (showWelcomeScreen)? "Welcome" : "Login"
    });
};

export default AuthStack;