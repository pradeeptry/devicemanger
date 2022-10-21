import React, { useEffect, useLayoutEffect, useState,useRef } from 'react';
import {
    ScrollView, StyleSheet, View,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import cuid from 'cuid';
import QRCode from 'react-native-qrcode-svg';
import { useTheme, Text, HelperText } from 'react-native-paper';
// import { Colors } from 'react-native/Libraries/NewAppScreen';
import { connect, useDispatch, useSelector } from 'react-redux';
import { AppStyles } from '../AppStyles';
import { Title, IconButton } from 'react-native-paper';
import FormInput from '../components/CustomInputs';
import { addDevice, updateDeviceData } from '../store/actions';
import { bindActionCreators } from 'redux';
import CustomFab from '../components/CustomFab';
import { Configuration } from '../Configuration';
import CustomButton from '../components/CustomButton';
// import QRCODE from '../components/QrCode';
// const {colors} = useTheme()
const TextInputAvoidingView = ({ children }) => {
    return Platform.OS === 'ios' ? (
        <KeyboardAvoidingView
            style={styles.wrapper}
            behavior="padding"
            keyboardVerticalOffset={80}
        >
            {children}
        </KeyboardAvoidingView>
    ) : (
        <>{children}</>
    );
};

const _isInputValid = (name) => name.length && name.trim().length && /^([a-zA-Z0-9 _-]+)$/.test(name);
const _isInputNameOnlyValid = (name) => name.length && name.trim().length && /^\s*([A-Za-z]{1,}([\.,] |[-']| ))+[A-Za-z]+\.?\s*$/.test(name);


function AddEditDevice(props) {
    // const addDeviceStaus = useSelector((state)=>state.dashboard && state.dashboard.addDeviceStaus);

    const oldDevices = useSelector((state) => state.dashboard.devices);
    // console.log("old devices", props.route.params.singleDevice.name)
    const { colors } = useTheme();
    const dispatch = useDispatch();
    const [deviceData, setDeviceData] = useState(
        {
            name: props?.route?.params && props.route.params.singleDevice? props.route.params.singleDevice.name : '',
            os: props?.route?.params && props.route.params.singleDevice ?props.route.params.singleDevice.os : '',
            modal: props?.route?.params && props.route.params.singleDevice ?props.route.params.singleDevice.modal : '',
            deviceOwner: props?.route?.params && props.route.params.singleDevice? props.route.params.singleDevice.deviceOwner : '',
            qrImage: props?.route?.params && props.route.params.singleDevice ? props.route.params.singleDevice.qrImage : '',
            id: props?.route?.params && props.route.params.singleDevice ?props.route.params.singleDevice.id : false,
        }
    )
    // using same screen for add edit 
    const [isEdit, setIsEdit] = useState(props?.route?.params && props.route.params.singleDevice ?true : false);
    const [error,setError] = useState(false);
    // checking for direct submission without change
    const [isClicked, setIsClicked] = useState(false);
    const [disabled,setDisabled] = useState(false);
    // for showing focus & errors if anything changed
    const [focus, setFocus] = useState(
        {
            name: false,
            os: false,
            deviceOwner: false,
            modal: false
        });
        const [loading, setLoader] = useState(false);
        const [qrRef,SetQrRef]=useState();
        const [qrvalue, setQrvalue] = useState('');

        const showErrorMsg=(text)=>{
            setError(text);
        }
        // const [qrImageGenrated,setQrImage]=useState(false);
        let myQRCode = useRef();

    validateInputs =  async() => {
console.log("i am here validateInputs");
await myQRCode.toDataURL((dataURL) => {
            let shareImageBase64 = {
              url: `data:image/png;base64,${dataURL}`,
            };
            console.log('Qr code succeed    ggggggg');

            // genrateQrImage = `${shareImageBase64.url}`;
            // setQrCreated(`${shareImageBase64.url}`);
            if(dataURL){
            console.log('Qr code succeed');

                addUpdateDevice(shareImageBase64)
            }else{
            console.log('Qr code genration failed 01');

                showErrorMsg('Qr code genration failed');
            }
          }).catch(err=>{
            console.log('some error occured in qr code genration 02',err);
            showErrorMsg('Qr code genration failed');
            return;
          });
       
    }
    React.useEffect(()=>{
    if(qrvalue){
        setTimeout(()=>{
            validateInputs();

        },1000)
    }
    },[qrvalue])

 const addUpdateDevice=(qrImage)=>{
    const { name, os, deviceOwner, modal, id } = deviceData;

        if (isEdit) {
            // dispatch(editDevice)
            let oldData = [...oldDevices];
            let updatedDeviceIndex = oldData.indexOf(id);
            const device = { id: id, name, os, deviceOwner, modal, qrImage: `${qrImage.url}` };
            let removedData = oldData.splice(updatedDeviceIndex, 1, device);
            console.log("the old updated data is ", oldData);
            dispatch(updateDeviceData(oldData));
            props.navigation.goBack();
        } else {
            const device = { id: id, name, os, deviceOwner, modal, qrImage:`${qrImage.url}` };
            let oldData =oldDevices&& oldDevices.length? [...oldDevices]:[]; // main device data of redux
            oldData.push(device)
            dispatch(addDevice(oldData));
            props.navigation.goBack();
        }
    }

    // useEffect(() => {
    //     if (isClicked && addDeviceStaus=='IN_PROCESS') {
    //         setIsClicked(false);
    //         props.navigation.goBack();
    //     }
    // }, [addDeviceStaus=='IN_PROCESS']);

    useEffect(() => {
        if (isEdit) {
            fillAllStateValues()
        }
    }, []);

    fillAllStateValues = () => {
        setDeviceData(deviceData => ({
            ...deviceData,
            ...props.route.params.singleDevice
        }))
    }
    // single function for updating all device data variables
    updateFormData = (type, data) => {
        setDeviceData(deviceData => ({
            ...deviceData,
            [type]: data
        }))
    }

    // single function for updating all input focus status
    updateFocus = (type, data) => {
        setFocus(focus => ({
            ...focus,
            [type]: data
        }))
    }


    const { modal, os, deviceOwner, name, qrImage,id } = deviceData;
    return (
        <>

            <View style={[styles.container, { backgroundColor: colors.surface }]}>
                <Title style={styles.titleText}>{isEdit ? 'Edit Details' : 'Add Device'}</Title>
                <TextInputAvoidingView>
                    <View
                        style={styles.inputStyle}
                    >
                        <FormInput
                            labelName='Device Name'
                            value={name}
                            disabled={disabled}
                            onFocus={() => updateFocus('name', true)}
                            onBlur={() => updateFocus('name', false)}
                            onChangeText={text => {
                                updateFormData('name', text)
                            }}
                            error={(focus.name) && !_isInputValid(name)}
                        />
                        {(focus.name || isClicked) && !_isInputValid(name) ?
                            <HelperText type="error" visible={true}>
                                {!name.length ?
                                    'Error: Please enter device name!' :
                                    'Error: Only letters and numbers allowed!'
                                }
                            </HelperText>
                            : null}
                    </View>
                    <View
                        style={styles.inputStyle}
                    >
                        <FormInput
                            labelName='OS'
                            value={os}
                            disabled={disabled}
                            onFocus={() => updateFocus('os', true)}
                            onBlur={() => updateFocus('os', false)}
                            onChangeText={text => {
                                updateFormData('os', text)
                            }}
                            error={(focus.os) && !_isInputValid(os)}
                        />
                        {(focus.os || isClicked) && !_isInputValid(os) ?
                            <HelperText type="error" visible={true}>
                                {!os.length ?
                                    'Error: Please enter OS of device!' :
                                    'Error: Only letters and numbers allowed!'
                                }
                            </HelperText>
                            : null}

                    </View>
                    <View
                        style={styles.inputStyle}>
                        <FormInput
                            labelName='Device Owner'
                            value={deviceOwner}
                            disabled={disabled}
                            onChangeText={text => {
                                updateFormData('deviceOwner', text)
                            }}
                            onFocus={() => updateFocus('deviceOwner', true)}
                            onBlur={() => updateFocus('deviceOwner', false)}
                            error={(focus.deviceOwner) && !_isInputNameOnlyValid(deviceOwner)}
                        />
                        {(focus.deviceOwner || isClicked) && !_isInputNameOnlyValid(deviceOwner) ?
                            <HelperText type="error" visible={true}>
                                {!deviceOwner.length ?
                                    'Error: Please enter device owner name!' :
                                    'Error: Only valid names allowed!'
                                }
                            </HelperText>
                            : null}
                    </View>
                    <View
                        style={styles.inputStyle}
                    >
                        <FormInput
                            labelName='Device Modal'
                            value={modal}
                            disabled={disabled}
                            onChangeText={text => {
                                updateFormData('modal', text)
                            }}
                            onFocus={() => updateFocus('modal', true)}
                            onBlur={() => updateFocus('modal', false)}
                            error={(focus.modal) && !_isInputValid(modal)}
                        />
                        {(focus.modal || isClicked) && !_isInputValid(modal) ?
                            <HelperText type="error" visible={true}>
                                {!modal.length ?
                                    'Error: Please enter modal name!' :
                                    'Error: Only letters and numbers allowed!'
                                }
                            </HelperText>
                            : null}
                    </View>
                    {isEdit && !qrvalue?
                    <View style={{justifyContent:'center',alignItems:'center',marginTop:20}}>
                 <QRCode
                 value={qrvalue ? qrvalue : 'NA'}
                 size={140}
                 color="black"
                 backgroundColor="white"
                 logo={{
                   url:`${qrImage}`
                 }}
                 logoSize={20}
                 logoMargin={2}
                 logoBorderRadius={10}
                 logoBackgroundColor="yellow"
               /></View>:disabled && id ?
               <View style={{justifyContent:'center',alignItems:'center',marginTop:20}}>
 <QRCode
          getRef={(ref) => (myQRCode = ref)}
          value={qrvalue?qrvalue:null}
          size={140}
          
          color="black"
          backgroundColor="white"
          logoSize={30}
          logoMargin={2}
          logoBorderRadius={15}
          logoBackgroundColor="yellow"
        />

        </View>:null}
        {error?
         <HelperText type="error" visible={true}>
         {error}
     </HelperText>
        :null}
                </TextInputAvoidingView>
                
                <CustomButton title={loading?'Proccesing...':isEdit ? 'Update Device' : 'Add Device'} onPress={() => { 
        if(!disabled){
            setIsClicked(true);
            if( _isInputValid(name) && _isInputValid(os) && _isInputValid(modal) && _isInputNameOnlyValid(deviceOwner)){
                setDisabled(true)
                console.log("i am here 123")
                if(!isEdit){
                    let id = cuid();
                    setDeviceData(deviceData=>({...deviceData,id:id}));
                }
               
                setQrvalue(`${deviceData}`);
                setLoader(true);
            // 
            }else{
                console.log("i m here ");
            }
        }            
       
                     }} style={{ position: 'absolute', bottom: 80, alignSelf: 'center' }} />
            </View>
        </>
    );
}


export default AddEditDevice;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: Configuration.home.listing_item.offset,
    },
    wrapper: {
        flex: 1,
    },
    titleText: {
        fontSize: 24,
        marginBottom: 10
    },
    inputStyle: {
        paddingVertical: 12
    },
    userPhoto: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginLeft: 5,
    },
});


