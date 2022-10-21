
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
import AsyncStorage from '@react-native-async-storage/async-storage';


const BASE_URL = '';

export const fetchDevicesData = (devices = false, devicesList = false) => {
    return (dispatch) => {
        console.log("the differ ")
        return dispatch({
            type: 'FETCH_DATA',
            devices: devices ? devices : [],
            devicesList: devices && devices.length ? true : false
        });

    };
};

export const updateDeviceList = (devicesList = false) => {
    return (dispatch) => {
        console.log("the dataa is in the available ")
        return dispatch({
            type: DEVICES_AVAILABLE,
            devicesList: devicesList
        });
    };
};


export const addDevice = (device) => {
    return async (dispatch) => {
        await dispatch({
            type: 'ADD_DEVICE_STATUS',
            addDeviceStatus: 'IN_PROCESS'
        });
        const newDeviceData = { devices: device, deviceList: true };
        await AsyncStorage.setItem('@DEVICES_DATA', JSON.stringify(newDeviceData));
        await dispatch({
            type: ADD_DEVICE,
            devices: device,
            devicesList: true
        });

        await dispatch({
            type: 'ADD_DEVICE_STATUS',
            addDeviceStatus: 'DONE'
        });

    };
};

export const completeDeviceAdd = () => {
    return (dispatch) => {
        dispatch({
            type: 'ADD_DEVICE_STATUS',
            addDeviceStatus: false
        });
    }
}


export const updateDeviceData = (deviceData) => {
    return async (dispatch) => {
        await dispatch({
            type: 'UPDATE_DEVICE_STATUS',
            updateDeviceStatus: 'IN_PROCESS'
        });
        const newDeviceData = { devices: deviceData, devicesList: true };
        await AsyncStorage.setItem('@DEVICES_DATA', JSON.stringify(newDeviceData));
        await dispatch({
            type: UPDATE_DEVICE,
            devices: deviceData
        });
        await dispatch({
            type: 'UPDATE_DEVICE_STATUS',
            updateDeviceStatus: 'DONE'
        });
        // updateDeviceDataStatus(true);

    };
};
export const updateDeviceDataStatus = () => {
    return dispatch => {
        dispatch({
            type: UPDATE_DEVICE_DONE,
            updateDeviceStatus: false
        });
    }
}


export const removeDeviceFromList = (devices,devicesList) => {
    return async (dispatch) => {
        // let temp = [...state.devices;
        await dispatch({
            type: REMOVE_DEVICE_DONE,
            removeDevice: true,
            popUpMsg: false
            });
        const newDeviceData = { devices: devices, deviceList: devicesList };

        await AsyncStorage.setItem('@DEVICES_DATA', JSON.stringify(newDeviceData));

        await dispatch({
            type: REMOVE_DEVICE,
            devices: devices,
            devicesList:devicesList
        });
        // deviceRemoved(true,devices, devicesList);
        let isEmpty = devices && devices.length==0 ? true : false;
        let popUpMsg = `Device deleted successfully!`;
       return await  fetch(`https://zenquotes.io/api/today`,{}).then( res => res.json()).then( res2=>{
        console.log("res2",res2);
            if (res2) {
                console.log("the response is -------",res2);
                // const {h,q} = res2[0].h;
                if (isEmpty) {
                     dispatch({
                        type: DEVICES_AVAILABLE,
                        devicesList: devicesList
                    });
                }
                return dispatch({
                    type: REMOVE_DEVICE_DONE,
                    removeDevice: true,
                    popUpMsg: {'a':res2[0]['a'],'q':res2[0].q}
                });
            } else {
                // default msg shown
                console.log("the response is ---else part ----",res2);

                popUpMsg = `Device deleted successfully!`;
            }
        }).catch(error => {
            console.log("the response is ---else part --errror --",error);

            // use case we can show please check internet connection or can show custum msg
            // default msg shown
            popUpMsg = `Device deleted successfully!`;
            if (isEmpty) {
                dispatch({
                    type: DEVICES_AVAILABLE,
                    devicesList: devicesList
                });
            }
            return dispatch({
                type: REMOVE_DEVICE_DONE,
                removeDevice: true,
                popUpMsg: popUpMsg
            });
        });
        
    };
};

export const deviceRemoved = () => {
    return (dispatch)=>{
        return dispatch({
            type: REMOVE_DEVICE_DONE,
            removeDevice: false,
            popUpMsg: false
        });
    
    }
};


