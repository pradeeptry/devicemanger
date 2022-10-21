import { StyleSheet } from 'react-native'
import React, { useEffect, useState,Component } from 'react'

import { View } from 'react-native'

import DeviceExport from '../components/ExportFunction';

const SettingsScreen=(props)=>{
  // const { colors } = theme;
  // const {colors} = this.props.theme;
  return (
    <View style={{justifyContent:'flex-start',alignItems:'center'}}>
      <View style={{flexDirection:'row'}}>
     <DeviceExport />

      </View>
    </View>
  )

}





export default SettingsScreen;
