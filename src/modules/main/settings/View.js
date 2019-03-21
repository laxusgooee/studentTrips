import React, { Component } from 'react';

import styles from './style';
import CONSTANTS from 'src/App.constants';
import Modal from 'src/components/AppModal';
import { ucFirst, isEmpty } from 'src/utils';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Container, Content, Icon, Text, Thumbnail, View } from 'native-base';

class Settings extends Component {

	state = {
		loading: false,
		isLoggedIn: false
	};

	static navigationOptions = ({ navigation }) => {
		return {
			title: '',
			headerTintColor: "#fff",
			headerStyle: styles.headerBar,
			headerLeft: <Icon style={styles.headerIcon} name="arrow-back" onPress={ () => navigation.goBack() } />,
		}
	};

	componentWillMount(){
        this.setState({
        	isLoggedIn: !isEmpty(this.props.user.email)
        });
    }

    handleInAppLink = async (obj) => {
        this.props.navigation.navigate(obj.page, obj.meta);
    }


    _renderHeader = () => {
    	if(!this.state.isLoggedIn){
    		return(
    			<View>
    				<Text style={styles.profileTitle}>You are not logged In</Text>
					<TouchableOpacity onPress={ () => this.props.navigation.navigate('Auth') }>
						<Text style={styles.profileButton}>log in to enjoy the most of loversify</Text>
					</TouchableOpacity>
    			</View>
    		);
    	}


    	return(
    		<View style={styles.profile}>
	    		<View>
					<Text style={styles.profileTitle}>{this.props.user.first_name} {this.props.user.last_name}</Text>
					<TouchableOpacity onPress={ () => this.props.navigation.navigate('Profile') }>
						<Text style={styles.profileButton}>view and edit profile</Text>
					</TouchableOpacity>
				</View>

				<View style={[styles.shadow, styles.profilePicture]}>
					<Thumbnail 
						large 
						source={{uri: this.props.user.photo}}
						defaultSource={require('src/assets/images/user.jpg')}
				    />
				</View>
			</View>
    	);
    }


	render() {
		return (
			<Container>
				<Content>
					<View style={styles.jumbotron}>
						{this._renderHeader()}
					</View>

					<View style={styles.links}>
						
						<TouchableOpacity onPress={() => this.props.navigation.navigate("Notifications")}>
							<View style={styles.item}>
								<Text style={styles.itemText}>Notifications</Text>
								<Icon name="notifications" style={styles.itemIcon} />
							</View>
						</TouchableOpacity>

						<TouchableOpacity onPress={() => this.props.navigation.navigate("Contact")}>
							<View style={styles.item}>
								<Text style={styles.itemText}>Contact Us</Text>
								<Icon name="call" style={styles.itemIcon} />
							</View>
						</TouchableOpacity>

						<TouchableOpacity onPress={() => this.props.navigation.navigate("Help")}>
							<View style={styles.item}>
								<Text style={styles.itemText}>Help and Feedback</Text>
								<Icon name="help-buoy" style={styles.itemIcon}/>
							</View>
						</TouchableOpacity>	

						{this.state.isLoggedIn &&
							<TouchableOpacity onPress={() => this.setState({showDeleteAccountModal: true})}>
								<View style={styles.item}>
									<Text style={styles.itemText}>Delete my Account</Text>
									<Icon name="trash" style={styles.itemIcon} />
								</View>
							</TouchableOpacity>
						}

					</View>
				</Content>
			</Container>
		);
	}
}

export default Settings;