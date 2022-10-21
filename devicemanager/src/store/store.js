import { legacy_createStore as createStore, combineReducers,applyMiddleware } from 'redux';
import dashbordReducer from './reducer/devices';
import settingsReducer from './reducer/settings';
import ReduxThunk from 'redux-thunk';
const appReducer = combineReducers({
  dashboard:dashbordReducer,
  settings:settingsReducer,
});
// const rootReducer = (state, action) => {
//   // when a logout action is dispatched it will reset redux state
//   return appReducer(state, action);
// };
const store = createStore(appReducer, applyMiddleware(ReduxThunk));

export default store;