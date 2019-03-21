import React, { Component } from 'react';
import { Auth } from 'src/providers';
import CONSTANTS from 'src/App.constants';
import { Container, Content, Text, View } from 'native-base';

class Login extends Component {

	state = {
	    loading: false
	};

	static navigationOptions = {
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

    onSubmit = async () => {
    }

	render() {
		return (
			<Container>
				<Content padder>
					<View>
						<Text>Login</Text>
		            </View>
				</Content>
			</Container>
		);
	}
}

const styles = {
}

export default Login;