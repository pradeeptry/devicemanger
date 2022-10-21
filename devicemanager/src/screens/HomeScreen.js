import React, { useLayoutEffect, useState } from 'react';
import { ScrollView, StyleSheet, FlatList, View } from 'react-native';
import {
  useTheme, Text, ActivityIndicator, Divider,
  Portal,
  Modal,
  Dialog,
  Paragraph,Button
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AndroidSwiperDelete from '../components/AndroidSwiperDelete';
import DeleteSwipableForApple from '../components/DeleteSwipableForApple';
// import { Colors } from 'react-native/Libraries/NewAppScreen';
import { connect, useDispatch, useSelector } from 'react-redux';
import { AppStyles } from '../AppStyles';
import CustomFab from '../components/CustomFab';
import CustomModal from '../components/CustomModal';
import ListItem from '../components/ListItem';
import { Configuration } from '../Configuration';
import { fetchDevicesData, completeDeviceAdd,removeDeviceFromList,updateDeviceDataStatus,deviceRemoved } from '../store/actions';
// import devices from '../store/reducer/devices';
// const {colors} = useTheme()

function HomeScreen(props) {
  // console.log("props",props);
  const dispatch = useDispatch();
  const devicesList = useSelector((state) => state.dashboard.devicesList);
  // add edit delete flags;
  const addDeviceStatus = useSelector((state) => state.dashboard.addDeviceStatus);
  const updateDeviceStatus = useSelector((state) => state.dashboard.updateDeviceStatus);
  const removeDevice = useSelector((state)=>state.dashboard.removeDevice);
  const flagForPopUp = useSelector((state)=>state.dashboard.popUpMsg);
  const oldDevices = useSelector((state) => state.dashboard.devices || []);

  const { colors } = useTheme();
  const theme = useTheme();

  const [deviceList, setDeviceList] = useState([]);
  const [initialLoader, setInitialLoader] = useState(true);
  const [isEmpty, setIsEmpty] = useState(true);
  const [isModalVisible, setModalVisibility] = useState(false)
  const [isModalVisible2, setModalVisibility2] = useState(false)
  const [dialogData,setDialogData]=useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadLoader, setUploadLoader] = useState(false)
  const [currentItem, setCurrentItem] = useState({
    id: '',
    name: 'name',
    os: 'os',
    qrImage: 'qr Code',
    deviceOwner: 'device Owner',
    modal: 'modal',
  })
  React.useEffect(() => {
    if (oldDevices && oldDevices.length) {
      setDeviceList(oldDevices);
      setIsEmpty(false)
      setInitialLoader(false);
      setIsLoading(false)
    } else {
      setIsEmpty(true)
      setInitialLoader(false);
    }
  }, [oldDevices]);

  React.useEffect(() => {
    deviceSavedData();
  }, [])
  React.useEffect(() => {
    if(isEmpty==false && initialLoader==false){
      setIsEmpty(true);
    }
  }, [devicesList===false])

  React.useEffect(() => {
    if (addDeviceStatus == 'IN_PROCESS') {
      setUploadLoader(true);
    } else if (addDeviceStatus == 'DONE') {
      setUploadLoader(false);
      dispatch(completeDeviceAdd())
    } else if (updateDeviceStatus == 'IN_PROCESS') {
      setUploadLoader(true);
    } else if (updateDeviceStatus == 'DONE') {
      setUploadLoader(false);
      dispatch(updateDeviceDataStatus())
    }
  }, [addDeviceStatus, updateDeviceStatus])

  const deviceSavedData = async () => {
    await AsyncStorage.getItem('@DEVICES_DATA').then(res => {
      console.log("error in fetching data ")
      if (res) {
        const { devices, deviceList } = JSON.parse(res);
        if (devices && devices.length) {
          return dispatch(fetchDevicesData(devices, true));
        } else {
          dispatch(fetchDevicesData(arr = [], false));
          setIsEmpty(true)

        }
      } else {
        dispatch(fetchDevicesData(arr = [], false));
        setIsEmpty(true)
      }
    }).catch((e) => {
      dispatch(fetchDevicesData(arr = [], false));
      setIsEmpty(true);
    })
  };

  const openModalForItem = async (item) => {
    const { id,
      name,
      deviceOwner,
      os,
      modal,
      qrImage } = item;
    const currentItemWithData = {
      id,
      name,
      deviceOwner,
      os,
      modal,
      qrImage
    };
    await setCurrentItem(currentItemWithData)
    setModalVisibility(!isModalVisible)
  }

  const handleEdit = (item) => {
    props.navigation.push('Update', { singleDevice: item });
  }
  const handleDelete = (item) => {
    let oldDeviceData= [...oldDevices];
    const devicesUpdated = [...oldDeviceData.filter((element) => element.id !== item.id)];
        let devicesList = devicesUpdated && devicesUpdated.length > 0 ? true : false;
    console.log('after delete ',devicesUpdated);

        dispatch(removeDeviceFromList(devicesUpdated,devicesList))
    // console.log("vffffff",item.name)
    // props.navigation.push('Update', { singleDevice: item });
  }
  React.useEffect(() => {
    if(flagForPopUp && removeDevice){              // open popup we got api response after delete
      setUploadLoader(false);
      setDialogData(flagForPopUp);
      setModalVisibility2(true);
      dispatch(deviceRemoved()) 
    }else if(removeDevice){                             // initial state of delete
      setUploadLoader(true);
    }
  }, [flagForPopUp || removeDevice])

  const renderItem = ({ item }) => (
    <DeleteSwipableForApple onPressDelete={() =>{ handleDelete(item)} } >
    <ListItem
      item={item}
      onPressListElement={() => openModalForItem(item)}
      onEdit={() => handleEdit(item)}
      
      colors={colors}
      theme={theme}
    />
    </DeleteSwipableForApple>
  )

  const renderItemSeparator = () => <Divider theme={theme} bold />

  const keyExtractor = (item, index) => `${item.id}${Math.random()}` || `${index}`
  // const renderFooter = () => isLoading && <Button style={styles.footer} loading={isLoading} />
  const renderModalContent = () => <CustomModal item={currentItem} isLoading={isLoading} theme={theme} deletePopUp={false} />
  // const renderModalContent2 = () => <CustomModal theme={theme}  deletePopUp={flagForPopUp} />
console.log("the data is flagForPopUp",dialogData)
  return (<>
   {dialogData?
        <Portal>
          <Dialog visible={isModalVisible2} onDismiss={()=>{setModalVisibility2(false)}}>
            <Dialog.Title>{dialogData.a}</Dialog.Title>
            <Dialog.Content>
              <Paragraph>{dialogData.q}</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={()=>{setModalVisibility2(false)}}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>:null}
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      {isEmpty ? initialLoader ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={colors.text} size={'large'} />
      </View> : <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text>{'No Devices'}</Text></View> :
        <><Portal>
          <Modal
            visible={isModalVisible}
            contentContainerStyle={styles.modalContent}
            dissmisable
            onDismiss={() => setModalVisibility(false)}
          >
            {renderModalContent()}
          </Modal>
        </Portal>

          <FlatList
            style={styles.flatListContainer}
            data={deviceList}
            extraData={deviceList}
            ItemSeparatorComponent={renderItemSeparator}
            // ListFooterComponent={renderFooter}
            renderItem={renderItem}
            initialNumToRender={20}
            keyExtractor={keyExtractor}
            // onEndReached={fetchMoreCoins}
            // onEndReachedThreshold={0.2}
            contentContainerStyle={styles.contentContainer}
          />
          
        </>
      }
      {(addDeviceStatus == 'IN_PROCESS' || updateDeviceStatus == 'IN_PROCESS'|| removeDevice) || uploadLoader ?
        <View style={{ paddingHorizontal: 8, paddingVertical: 4, backgroundColor: colors.secondary, borderRadius: 4, position: 'absolute', right: 20, bottom: 20 }}>
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <View style={{ paddingHorizontal: 8 }}><Text style={{ color: colors.surface }}>{addDeviceStatus == 'IN_PROCESS' ? 'Adding device...' : updateDeviceStatus ? 'Updating Device' : 'Deleting Device'}</Text></View>
            <ActivityIndicator color={colors.surface} size={'small'} />
          </View>
        </View> :
        <CustomFab style={{ position: 'absolute', bottom: 20, right: 20 }} {...props} />}
       
    </View>
  </>
  );
}

const styles = StyleSheet.create({

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
  flatListContainer: {
    width: '100%',
    paddingVertical: 16,
  },
  container: {
    flex: 1,
    paddingHorizontal: 8
  },
  contentContainer: {
    width: '100%',
  },
  modalContent: {
    padding:20
  },
});

export default HomeScreen;
