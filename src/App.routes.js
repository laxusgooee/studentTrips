import { createSwitchNavigator } from 'react-navigation';
import NavigationAuth from './modules/auth';
import NavigationMain from './modules/main';


export default ({firstTime, loggedIn }) => {
	return createSwitchNavigator(
	  {
	    Auth: NavigationAuth({showWelcomeScreen : firstTime}),
	    Main: NavigationMain
	  },
	  {
	    initialRouteName: loggedIn? "Main" : "Auth"
	  }
	);
}