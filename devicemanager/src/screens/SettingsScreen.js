import { StyleSheet } from 'react-native'
import React, { useEffect, useState,Component } from 'react'

import { TouchableOpacity, View ,Text} from 'react-native'
import { Switch, Subheading, withTheme } from 'react-native-paper'
import { toggleThemeUI,
  exportStarted,
  exportDone } from '../store/actions';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
}
  // const { colors } = theme;
render(){
  // const {colors} = this.props.theme;
  return (
    <View>
      <View style={styles.row}>
        <Subheading >Dark Mode</Subheading>
        {/* <ThemeSwitch /> */}
      </View>
      <View style={styles.row}>
        <Subheading >Export Devices</Subheading>
        <TouchableOpacity>
          <View>
          <Text>
            Start
          </Text>
        </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}
}


function mapStateToProps(state) {
  return {
      dashboard: state.dashboard,
      settingsState: state.settingsState,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
      {
         toggleThemeUI
      },
      dispatch,
  );
}


export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
const styles= StyleSheet.create({
  container: {
    flex: 1,
    elevation: 2,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingHorizontal: 16,
    width: '100%',
  },
})