import React, {Component} from 'react';
import { createStackNavigator } from 'react-navigation';
import Book from './book';
import Home from './welcome';
import Profile from './profile';
import Settings from './settings';


const HomeStack = createStackNavigator ({
    Home: {
        screen: Home,
        navigationOptions: {},
    },
    Book: {
        screen: Book,
        navigationOptions: {},
    }
}, {
        mode: 'screen',
        initialRouteName: "Home",
        navigationOptions: {
            headerTitleStyle: {
                fontSize: 17,
            }
        },
});

const SettingsStack = createStackNavigator ({
    Settings: {
        screen: Settings,
        navigationOptions: {},
    },
    Profile: {
        screen: Profile,
        navigationOptions: {},
    },
}, {
        mode: 'screen',
        initialRouteName: "Settings",
        navigationOptions: {
            headerTitleStyle: {
                fontSize: 17,
            }
        },
});


const MainStack = createStackNavigator ({
    Home: {
        screen: HomeStack,
        navigationOptions: {},
    },
    Settings: {
        screen: SettingsStack,
        navigationOptions: {},
    },
}, {
        mode: 'screen',
        initialRouteName: "Home",
        navigationOptions: { header: null }
});

export default MainStack;