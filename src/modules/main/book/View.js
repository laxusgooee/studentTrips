import React, { Component } from 'react';

import styles from './style';
import Main from 'src/providers/Main';
import CONSTANTS from 'src/App.constants';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Button, Container, Content, Fab, Label, Icon, Item, Input, Text, Toast, View } from 'native-base';

class Book extends Component {

	state = {
		loading: false,
		isLoggedIn: false
	};

	static navigationOptions = ({ navigation }) => {
		const {params = {}} = navigation.state;

		return {
			title: '',
			headerTintColor: "#fff",
			headerStyle: styles.headerBar,
			headerLeft: <Icon style={styles.headerIcon} name="arrow-back" onPress={ () => navigation.goBack() } />,
		}
	};

	componentWillMount(){
        this.setState({
        	
        });
    }

    componentDidMount() {
		
	}

	render() {
		return (
			<Container style={{ backgroundColor: '#ccc' }}>
				<View style={styles.jumbotron}>
					<View style={styles.titleContainer}>
						<View style={{flexDirection: 'row'}}>
							<Icon name="bus" style={styles.titleIcon} /> 
							<Text style={styles.title}>Book Ticket</Text>
						</View>
						<Text style={styles.subtitle}>we need this information for a seamless service</Text>
					</View>
				</View>
				<Content style={styles.content}>
					<View style={styles.form}>

			            <Item floatingLabel style={styles.item}>
							<Label style={styles.label}>Email</Label>
							<Input 
								onChangeText={(email) => this.setState({email})}
		                        value={this.state.email}
		                    />
			            </Item>

			        </View>
					
				</Content>

				<Fab
					containerStyle={{ backgroundColor: 'transparent' }}
					style={styles.fab}
					position="bottomRight"
					onPress={() => this.setState({ active: !this.state.active })}>
						<Icon name="arrow-forward" />
				</Fab>

			</Container>
		);
	}
}

export default Book;