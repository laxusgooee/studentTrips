import React, {Component} from 'react';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import Home from './welcome';
import SideMenu from './common/components/SideMenu';


const HomeStack = createStackNavigator ({
    Home: {
        screen: Home,
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


const MainStack = createDrawerNavigator ({
    Home: {
        screen: HomeStack,
        navigationOptions: {
            drawerLabel: 'Home',
        },
    },
}, {
        initialRouteName: "Home",
        contentComponent: SideMenu
});

export default MainStack;