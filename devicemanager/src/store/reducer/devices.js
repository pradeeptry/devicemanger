import {
    FETCH_DATA,
    ADD_DEVICE,
    ADD_DEVICE_DONE,
    REMOVE_DEVICE,
    REMOVE_DEVICE_DONE,
    DEVICES_AVAILABLE,
    FETCH_MORE_DATA,
    UPDATE_DEVICE_DONE,
    UPDATE_DEVICE
} from '../constants';


const initialState = {
    devices: [],
    isDarkModeOn: false,
    devicesList: false,
    isLoadMore: false,
    updateDevice:false,
    addDevice:false,
    removeDevice:false,
    popUpMsg:false,
    isDashboard:false,
    addDeviceStatus:false,
    updateDeviceStatus:false
}

export default (state = initialState, action) => {
    console.log(action.type);
    switch (action.type) {
        case 'FETCH_DATA':
            console.log("the data is ",action.devices);
            return { ...state, devices: action.devices };
        case 'ADD_DEVICE':
            console.log("the action is 5",action);
            return { ...state, devices: action.devices,devicesList:action.devicesList }

        case 'ADD_DEVICE_STATUS':
            console.log("the action is 5",action);

            return { ...state,   addDeviceStatus: action.addDeviceStatus}

            case 'UPDATE_DEVICE':
                return { ...state, devices: action.devices }

            case 'UPDATE_DEVICE_STATUS':
                return { ...state, updateDeviceStatus:action.updateDeviceStatus}

        case REMOVE_DEVICE:
            return {
                ...state,
                devices: action.devices,devicesList:action.devicesList
            }

        case REMOVE_DEVICE_DONE:
            return {
                ...state,
                removeDevice: action.removeDevice,
                popUpMsg:action.popUpMsg
            }

        case 'DEVICES_AVAILABLE':
            return { ...state, devicesList: action.devicesList }

        case FETCH_MORE_DATA:
            return { ...state, devices: action.devices, isLoadMore: false }

        default:
            return state;
    }
};