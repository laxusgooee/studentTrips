import React, { Component } from 'react';

import styles from './style';
import Moment from 'react-moment';
import Main from 'src/providers/Main';
import Terminal from './screens/Terminal';
import Traveler from './screens/Traveler';
import CONSTANTS from 'src/App.constants';
import Modal from 'src/components/AppModal';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Button, Container, Content, Fab, Label, Icon, Item, Input, Text, Toast, View } from 'native-base';

class Book extends Component {

	state = {
		traveler_no: 1,
		terminal_to: null,
		terminal_from: null,
		departing_date: new Date(),

		terminal_toText: 'Arriving Terminal',
		terminal_fromText: 'Departure Terminal',

		loading: false,
		isLoggedIn: false,
		showDateTimePicker: false,
		showTravelersModal: false,
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

	onDatePicked = (date) => {
		this.setState({
			departing_date: date,
			showDateTimePicker: false
		});
	}

	onTravellerSelected = (number) => {
		if(number < 1)
			return;

		this.setState({
			traveler_no: number,
			showTravelersModal: false
		});
	}

	onTerminalSelected = async (terminal) => {
		var mode = this.state.terminalMode == 'from'? 'terminal_from' : 'terminal_to';
		var modeText = this.state.terminalMode == 'from'? 'terminal_fromText' : 'terminal_toText';

		await this.setState({
			[mode]: terminal.id,
			showTerminalModal: false,
			[modeText]: terminal.destination.state,
		});

		if(this.state.terminalMode == 'from'){
			//clear to
			this.setState({
				terminal_to: null,
				terminal_toText: 'Arriving Terminal',
			});
		}
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

			            <Item stackedLabel style={styles.item}>
							<Label style={styles.label}>Traveling From</Label>
							<TouchableWithoutFeedback onPress={() => this.setState({showTerminalModal : true, terminalMode: 'from'}) }>
								<Text style={styles.value}>{this.state.terminal_fromText}</Text>
							</TouchableWithoutFeedback>
			            </Item>

			            <Item stackedLabel style={styles.item}>
							<Label style={styles.label}>Traveling To</Label>
							<TouchableWithoutFeedback onPress={() => this.setState({showTerminalModal : true, terminalMode: 'to'}) }>
								<Text style={styles.value}>{this.state.terminal_toText}</Text>
							</TouchableWithoutFeedback>
			            </Item>

			            <TouchableWithoutFeedback onPress={() => this.setState({showDateTimePicker : true}) }>
							<View style={styles.listItem}>
								<Text style={styles.label}>Departing On</Text>
								<Moment 
			                        format="YYYY-MM-DD"
			                        element={({children}) => { return(<Text style={styles.value}>{children}</Text>) }} >
			                        {this.state.departing_date}
			                    </Moment>
							</View>
						</TouchableWithoutFeedback>

			            <TouchableWithoutFeedback onPress={() => this.setState({showTravelersModal : true}) }>
							<View style={styles.listItem}>
								<Text style={styles.label}>Travelers</Text>
								<Text style={styles.label}>{this.state.traveler_no} <Text style={styles.suffix}>Travelers</Text></Text>
							</View>
						</TouchableWithoutFeedback>

			        </View>
					
				</Content>

				<Fab
					containerStyle={{ backgroundColor: 'transparent' }}
					style={styles.fab}
					position="bottomRight"
					onPress={() => this.setState({ active: !this.state.active })}>
						<Icon name="arrow-forward" />
				</Fab>

				<DateTimePicker
					isVisible={this.state.showDateTimePicker}
					mode='date'
					onConfirm={this.onDatePicked}
          			onCancel={() => this.setState({showDateTimePicker: false})}
		        />

		        <Modal title="Select Terminal" style={styles.terminalModal} showFooter={false} isVisible={this.state.showTerminalModal} onClose={() => this.setState({showTerminalModal: false})}>  
					<Terminal onSelected={this.onTerminalSelected} mode={this.state.terminalMode} terminal_from={this.state.terminal_from} terminal_to={this.state.terminal_to}/>
			    </Modal>

		        <Modal full={false} showCloseButton={false} isVisible={this.state.showTravelersModal} onClose={() => this.setState({showTravelersModal: false})}>  
					<Traveler number={this.state.traveler_no} onSelected={this.onTravellerSelected} />
			    </Modal>
			</Container>
		);
	}
}

export default Book;