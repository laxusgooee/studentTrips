import React, { Component } from 'react';
import CONSTANTS from 'src/App.constants';
import { ucFirst, isEmpty } from 'src/utils';
import Loader from 'src/components/Loader';
import Bookings from 'src/providers/Bookings';
import SearchBox from 'src/components/SearchBox';
import ErrorEmpty from 'src/components/ErrorEmpty';
import ErrorNetwork from 'src/components/ErrorNetwork';
import ButtonLoading from 'src/components/ButtonLoading';
import { Button,  Icon, Text, Toast, View } from 'native-base';
import { AsyncStorage, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const TerminalItem = ({terminal, onPress}) => {
    return (
        <TouchableOpacity onPress={() => onPress(terminal)}>
            <View style={styles.terminalItem}>
                <Text style={styles.terminalItemText}>{ucFirst(terminal.destination.state)} -> {ucFirst(terminal.name)}</Text>
            </View>
        </TouchableOpacity>
    );
}

//main class
export default class Terminal extends Component {

    state = {
        loading: true,
        terminals: [],
        loadingError: false,

        page: 1,
        page_cnt: 0,
        ignore_ids : [],
        terminals_holder: []
    };

    async componentWillMount(){
        await this.setState({ 
            mode: this.props.mode,
            terminal_to: this.props.terminal_to,
            terminal_from: this.props.terminal_from
        });
        this.loadPage();
    }

    loadPage = async () => {
        try{
            var res = await Bookings.terminals({
                mode: this.state.mode,
                page: this.state.page, 
                ignore: this.state.ignore_ids,
                terminal: this.state.mode == 'from'? null : this.state.terminal_from
            });

            var terminals = this.state.terminals.slice();

            this.setState({
                loading: false,
                loadingMore: false,
                loadingError: false,
                terminals: terminals.concat(res.data),
                page: (this.state.page + 1),
                page_cnt: (this.state.page_cnt + res.data.length)
            });
            

        }catch(err){
            console.log(err)
            this.setState({loading: false, loadingError: true});
        }
    }

    onSearchChangeText = async (q) => {

        if(q.length < 2){
            this.setState({ loading: false });

            //if user clears text
            if(this.state.q.length > 0){
                this.setState({
                    terminals: [...this.state.terminals_holder]
                });
            }
            return;
        }

        this.setState({ loading: true, q: q });

        try{
            res = await Bookings.terminals({ q: q, limit: 50 });

            if(this.state.terminals_holder.length < 1)
                this.setState({
                    terminals_holder: [...this.state.terminals]
                });

            this.setState({
                terminals: res.data
            });

            this.setState({ loading: false });

        }catch(err){
            console.log(err);
            this.setState({ loading: false });
        }
    }

    onSearchCancel = async () => {

        this.setState({ loading: false, q: '', terminals: [...this.state.terminals_holder] });
    }

    onSubmitPress = async (item) => {
        if (this.state.loading)
            return;

        await this.props.onSelected(item);
    }

    render() {

        return (
            <View style={styles.content}>
                <View style={styles.searchContainer}>
                    <SearchBox value={this.state.q} style={styles.searchbox} onChangeText={this.onSearchChangeText} onCancel={this.onSearchCancel}/>
                </View>

                {this.state.loadingError && <ErrorNetwork style={styles.networkError} onPress={this.loadPage}/>}

                {this.state.loading && <Loader style={styles.loader}/>}
                
                <View style={styles.terminalsContainer}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.terminals}
                        renderItem={({item, index}) => <TerminalItem terminal={item} onPress={this.onSubmitPress}/>}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
    },

    searchContainer:{
        paddingTop: 5,
        paddingBottom: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: CONSTANTS.COLORS.PRIMARY
    },

    searchbox: {
        borderColor: CONSTANTS.COLORS.PRIMARY
    },

    loader: {
        alignSelf: 'center'
    },

    terminalsContainer: {
        marginTop: 10,
        marginBottom: 20
    },

    terminalItem: {
        marginBottom: 5,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },

    terminalItemText: {
        fontSize: 18,
    },

    networkError: {
        marginTop: 30,
    },
});