// import React from 'react';
// import { useColorScheme } from 'react-native';
// import {Image, Pressable, StyleSheet} from 'react-native';
// // import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {Button,createDynamicThemeColors, Provider} from 'react-native-paper';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import { useTheme } from '@react-navigation/native';
// import {createDrawerNavigator} from '@react-navigation/drawer';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {NavigationContainer} from '@react-navigation/native';
// import HomeScreen from '../screens/HomeScreen';
// import SettingsScreen from '../screens/SettingsScreen';
// import {AppIcon, AppStyles} from '../AppStyles';
// import {Configuration} from '../Configuration';
// import DrawerContainer from '../components/DrawerContainer';

// const Stack = createNativeStackNavigator();
// import {
//   DefaultTheme,DarkTheme,
//   Provider as PaperProvider,
// } from 'react-native-paper';

// const { lightScheme } = createDynamicThemeColors({ sourceColor: '#FFFF00' });
// const { darkScheme } = createDynamicThemeColors({ sourceColor: '#2b2b0f' });





// // drawer stack


// // Manifest of possible screens


// const AppNavigator = (props) => {
//   const scheme= useColorScheme();
//   const { colors } = useTheme();

//   const RootNavigator = (props) => (
//     <Stack.Navigator
//       initialRouteName="DrawerStack"
//       screenOptions={{headerShown: false}}>
//       <Stack.Screen name="DrawerStack" component={DrawerStack} />
//     </Stack.Navigator>
//   );

//   const HomeStack = (props) => (
//     <Stack.Navigator
//       initialRouteName="Home"
//      >
//       <Stack.Screen
//         name="Home"
//         component={HomeScreen}
//         options={props => ({
//           headerStyle:{backgroundColor:colors.primary},
//           headerLeft: () => (
//             <Pressable onPress={() => props.navigation.openDrawer()}>
//               <Image style={[styles.iconStyle,{color:colors.text}]} source={AppIcon.images.menu} />
//             </Pressable>
//           ),
//           headerLeftContainerStyle: {paddingLeft: 10},
//           headerTintColor: colors.text,
//           headerTitleStyle: {...styles.headerTitleStyle, color:colors.text},
//           headerMode: 'float',
//         })}
//       />
//     </Stack.Navigator>
//   );
  
//   const SettingsStack = (props) => (
//     <Stack.Navigator
//       initialRouteName="Settings"
//      >
//       <Stack.Screen
//         name="Settings"
//         component={SettingsScreen}
//         options={(props) => ({
//           headerLeft: () => (
//             <Pressable onPress={() => props.navigation.openDrawer()}>
//               <Image style={[styles.iconStyle,{color:colors.text}]} source={AppIcon.images.menu} />
//             </Pressable>
//           ),
//           headerStyle:{backgroundColor:colors.primary},
//           headerTintColor: colors.text,
//           headerTitleStyle: {...styles.headerTitleStyle, color:colors.text},
//           headerMode: 'float',
//           headerLeftContainerStyle: {paddingLeft: 10},
//         })}
//       />
//     </Stack.Navigator>
//   );
  
//   const BottomTab = createMaterialBottomTabNavigator();
  
//   const TabNavigator = (props) => (
//     <BottomTab.Navigator
//       initialRouteName="Home"
      
//   >
//       <BottomTab.Screen
//         options={{tabBarLabel: 'Home'}}
//         name="HomeStack"
//         component={HomeStack}
//         screenOptions={{
//           tabBarInactiveTintColor: colors.text,
//           tabBarActiveTintColor: colors.accent,
//           tabBarIcon: ({focused}) => {
//             return (
//               <Button
//               icon="camera"
            
//               style={[styles.icon,focused ? colors.accent : colors.text]}
//             />
//             );
//           },
//           headerShown: false,
//         }}
//       />
//        <BottomTab.Screen
//         options={{tabBarLabel: 'Settings'}}
//         name="Settings"
//         component={SettingsStack}
//         screenOptions={{
//           tabBarInactiveTintColor: colors.text,
//           tabBarActiveTintColor: colors.accent,
//           tabBarIcon: ({focused}) => {
//             return (
//               <Button
//               icon="camera"
            
//               style={[styles.icon,focused ? colors.accent : colors.text]}
//             />
//             );
//           },
//           headerShown: false,
//         }}
//       />
//     </BottomTab.Navigator>
//   );
  
//   const Drawer = createDrawerNavigator();
// const DrawerStack = (props) => (
//   <Drawer.Navigator
//     screenOptions={{
//       drawerStyle: {outerWidth: 200},
//       drawerPosition: 'left',
//       headerShown: false,
//     }}
//     drawerContent={({navigation}) => (
//       <DrawerContainer navigation={navigation} />
//     )}>
//     <Drawer.Screen name="Tab" component={TabNavigator} />
//   </Drawer.Navigator>
// );

//   return(
//     <PaperProvider theme={scheme === 'dark' ? themeDark : themeLight}>
//     <NavigationContainer theme={scheme === 'dark' ? themeDark : themeLight} >
//     <RootNavigator />
//   </NavigationContainer>
//   </PaperProvider>
//   )
  
// }

// const styles = StyleSheet.create({
//   headerTitleStyle: {
//     fontWeight: 'bold',
//     textAlign: 'center',
//     alignSelf: 'center',
//   },
//   iconStyle: { width: 30, height: 30},
// });

// export default AppNavigator;
