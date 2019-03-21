import { combineReducers } from 'redux'
import AuthStateReducer from '../modules/auth/store';
import MainStateReducer from '../modules/main/store';

export default combineReducers({
  AuthStateReducer,
  MainStateReducer
})