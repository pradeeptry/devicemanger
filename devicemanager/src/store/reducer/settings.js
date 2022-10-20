import {TOGGLE_THEME,
    EXPORT_DEVICES_START,
    EXPORT_DEVICES_DONE,
    EXPORT_DEVICES_FAILED } 
    from '../constants';


const initialState = {
    theme: 'light',// 'dark'
    exportFailed:false,
    exportInProcess:false,
    exportCompleted:false,
    isDarkModeOn:false
  }
  
  export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return { ...state, isDarkModeOn: action.isDarkModeOn,theme:action.isDarkModeOn?'dark':'light'}
      case EXPORT_DEVICES_START:
      return { ...state, exportInProcess:action.exportInProcess }
      case EXPORT_DEVICES_DONE:
        return { ...state, exportCompleted: true,exportInProcess:false }
      case EXPORT_DEVICES_FAILED:
        return { ...state, exportFailed:true,exportCompleted:false }
      default:
        return state;
    }
  };