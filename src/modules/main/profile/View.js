import React, { Component } from 'react';

import styles from './style';
import Moment from 'react-moment';
import Main from 'src/providers/Main';
import CONSTANTS from 'src/App.constants';
import { ucFirst, isEmpty } from 'src/utils';
import SaveButton from './components/SaveButton';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import { AsyncStorage, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { ActionSheet, Button, Container, Content, Icon, Input, Item, Label, Picker, Text, Toast, Thumbnail, View } from 'native-base';

class Settings extends Component {

	state = {
		loading: false,
		isLoggedIn: false
	};

	static navigationOptions = ({ navigation }) => {
		const {params = {}} = navigation.state;

		return {
			title: 'Edit Profile',
			headerTintColor: "#fff",
			headerStyle: styles.headerBar,
			headerRight: <SaveButton onPress={params.onPress} />,
			headerLeft: <Icon style={styles.headerIcon} name="arrow-back" onPress={ () => navigation.goBack() } />,
		}
	};

	componentWillMount(){
        this.setState({
        	email: this.props.user.email,
        	phone: this.props.user.phone,
        	photo: this.props.user.photo,
        	gender: this.props.user.gender,
        	country: this.props.user.country,
			birthday: this.props.user.birthday,
        	last_name: this.props.user.last_name,
        	first_name: this.props.user.first_name,
        	address: this.props.user.address
        });
    }

    componentDidMount() {
		this.props.navigation.setParams({
	        onPress: this.onSavePress
	    });
	}

    handleInAppLink = async (obj) => {
        this.props.navigation.navigate(obj.page, obj.meta);
    }

    handleDatePicked = (date) => {
		this.setState({
			birthday: date,
			isDateTimePickerVisible: false
		});
		console.log(date)
	}

	onProfileUpdated = async  (token) => {
		if (isEmpty(token))
            throw new Error('unable to update profile');

        const  jwt_decode = require('jwt-decode');
        await AsyncStorage.setItem(CONSTANTS.CONFIG.JWT_KEY, JSON.stringify(token));
        await this.props.setUser(jwt_decode(token));
	}

	onContryPress = () => {
		const _this = this;
		const countries = require('src/assets/json/countries.json');

		var BUTTONS = [];

		for (var i = 0; i < countries.length; i++) {
			var country = countries[i];
			BUTTONS.push({text: country.name})
		}

    	ActionSheet.show({
            options: BUTTONS,
        },buttonIndex => {
        	if(isEmpty(buttonIndex))
        		return;

            _this.setState({country: countries[buttonIndex].name });
        })
	}

	onAttachButtonPress =  () => {
        
        if(this.state.loading)
            return;

        var _this = this;

        this.setState({
        	loading: true
        });

        DocumentPicker.show({
          filetype: [DocumentPickerUtil.images()],
        }, async (error,res) => {

            if(error)
                return;

            try{

                const file = {uri: res.uri, type: res.type, name: res.fileName, size: res.fileSize};

                const body = new FormData();
                body.append('photo', file);

                var result = await Main.photo(body);
                await this.onProfileUpdated(result);

                Toast.show({
		            text: "Your profile picture has been Updated!",
		            buttonText: "Okay"
		        });
            	
            	this.setState({
            		loading: false,
            		photo: file.uri,
            	});

            }catch(err){
                console.log(err);
                Toast.show({
                    text: err.message || "server error!",
                    buttonText: "Okay"
                });
                this.setState({ loading: false });
            }
            
        });
    }

    onSavePress = async () => {
    	if (this.state.loading)
            return;

        this.setState({loading: true});

        try{

            var token = await Main.update({
        		first_name: this.state.first_name,
        		last_name: this.state.last_name,
        		email: this.state.email,
	            phone: this.state.phone,
	            birthday: this.state.birthday,
	            gender: this.state.gender,
	            country: this.state.country,
	            address: this.state.address
	        });

	        await this.onProfileUpdated(token);
	        Toast.show({
	            text: "Your profile has been Updated!",
	            buttonText: "Okay"
	        });
            this.setState({loading: false});
        }catch(err){
            console.log(err);
            Toast.show({
                text: err.message || "Network Error!",
                buttonText: "Okay"
            });
            this.setState({loading: false});
        }
    }

	render() {
		return (
			<Container>
				<Content>
					<View style={styles.jumbotron}>
						<View style={styles.profile}>

							<View style={[styles.shadow, styles.profilePicture]}>
								<Thumbnail 
									large 
									defaultSource={require('src/assets/images/user.jpg')}
									source={{uri: this.state.photo}}
							    />
							</View>

				    		<View>
								<Button transparent onPress={this.onAttachButtonPress}>
									<Text style={styles.profileButton}>Edit profile photo</Text>
								</Button>
							</View>
						</View>
					</View>

					<View style={styles.form}>
						<Item stackedLabel>
							<Label>First Name</Label>
							<Input 
								placeholder="First Name"
								onChangeText={(first_name) => this.setState({first_name})}
		                        value={this.state.first_name}
			                />
			            </Item>

			            <Item stackedLabel>
							<Label>Last Name</Label>
							<Input 
								placeholder="Last Name"
								onChangeText={(last_name) => this.setState({last_name})}
		                        value={this.state.last_name}
			                />
			            </Item>


			            <Item stackedLabel>
							<Label>Email</Label>
							<Input 
								placeholder="Email"
								onChangeText={(email) => this.setState({email})}
		                        value={this.state.email}
			                />
			            </Item>

			            <Item stackedLabel>
							<Label>Phone</Label>
							<Input 
								placeholder="Phone Number"
								onChangeText={(phone) => this.setState({phone})}
		                        value={this.state.phone}
			                />
			            </Item>

			            <TouchableWithoutFeedback onPress={() => this.setState({isDateTimePickerVisible : true}) }>
							<View style={styles.listItem}>
								<Text style={styles.label}>Birthday</Text>
								<Moment 
			                        format="YYYY-MM-DD"
			                        element={({children}) => { return(<Text style={styles.value}>{children}</Text>) }} >
			                        {this.state.birthday}
			                    </Moment>
							</View>
						</TouchableWithoutFeedback>

			            <Item picker>
			            	<Picker
			            		note
								mode="dropdown"
								iosIcon={<Icon name="arrow-down" />}
								placeholder="Select your Gender"
								selectedValue={this.state.gender}
								onValueChange={(gender) => this.setState({gender})}>
								<Picker.Item label="Gender" value="" />
								<Picker.Item label="Male" value="male" />
								<Picker.Item label="Female" value="female" />
							</Picker>
						</Item>

						<Item stackedLabel>
							<Label>Address</Label>
							<Input 
								placeholder="Address"
								onChangeText={(address) => this.setState({address})}
		                        value={this.state.address}
			                />
			            </Item>

						<TouchableWithoutFeedback onPress={this.onContryPress}>
							<View style={styles.listItem}>
								<Text style={styles.label}>Country</Text>
								<Text style={styles.label}>{this.state.country || "Select Country"}</Text>
							</View>
						</TouchableWithoutFeedback>

					</View>
					
				</Content>

				<DateTimePicker
					isVisible={this.state.isDateTimePickerVisible}
					mode='date'
					onConfirm={this.handleDatePicked}
          			onCancel={() => this.setState({isDateTimePickerVisible: false})}
		        />

			</Container>
		);
	}
}

export default Settings;