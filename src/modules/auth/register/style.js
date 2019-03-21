import CONSTANTS from 'src/App.constants';
import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
	headerBar:{
		elevation: 0,
    	shadowOpacity: 0 ,
    	borderBottomWidth: 0,
    	color: '#FFF',
    	backgroundColor: CONSTANTS.COLORS.PRIMARY
	},

	content: {
		flexGrow: 1,
		paddingBottom: 0,
		paddingHorizontal: 20,
		backgroundColor: CONSTANTS.COLORS.PRIMARY
	},

	body:{
	},

	titleContainer: {
		marginTop: 30,
		marginBottom: 20
	},

	title: {
		fontSize: 24,
		color: '#fff',
		fontWeight: 'bold'
	},

	divider: {
		width: 32,
		height: 2,
		marginVertical: 10,
		backgroundColor: '#fff'
	},

	subtitle: {
		fontSize: 14,
		color: '#fff',
		fontWeight: '300'
	},

	form: {
		marginTop: 20
	},

	formHorizontal: {
		flex: 1,
		marginBottom: 30,
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'space-between',
	},

	item: {
		marginBottom: 30,
	},

	itemHorizontal: {
		flex: .5,
		marginHorizontal: 10,
	},

	label:{
		color: '#ffffff'
	},

	buttonContainer: {
		marginTop: 30,
		marginBottom: 35
	},
})

export default styles;