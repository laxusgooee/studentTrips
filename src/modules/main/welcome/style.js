import CONSTANTS from 'src/App.constants';
import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
	container: {
		backgroundColor: CONSTANTS.COLORS.PRIMARY
	},

	content: {
		flexGrow: 1,
		paddingBottom: 0,
		paddingHorizontal: 20,
		backgroundColor: CONSTANTS.COLORS.PRIMARY
	},

	header:{
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
	},

	headerIcon: {

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

	subtitle: {
		fontSize: 14,
		color: '#fff',
		fontWeight: '300'
	},

	contentContainer: {
		marginTop: 20,
		marginHorizontal: 10,
	},

	card: {
		borderRadius: 8,
		overflow: 'hidden',
		borderColor: CONSTANTS.COLORS.SECONDARY
	},

	footer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: 5,
		paddingBottom: 8,
		paddingHorizontal: 10,
		backgroundColor: '#ffffff',
		justifyContent: 'space-between',
	},

	footerIcon: {
		fontSize: 16,
		color: '#000000'
	},

	footerThumb: {
		width: 44,
		height: 44,
		borderWidth: 1,
		borderRadius: 22,
		borderColor: CONSTANTS.COLORS.PRIMARY
	}

})

export default styles;