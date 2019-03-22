import React, { Component } from 'react';
import CONSTANTS from 'src/App.constants';
import { isEmpty } from 'src/utils';
import { Button,  Icon, Text, Toast, View } from 'native-base';
import { AsyncStorage, FlatList, StyleSheet, TouchableOpacity } from 'react-native';


export default class Terminal extends Component {

    state = {
        number: 1,
    };

    componentWillMount(){
        if(this.props.number)
            this.setState({number: this.props.number});
    }

    onAddPress = () => {
        var number = this.state.number + 1;

        this.setState({number});
    }

    onRemovePress = () => {
        var number = this.state.number - 1;

        if(number < 1){

            return;
        }

        this.setState({number});
    }

    onSubmitPress = async () => {
        if (this.state.loading)
            return;

        await this.props.onSelected(this.state.number);
    }

    render() {

        return (
            <View style={styles.content}>
                <View>
                    <View style={styles.group}>
                        <Button transparent onPress={this.onRemovePress}>
                            <Icon name="remove" style={styles.icon} />
                        </Button>
                        <Text style={styles.number}>{this.state.number}</Text>
                        <Button transparent onPress={this.onAddPress}>
                            <Icon name="add" style={styles.icon} />
                        </Button>
                    </View>
                    <View style={styles.button}>
                        <Button transparent onPress={this.onSubmitPress}>
                            <Text style={styles.submit}>OK</Text>
                        </Button>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        paddingBottom: 0,
        paddingHorizontal: 15,
        backgroundColor: '#FFFFFF'
    },

    group: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 8,
        paddingHorizontal: 10,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },

    icon: {
        fontSize: 18,
    },

    number: {
        paddingHorizontal: 10,
        fontSize: 24,
    },

    button: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },

    submit: {
       color: CONSTANTS.COLORS.PRIMARY
    }
});