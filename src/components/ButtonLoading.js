import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CONSTANTS from 'src/App.constants';
import { Button, Icon } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    spinner: {
        alignItems: 'center'
    },

    button: {

    }
});

const Spinner = require('react-native-spinkit');

const Themes = {
    DARK: 'dark',
    LIGHT : 'light',
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
}

const TextColor = () =>{
    switch (theme){
        case Themes.LIGHT : 
            return CONSTANTS.COLORS.PRIMARY

        case Themes.PRIMARY : 
        case Themes.SECONDARY : 
            return '#fff'

        default:
          return CONSTANTS.COLORS.PRIMARY  
    }
}

const ButtonColor = (theme) => {

    var color = CONSTANTS.COLORS.PRIMARY;

    switch (theme){
        case Themes.LIGHT : 
            return '#fff'

        case Themes.PRIMARY : 
            return CONSTANTS.COLORS.PRIMARY

        case Themes.SECONDARY : 
            return CONSTANTS.COLORS.SECONDARY

        default:
          return CONSTANTS.COLORS.PRIMARY  
    }

    return color;
}

const Children = ({ text, theme }) => {

    return(
        <Text 
            pointerEvents='none' 
            style={{fontWeight: 'bold', color: (theme && theme == 'light')? CONSTANTS.COLORS.PRIMARY: '#fff'}}>
            {text || 'PROCEED'}
        </Text>    
    );
};

var buttonContainerMeasure = {
    width: 0,
    height: 0
};

type Props = {};
export default class ButtonLoading extends Component < Props > {

    static propTypes = {
        
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    measureView = (event) => {

        if(buttonContainerMeasure.width !== 0 || buttonContainerMeasure.height !== 0)
            return;

        buttonContainerMeasure.width = event.nativeEvent.layout.width;
        buttonContainerMeasure.height = event.nativeEvent.layout.height;
    }

    renderLoading() {

        const {color, theme} = this.props;

        return (
            <View style={{justifyContent: 'center', alignItems: 'center', height: (buttonContainerMeasure.height > 0)? buttonContainerMeasure.height : null}}>
                <Spinner style={[this.props.style, styles.spinner]} color={(color)? color : ButtonColor(theme)} type="ThreeBounce" />
            </View>
        );
    }

    renderButton() {

        const {color, theme} = this.props;

        return (
            <Button  style={[this.props.style, {backgroundColor: (color)? color : ButtonColor(theme)} ]} block={this.props.block} rounded={this.props.rounded} onPress={this.props.onPress} onLayout={(event) => this.measureView(event)}>
                {this.props.children? this.props.children : <Children text={this.props.text} theme={this.props.theme} />}
            </Button>
        )
    }

    //decide
    render() {

        if(this.props.isLoading)
            return this.renderLoading()
        else
            return this.renderButton()
    }
}