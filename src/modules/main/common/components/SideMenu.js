import PropTypes from 'prop-types';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {View} from 'react-native';
import CONSTANTS from 'src/App.constants';


const styles = {
    
};

class SideMenu extends Component {

    //routeHandler
    navigateToScreen = (route) => () => {

        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    }

    closeDrawer = () => {
        this.props.navigation.navigate('DrawerClose');
    }

    render () {
        return (
            <View>
                
            </View>
        );
    }
}

SideMenu.propTypes = {
    navigation: PropTypes.object
};

const mapStateToProps = state => {
    return {};
};

export default connect(mapStateToProps, null)(SideMenu);