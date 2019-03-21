import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Welcome from './welcome';
import Login from './login';
import Register from './register';

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
        },
        Register: {
            screen: Register,
            navigationOptions: {
                title: '',
                headerTitleStyle: {
                    fontSize: 17,
                },
            },
        }
    }, {
            mode: 'screen',
            initialRouteName: (showWelcomeScreen)? "Welcome" : "Login"
    });
};

export default AuthStack;