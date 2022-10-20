import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import { connect, useSelector } from 'react-redux';

import {Provider} from 'react-redux';
import AppNavigator from './src/navigations';
import store from './src/store/store';
import {addDevice} from './src/store/actions';

class App extends Component {
  constructor(props){

    super(props)
  }
  render(){
  return (
    <Provider store={store}>
      <AppNavigator />
   </Provider>
  );
}
}

export default App;
