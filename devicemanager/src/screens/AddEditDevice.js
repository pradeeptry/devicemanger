import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
    ScrollView, StyleSheet, View,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';

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
    const oldDevices = useSelector((state)=>state.dashboard);
    console.log("old devices",oldDevices)
    const { colors } = useTheme();
    const dispatch = useDispatch();
    const [deviceData, setDeviceData] = useState(
        {
            name: props?.singleDevice?.name || '',
            os: props?.singleDevice?.os || '',
            modal: props?.singleDevice?.modal || '',
            deviceOwner: props?.singleDevice?.os || '',
            qrImage: props?.singleDevice?.qrImage || ''
        }
    )
    // using same screen for add edit 
    const [isEdit, setIsEdit] = useState(props.route.parmas && props.route.parmas.isEdit ? true : false);
    // checking for direct submission without change
    const [isClicked, setIsClicked] = useState(false);
    // for showing errors
    const [errors, setError] = useState(
        {
            name: false,
            os: false,
            deviceOwner: false,
            modal: false
        });
    // for showing focus & errors if anything changed
    const [focus, setFocus] = useState(
        {
            name: false,
            os: false,
            deviceOwner: false,
            modal: false
        });

    validateInputs = () => {
        setIsClicked(true);
        const { name, os, deviceOwner, modal, qrImage } = deviceData;
        if (name && os && deviceOwner && modal) {
            if (isEdit) {
                // dispatch(editDevice)
            } else {
                const device = {name,os,deviceOwner,modal,qrImage:'sdfsds'};
                dispatch(addDevice(device,oldDevices));
            }
        } else {
            // setError('Please enter details');
        }
    }


    useEffect(() => {
        if (isEdit) {
            fillAllStateValues()
        }
    }, []);

    fillAllStateValues = () => {
        setDeviceData(deviceData=>({
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


    const { modal, os, deviceOwner, name, qrImage } = deviceData;
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
                            onFocus={() => updateFocus('name', true)}
                            onBlur={() => updateFocus('name', false)}
                            onChangeText={text => {
                                updateFormData('name', text)
                            }}
                            error={(focus.name) && !_isInputValid(name)}
                        />
                        {(focus.name || isClicked) && !_isInputValid(name) ?
                            <HelperText type="error" visible={true}>
                                {!name.length?
                                'Error: Please enter device name!':
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
                            onFocus={() => updateFocus('os', true)}
                            onBlur={() => updateFocus('os', false)}
                            onChangeText={text => {
                                updateFormData('os', text)
                            }}
                            error={(focus.os) && !_isInputValid(os)}
                        />
                        {(focus.os || isClicked) && !_isInputValid(os) ?
                            <HelperText type="error" visible={true}>
                                 {!os.length?
                                'Error: Please enter OS of device!':
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
                            onChangeText={text => {
                                updateFormData('deviceOwner', text)
                            }}
                            onFocus={() => updateFocus('deviceOwner', true)}
                            onBlur={() => updateFocus('deviceOwner', false)}
                            error={(focus.deviceOwner) && !_isInputNameOnlyValid(deviceOwner)}
                        />
                        {(focus.deviceOwner || isClicked) && !_isInputNameOnlyValid(deviceOwner) ?
                            <HelperText type="error" visible={true}>
                                 {!deviceOwner.length?
                                'Error: Please enter device owner name!':
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
                            onChangeText={text => {
                                updateFormData('modal', text)
                            }}
                            onFocus={() => updateFocus('modal', true)}
                            onBlur={() => updateFocus('modal', false)}
                            error={(focus.modal) && !_isInputValid(modal)}
                        />
                        {(focus.modal || isClicked) && !_isInputValid(modal) ?
                            <HelperText type="error" visible={true}>
                                  {!modal.length?
                                'Error: Please enter modal name!':
                                'Error: Only letters and numbers allowed!'
                                }
                            </HelperText>
                            : null}
                    </View>
                </TextInputAvoidingView>
                <CustomButton title={isEdit ? 'Update Device' : 'Add Device'} onPress={() => { validateInputs() }} style={{ position: 'absolute', bottom: 80, alignSelf: 'center' }} />
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


