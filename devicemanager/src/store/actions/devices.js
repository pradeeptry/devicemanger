
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
    return async dispatch => {
        console.log("the differ ")
         dispatch({
            type: FETCH_DATA,
            devices: devices?devices:[],
        });
         updateDeviceList(devicesList);
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


export const addDevice = (device,oldDevices=[]) => {
    return async (dispatch) => {
        try{
        let temp =oldDevices && oldDevices.length? oldDevices.push(device):[device];
        const newDeviceData = { devices: temp, deviceList: true };
        await AsyncStorage.setItem('@DEVICES_DATA', JSON.stringify(newDeviceData));
        dispatch({
            type: ADD_DEVICE,
            devices: temp
        });
        dispatch({
            type: DEVICES_AVAILABLE,
            devicesList: true
        });
    }catch(err){
        console.log(err);
    }
    };
};


export const updateDeviceData = (deviceData, deviceID,oldDevices) => {
    return async (dispatch) => {
        let oldDeviceData = oldDevices;
        let updatedDeviceIndex = oldDeviceData.indexOf(deviceID);
        let removedData = oldDeviceData.splice(updatedDeviceIndex, 1, deviceData);

        const newDeviceData = { devices: oldDeviceData, deviceList: oldDeviceData && oldDeviceData.length > 0 ? true : false };

        await AsyncStorage.setItem('@DEVICES_DATA', JSON.stringify(newDeviceData));

        await dispatch({
            type: UPDATE_DEVICE,
            devices: oldDeviceData
        });
        updateDeviceDataStatus(true);

    };
};
const updateDeviceDataStatus = (status = false) => {
    return dispatch => {
        dispatch({
            type: UPDATE_DEVICE_DONE,
            updateDevice: status
        });
    }
}




export const removeDevice = (deviceId,oldDevices) => {
    return async (dispatch) => {
        // let temp = [...state.devices;
        const devices = [...oldDevices.filter((element) => element.id !== deviceId)];
        let deviceList = devices && devices.length > 0 ? true : false;
        const newDeviceData = { devices: devices, deviceList: deviceList };

        await AsyncStorage.setItem('@DEVICES_DATA', JSON.stringify(newDeviceData));

        dispatch({
            type: REMOVE_DEVICE,
            devices: devices
        });
        deviceRemoved(devices, deviceList);
    };
};

export const deviceRemoved = (updatedDevices = false, isEmpty = false) => {
    if (updatedDevices == false) {
        return dispatch({
            type: REMOVE_DEVICE_DONE,
            removeDevice: false,
            popUpMsg: false
        });
    } else {
        return async dispatch => {
            let popUpMsg = `Device deleted successfully!`;
            await fetch(`https://zenquotes.io/api/today`).then(res => {
                if (res.data) {
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
                } else {
                    // default msg shown
                    popUpMsg = `Device deleted successfully!`;
                }
            }).catch(error => {
                // use case we can show please check internet connection or can show custum msg
                // default msg shown
                popUpMsg = `Device deleted successfully!`;
            });
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
        }
    }

};
