import React, { Component } from 'react';
import CONSTANTS from 'src/App.constants';
import { Container, Content, Text, View } from 'native-base';

class Home extends Component {

	state = {
		loading: false,
	};

	static navigationOptions = {
		title: 'Home',
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
			<Container>
				<Content padder>
					<View>
						<Text>Home</Text>
		            </View>
				</Content>
			</Container>
		);
	}
}

const styles = {
}

export default Home;