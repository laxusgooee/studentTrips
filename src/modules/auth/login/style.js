import CONSTANTS from 'src/App.constants';
import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
	content: {
		flex: 1,
		flexGrow: 1,
		paddingBottom: 0,
		paddingHorizontal: 20,
	},

	background:{
		position: 'absolute',
	    top: 100,
	    right: 0,
	    bottom: 0,
	},

	body:{
		flex: .9,
		marginBottom: 50,
		alignItems: 'stretch',
		justifyContent: 'flex-end',
	},

	titleContainer: {
		marginTop: 30,
		marginBottom: 20
	},

	title: {
		fontSize: 24,
		color: '#000',
		fontWeight: 'bold'
	},

	divider: {
		width: 32,
		height: 2,
		marginVertical: 10,
		backgroundColor: '#ccc'
	},

	subtitle: {
		fontSize: 14,
		color: '#212121',
		fontWeight: '300'
	},

	footer: {
		flex: .1,
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'center',
	},

	form: {
		marginTop: 20
	},

	item: {
		marginBottom: 30,
	},

	label:{
		color: '#000'
	},

	fpContainer: {
		marginTop: 15,
		paddingHorizontal: 10,
	},

	fpText: {
		fontSize: 9,
		color: CONSTANTS.COLORS.SECONDARY,
	},

	buttonContainer: {
		marginTop: 5,
		marginBottom: 30
	},

	footerText: {
		fontSize: 12,
		color: '#000'
	},

	footerLink: {
		fontSize: 13,
		fontWeight: 'bold',
		color: CONSTANTS.COLORS.SECONDARY
	}
})

export default styles;