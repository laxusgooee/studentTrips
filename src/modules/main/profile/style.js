import CONSTANTS from 'src/App.constants';
import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
	shadow:{
		shadowOffset: { width: 0, height: 4 },
	    shadowOpacity: 0.8,
	    shadowRadius: 4,
	    elevation: 1,
	    shadowColor: '#000'
	},

	headerBar:{
    	color: '#ffffff',
    	backgroundColor: CONSTANTS.COLORS.PRIMARY
	},

	headerIcon:{
		marginHorizontal: 20,
		fontSize: 19,
    	color: '#ffffff',
	},

	jumbotron: {
		marginTop: 20,
		marginBottom: 10,
		marginHorizontal: 20,
	},

	profile: {
		alignItems: 'center',
		justifyContent: 'center'
	},

	profileTitle: {
	},

	profileButton: {
		fontSize: 14,
		color: '#C4C4C4'
	},

	profilePicture: {

	},

	form: {
		marginTop: 20,
		marginBottom: 30,
		paddingHorizontal: 20,
	},



	listItem: {
		flexDirection: 'row',
		paddingVertical: 15,
		paddingHorizontal: 10,
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#cecece',
		justifyContent: 'space-between'
	},

	label: {
		fontSize: 14,
		color: '#2a2a2a'
	},

	value: {
		fontSize: 16,
	}
});

export default styles;
