import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage'

const DEVICE_DATA = 'DEVICE_DATA';
const LOGOUT = 'LOGOUT';

const initialAuthState = {isLoggedIn: false};

export const fetch = (devices) => ({
  type: DEVICE_DATA,
  devices,
});



function auth(state = initialAuthState, action) {
  switch (action.type) {
    case DEVICE_DATA:
      return {...state, isLoggedIn: true, devices:action.devices};
    default:
      return state;
  }
}

const AppReducer = combineReducers({
  auth,
});

export default AppReducer;
