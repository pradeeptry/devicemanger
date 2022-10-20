import { TOGGLE_THEME,
    EXPORT_DEVICES_START,
    EXPORT_DEVICES_DONE,
    EXPORT_DEVICES_FAILED } from "../constants";


export const toggleThemeUI = (isDarkModeOn=false) => {
    return  dispatch => {
        return dispatch({
            type: TOGGLE_THEME,
            isDarkModeOn: isDarkModeOn,
        });
    };
};

export const exportStarted = (exportInProcess = false) => {
    return (dispatch) => {
        if (exportInProcess)
            return dispatch({
                type: EXPORT_DEVICES_START,
                exportInProcess: exportInProcess
            });
        return dispatch({
            type: EXPORT_DEVICES_START,
            exportInProcess: exportInProcess
        });
    };
};

export const exportDone = (status) => {
    return (dispatch) => {
        if (status) {
            dispatch({
                type: EXPORT_DEVICES_DONE,
                exportInProcess: false,
                exportCompleted: true
            });
        } else {
            dispatch({
                type: EXPORT_DEVICES_FAILED,
                exportCompleted: false,
                exportFailed: true
            });
        }
    };
};

