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
		elevation: 0,
    	shadowOpacity: 0 ,
    	borderBottomWidth: 0,
    	color: '#000',
    	backgroundColor: '#fff'
	},

	headerIcon:{
		marginHorizontal: 20,
		fontSize: 19,
    	color: '#000',
	},

	jumbotron: {
		marginTop: 20,
		marginBottom: 10,
		marginHorizontal: 20,
	},

	profile: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},

	profileTitle: {
		fontSize: 19,
		fontWeight: 'bold',
		textTransform: 'capitalize',
		color: CONSTANTS.COLORS.PRIMARY
	},

	profileButton: {
		fontSize: 14,
		color: '#C4C4C4'
	},

	profilePicture: {

	},

	links: {
		marginTop: 20,
		marginHorizontal: 20,
	},

	item: {
		marginTop: 10,
		paddingVertical: 10,
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderColor: '#E5E5E5',
		justifyContent: 'space-between'
	},

	itemText: {
		fontSize: 18,
		color: '#000000'
	},

	itemIcon: {
		fontSize: 18,
		color: '#838282'
	},
});

export default styles;
