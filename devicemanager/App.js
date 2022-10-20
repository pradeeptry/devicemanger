import React from 'react';
import {Provider} from 'react-redux';
import AppNavigator from './src/navigations';
import store from './src/store/store';


function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
   </Provider>
  );
}


export default App;