import CONSTANTS from 'src/App.constants';
import { REHYDRATE } from 'redux-persist';


//initial state
const initialState = {
	persisted: false,

	first_name: '',
	last_name: '',
	phone: '',
	email: '',
	photo: '',

};

//actions
export const setUser = (payload) => {
    return {
        type: CONSTANTS.ACTIONS.CREATE_USER,
        payload: payload,
    };
};

export const clearUser = (payload) => {
    return {
        type: 'LOGOUT',
        payload: payload,
    };
};



//reducer
const MainStateReducer = (state= initialState, action) => {
  switch(action.type) {

  	/*case REHYDRATE:
  	  return {
        ...state,
        persistTest: action.payload.MainStateReducer.persistTest
      };*/

    case 'LOGOUT' : 
      return {
        ...state,
        city: '',
        phone: '',
        email: '',
        photo: '',
        gender: '',
        address: '',
        country: '',
        birthday: '',
        last_name: '',
        first_name: '',
      }

    case CONSTANTS.ACTIONS.CREATE_USER : 
      return {
        ...state,
        city: action.payload.city,
        phone: action.payload.phone,
        email: action.payload.email,
        photo: action.payload.photo,
        gender: action.payload.gender,
        address: action.payload.address,
        country: action.payload.country,
        birthday: action.payload.birthday,
        last_name: action.payload.last_name,
        first_name: action.payload.first_name
      }

    default:
      return state
  }
}

export default MainStateReducer;