import React, { Component } from 'react';

import styles from './style';
import { isEmpty } from 'src/utils';
import Auth from 'src/providers/Auth';
import CONSTANTS from 'src/App.constants';
import ButtonLoading from 'src/components/ButtonLoading';

import { AsyncStorage, TouchableOpacity  } from 'react-native';
import { Button, Container, Content, Label, Icon, Input, Item, Text, Toast, View } from 'native-base';

const  jwt_decode = require('jwt-decode');

class Register extends Component {

	state = {
		first_name: 'frodo',
		last_name: 'baggins',
		phone: '08111111111',
		email: 'frodo@yahoo.com',
		password: '1234567890',
		matric_no: '1234567890',
	    loading: false,
	    showPassword: false,
	};

	static navigationOptions = ({ navigation }) => {
		return {
			headerTintColor: "#fff",
			headerStyle: styles.headerBar,
		}
	};

	componentDidMount(){
		
	}

	handleLoading = () => {

		this.setState(previousState => {
			return {
				loading: !previousState.loading
			};
		});
	}

	onSubmitButtonPress = async () => {
		if(this.state.loading)
			return false;

		this.handleLoading();

		try{
			var items = {
				first_name: this.state.first_name,
				last_name: this.state.last_name,
				phone: this.state.phone,
	            email: this.state.email,
	            matric_no: this.state.matric_no,
	            password: this.state.password,
	            password_confirmation: this.state.password
	        }

	        var res = await Auth.register(items);

            if (isEmpty(res))
                throw new Error('email or password incorrect');

            await AsyncStorage.setItem(CONSTANTS.CONFIG.JWT_KEY, JSON.stringify(res));
            await this.props.setUser(jwt_decode(res));

            this.handleLoading();
			
			this.props.navigation.navigate('Main');

		}catch(err){

			console.log(err.message);

			Toast.show({
                text: err.message || "unable to register",
                buttonText: "Okay"
            });
			this.handleLoading();
		}
	}

	render() {
		return (
			<Container>
				<Content contentContainerStyle={styles.content}>
					<View style={styles.body}>
						<View style={styles.titleContainer}>
							<Text style={styles.title}>Register</Text>
							<View style={styles.divider} />
							<Text style={styles.subtitle}>Provide signup details</Text>
			      		</View>


			      		<View style={styles.form}>

			      			<View style={styles.formHorizontal}>
			      			
				      			<Item floatingLabel style={styles.itemHorizontal}>
									<Label style={styles.label}>First Name</Label>
									<Input 
										onChangeText={(first_name) => this.setState({first_name})}
				                        value={this.state.first_name}
				                    />
					            </Item>

					            <Item floatingLabel style={styles.itemHorizontal}>
									<Label style={styles.label}>Last Name</Label>
									<Input 
										onChangeText={(last_name) => this.setState({last_name})}
				                        value={this.state.last_name}
				                    />
					            </Item>
					        </View>

				            <Item floatingLabel style={styles.item}>
								<Label style={styles.label}>Email</Label>
								<Input 
									onChangeText={(email) => this.setState({email})}
			                        value={this.state.email}
			                    />
				            </Item>

				            <Item floatingLabel style={styles.item}>
								<Label style={styles.label}>Phone</Label>
								<Input 
									onChangeText={(phone) => this.setState({phone})}
			                        value={this.state.phone}
			                    />
				            </Item>

				            <Item floatingLabel style={styles.item}>
								<Label style={styles.label}>Matric Number</Label>
								<Input 
									onChangeText={(matric_no) => this.setState({matric_no})}
			                        value={this.state.matric_no}
			                    />
				            </Item>

				            <Item floatingLabel style={styles.label}>
								<Label style={styles.label}>Password</Label>
								<Input 
									secureTextEntry={!this.state.showPassword}
									onChangeText={(password) => this.setState({password})}
			                        value={this.state.password}
			                    />
			                    <Icon 
			                    	active 
			                    	name={this.state.showPassword? 'eye' : 'eye-off' }
			                    	style={styles.label} 
			                    	onPress={() => this.setState({showPassword : !this.state.showPassword})} 
			                    />
				            </Item>

				            <View style={styles.buttonContainer}>
					            <ButtonLoading rounded theme="light" block isLoading={this.state.loading} onPress={this.onSubmitButtonPress}>
									<Text style={{color: 'black'}}>Sign In</Text>
								</ButtonLoading>
							</View>
			      		</View>
			      	</View>
				</Content>
			</Container>
		);
	}
}

export default Register;