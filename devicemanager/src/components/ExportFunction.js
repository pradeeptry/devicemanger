import React from 'react';
import {View,  TouchableOpacity, PermissionsAndroid} from 'react-native';
import { useSelector } from 'react-redux';
import {Text, useTheme} from 'react-native-paper';
var RNFS = require('react-native-fs');
import XLSX from 'xlsx';

const DeviceExport= (props) => {
  const {colors } = useTheme();  
  const deviceData = useSelector((state)=>state.dashboard.devices);
  // function to handle exporting
  const exportDataToExcel = () => {

    // Created Sample data
    let sample_data_to_export = deviceData;

    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(sample_data_to_export)    
    XLSX.utils.book_append_sheet(wb,ws,"Devices")
    const wbout = XLSX.write(wb, {type:'binary', bookType:"xlsx"});

    // Write generated excel to Storage
    RNFS.writeFile(RNFS.ExternalStorageDirectoryPath + '/my_exported_file.xlsx', wbout, 'ascii').then((r)=>{
     console.log('Success');
    }).catch((e)=>{
      console.log('Error', e);
    });

  }
  const handleClick = async () => {

    try{
      // Check for Permission (check if permission is already given or not)
      let isPermitedExternalStorage = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

      if(!isPermitedExternalStorage){

        // Ask for permission
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Storage permission needed",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );

        
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Permission Granted (calling our exportDataToExcel function)
          exportDataToExcel();
          console.log("Permission granted");
        } else {
          // Permission denied
          console.log("Permission denied");
        }
      }else{
         // Already have Permission (calling our exportDataToExcel function)
         exportDataToExcel();
      }
    }catch(e){
      console.log('Error while checking permission');
      console.log(e);
      return
    }
    
  };

  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor:colors.surface
      }}>
      <TouchableOpacity
        onPress={() => handleClick()}
        style={{
          width: '50%',
          paddingVertical: 10,
          paddingHorizontal: 15,
          backgroundColor: colors.primary,
          marginVertical: 20,
        }}>
        <Text style={{textAlign: 'center'}}>
          Export to Excel
        </Text>
      </TouchableOpacity>
    </View>
  );
};


export default DeviceExport;