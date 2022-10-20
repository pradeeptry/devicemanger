import React, {useLayoutEffect,useState} from 'react';
import {ScrollView, StyleSheet,  View} from 'react-native';
import { useTheme,Text } from 'react-native-paper';
// import { Colors } from 'react-native/Libraries/NewAppScreen';
import {connect, useDispatch, useSelector} from 'react-redux';
import { AppStyles} from '../AppStyles';
import CustomFab from '../components/CustomFab';
import {Configuration} from '../Configuration';
import { fetchDevicesData } from '../store/actions';
// const {colors} = useTheme()

function HomeScreen(props) {
  const {colors} = useTheme();
  const [deviceList,setDeviceList]=useState([])
  const dispatch = useDispatch();
  // fetchDevicesData
  const oldDevices = useSelector((state)=>state.dashboard);

  React.useEffect(() => {
     if(oldDevices && oldDevices.devices)
     setDeviceList(oldDevices.devices);

 }, [oldDevices]);

  React.useEffect(() => {
     
    deviceSavedData();
 }, []);

  const deviceSavedData = async () => {
    try {
        const data = await AsyncStorage.getItem('@DEVICES_DATA');
        console.log("error in fetching data ")

        if(data){
          const deviceData = JSON.parse(data);
          dispatch(fetchDevicesData(deviceData,true));
        }
        
    }
    catch (e) {
        // console.log("no data ")
        dispatch(fetchDevicesData(arr=[],false));


  }
};

  return (<>
    <ScrollView style={[styles.container,{
      backgroundColor: colors.surface,
  }]}>
      <View>
      <Text style={styles.title}>Welcome </Text>
      </View>
    </ScrollView>
      <CustomFab style={{position:'absolute',bottom:20,right:20}} {...props} />
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Configuration.home.listing_item.offset,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  userPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 5,
  },
});

export default HomeScreen;
