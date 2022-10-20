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
    isDashboard:false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA:
            console.log("the data is ",action.devices);
            return { ...state, devices: action.devices,isDashboard:true }
        case ADD_DEVICE:
            console.log("the action is 5",action);
            return { ...state, devices: action.devices }

        case ADD_DEVICE_DONE:
            return { ...state, addDevice: action.addDevice }

            case UPDATE_DEVICE:
                return { ...state, devices: action.devices?action.devices:[] }

            case UPDATE_DEVICE_DONE:
                return { ...state, updateDevice: action.updateDevice }

        case REMOVE_DEVICE:
            return {
                ...state,
                devices: action.devices?action.devices:[],
            }

        case REMOVE_DEVICE_DONE:
            return {
                ...state,
                removeDevice: action.removeDevice
            }

        case DEVICES_AVAILABLE:
            return { ...state, devicesList: action.devicesList }

        case FETCH_MORE_DATA:
            return { ...state, devices: action.devices, isLoadMore: false }

        default:
            return state;
    }
};