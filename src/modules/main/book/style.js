import CONSTANTS from 'src/App.constants';
import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
	headerBar:{
    	elevation: 0,
    	color: '#FFF',
    	shadowOpacity: 0 ,
    	borderBottomWidth: 0,
    	backgroundColor: CONSTANTS.COLORS.PRIMARY
	},

	headerIcon:{
		marginHorizontal: 20,
		fontSize: 19,
    	color: '#ffffff',
	},

	jumbotron: {
		top: 0,
		left: 0,
		right: 0,
		height: 150,
		position: 'absolute',
		paddingTop: 10,
		marginBottom: 10,
		paddingHorizontal: 20,
		backgroundColor: CONSTANTS.COLORS.PRIMARY
	},

	titleContainer: {
		marginTop: 10,
		marginBottom: 50
	},

	titleIcon: {
		color: '#fff',
		marginRight: 15,
	},

	title: {
		fontSize: 24,
		color: '#fff',
		fontWeight: 'bold'
	},

	subtitle: {
		fontSize: 14,
		color: '#fff',
		fontWeight: '300'
	},

	content: {
		marginTop: 100,
	},

	form: {
		marginTop: 20,
		paddingVertical: 20,
		marginHorizontal: 10,
		paddingHorizontal: 10,
		backgroundColor: '#fff'
	},

	item: {
		marginBottom: 30,
	},

	label:{
		color: '#000'
	},

	fab: {
		backgroundColor: CONSTANTS.COLORS.SECONDARY
	},

});

export default styles;
