import React, { Component } from 'react';

import styles from './style';
import CONSTANTS from 'src/App.constants';
import ErrorEmpty from 'src/components/ErrorEmpty';
import { Image, TouchableOpacity  } from 'react-native';
import { Button, Container,  Content, Footer, Icon, Text, View } from 'native-base';

class Home extends Component {

	state = {
		loading: false,
	};

	static navigationOptions = {
		header: null,
	};

	componentWillMount() {
    }


	componentDidMount() {
	}

	handleLoading = () => {
        this.setState(previousState => {
            return { verifying: !previousState.verifying };
        });
    }

	render() {
		return (
			<Container style={styles.container}>
				<View style={styles.header}>
					<Button transparent light>
						<Icon name="add" style={styles.headerIcon}/>
					</Button>
				</View>

				<Content padder>
					<View style={styles.titleContainer}>
						<Text style={styles.title}>Welcome</Text>
						<Text style={styles.subtitle}>Surf the world, its yours</Text>
		      		</View>

					<View style={styles.contentContainer}>
						<View>
							<View style={styles.card}>
								<ErrorEmpty title="You have no bookings!" subtitle="click the '+' icon to add one"/>
							</View>
						</View>
						
		            </View>
				</Content>

				<Footer style={styles.footer}>
					<Button transparent>
						<Icon name="settings" style={styles.footerIcon}/>
					</Button>

					<Image source={require('src/assets/images/user.jpg')} style={styles.footerThumb} />
				</Footer>
			</Container>
		);
	}
}

export default Home;