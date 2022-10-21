import * as React from 'react';
import { StatusBar, StyleSheet,Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppIcon, AppStyles} from '../AppStyles';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MenuIcon from 'react-native-vector-icons/Feather';
import { Provider as PaperProvider, MD3DarkTheme, MD3LightTheme,useTheme } from 'react-native-paper';
import DrawerItems from '../components/DrawerContainer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from '../screens/HomeScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SettingsScreen from '../screens/SettingsScreen';
import AddEditDevice from '../screens/AddEditDevice';
import { useDispatch } from 'react-redux';
import { fetchDevicesData } from '../store/actions';
const PERSISTENCE_KEY = 'NAVIGATION_STATE';
const PREFERENCES_KEY = 'APP_PREFERENCES';
export const PreferencesContext = React.createContext(null);
const Stack = createStackNavigator();
const HomeStack = (props) => {
    const { colors, isV3 } = useTheme();
    return(
    <Stack.Navigator
      initialRouteName="HomeScreen"
     >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={props => ({
          headerStyle:{backgroundColor:colors.primary},
          headerLeft: () => (
  //             <IconButton
  //   icon="camera"
  //   iconColor={colors.surface}
  //   size={20}
  //   onPress={() =>{ props.navigation.openDrawer()}}
  // />
  <TouchableOpacity onPress={() => {props.navigation.openDrawer()}} style={{paddingHorizontal:4}}>
  <MenuIcon name={'menu'}   color={colors.surface}
            size={30}   /> 
</TouchableOpacity>

          ),
          headerLeftContainerStyle: {paddingLeft: 10},
          headerTintColor: colors.text,
          headerTitleStyle: {...styles.headerTitleStyle, color:colors.surface},
          headerMode: 'float',
        })}
      />
      <Stack.Screen
        name="Add Device"
        component={AddEditDevice}
        options={props => ({
          headerStyle:{backgroundColor:colors.primary},
          headerLeft: () => (
  <TouchableOpacity onPress={() => {props.navigation.goBack()}}>

            <AntDesign
            name="arrowleft"
            
            color={colors.surface}
            size={28}
            // onPress={() =>{ props.navigation.openDrawer()}}
          />      
 </TouchableOpacity>
          ),
        
          headerLeftContainerStyle: {paddingLeft: 10},
          headerTintColor: colors.text,
          headerTitleStyle: {...styles.headerTitleStyle, color:colors.surface},
          headerMode: 'float',
        })}
      />
   <Stack.Screen
        name="Update"
        component={AddEditDevice}
        options={props => ({
          headerStyle:{backgroundColor:colors.primary},
          headerLeft: () => (
            <TouchableOpacity onPress={() => {props.navigation.goBack()}}>
            <AntDesign
            name="arrowleft"
            color={colors.surface}
            size={28}
          />      
 </TouchableOpacity>
          ),
          headerLeftContainerStyle: {paddingLeft: 10},
          headerTintColor: colors.text,
          headerTitleStyle: {...styles.headerTitleStyle, color:colors.surface},
          headerMode: 'float',
        })}
      />
    </Stack.Navigator>
  );
    }
  
  const SettingsStack = (props) => {
    const { colors, isV3 } = useTheme();
    return(
    <Stack.Navigator
      initialRouteName="Settings"
     >
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={(props) => ({
          headerLeft: () => (
            <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
              <Image style={[styles.iconStyle,{color:colors.text}]} source={AppIcon.images.menu} />
            </TouchableOpacity>
          ),
          headerStyle:{backgroundColor:colors.primary},
          headerTintColor: colors.text,
          headerTitleStyle: {...styles.headerTitleStyle, color:colors.text},
          headerMode: 'float',
          headerLeftContainerStyle: {paddingLeft: 10},
        })}
      />
    </Stack.Navigator>
  );

    }


const DrawerContent = (props) => {
    return (<PreferencesContext.Consumer>
      {(preferences) => (<DrawerItems toggleTheme={preferences.toggleTheme} {...props} isDarkTheme={preferences.theme.dark}/>)}
    </PreferencesContext.Consumer>);
};
const Drawer = createDrawerNavigator();
export default function PaperExample(props) {
    const dispatch = useDispatch();
    const [isReady, setIsReady] = React.useState(false);
    const [initialState, setInitialState] = React.useState();
    const [isDarkMode, setIsDarkMode] = React.useState(false);
    const [themeVersion, setThemeVersion] = React.useState(3);
    const themeMode = isDarkMode ? 'dark' : 'light';
    const theme = {3: { light: MD3LightTheme, dark: MD3DarkTheme,}}[themeVersion][themeMode];





    React.useEffect(() => {
        const restoreState = async () => {
            try {
                const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
                const state = JSON.parse(savedStateString || '');
                setInitialState(state);
            }
            catch (e) {
                // ignore error
            }
            finally {
                setIsReady(true);
            }
        };
        if (!isReady) {
            restoreState();
        }
    }, [isReady]);
    React.useEffect(() => {
        const restorePrefs = async () => {
            try {
                const prefString = await AsyncStorage.getItem(PREFERENCES_KEY);
                const preferences = JSON.parse(prefString || '');
                if (preferences) {
                    setIsDarkMode(preferences.theme === 'dark');
                }
            }
            catch (e) {
                // ignore error
            }
        };
        restorePrefs();
    }, []);
    React.useEffect(() => {
        const savePrefs = async () => {
            try {
                await AsyncStorage.setItem(PREFERENCES_KEY, JSON.stringify({
                    theme: themeMode,
                }));
            }
            catch (e) {
                // ignore error
            }
        };
        savePrefs();
    }, [themeMode]);
    const preferences = React.useMemo(() => ({
        toggleTheme: () => setIsDarkMode((oldValue) => !oldValue),
        theme,
    }), [theme]);
    if (!isReady) {
        return null;
    }



    return (<PaperProvider theme={theme}>
      <SafeAreaProvider>
        <PreferencesContext.Provider value={preferences}>
          <React.Fragment>
            <NavigationContainer initialState={initialState} onStateChange={(state) => AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))}>
              <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
                  <Drawer.Screen name="Home" component={HomeStack} options={{ headerShown: false }}/>
                  <Drawer.Screen name="Settings" component={SettingsStack} options={{ headerShown: false }}/>
                </Drawer.Navigator>
              <StatusBar style={!theme.dark ? 'dark' : 'light'}/>
            </NavigationContainer>
          </React.Fragment>
        </PreferencesContext.Provider>
      </SafeAreaProvider>
    </PaperProvider>);
}
const styles = StyleSheet.create({
    collapsed: {
        width: 80,
    },
});