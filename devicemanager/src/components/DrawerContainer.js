import * as React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Badge, Drawer, Switch, Text, TouchableRipple, MD2Colors, useTheme, MD3Colors, } from 'react-native-paper';
import { PreferencesContext } from '../navigations/index';

const DrawerItems = (props) => {
    const { colors, isV3 } = useTheme();
    return (<DrawerContentScrollView alwaysBounceVertical={false} style={[
            styles.drawerContent,
            {
                backgroundColor: colors.surface,
            },
        ]}>
        <>

          <Drawer.Section >
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}><Text variant="headlineMedium">Device Manager</Text></View>
          <TouchableRipple onPress={()=>{props.navigation.navigate('Home')}}>
              <View style={[styles.preference, isV3 && styles.v3Preference]}>
                <Text variant="labelLarge">Home</Text>
              </View>
            </TouchableRipple>
   
          <Pressable onPress={()=>{props.navigation.navigate('Settings')}}>
              <View style={[styles.preference, isV3 && styles.v3Preference]}>
                <Text variant="labelLarge">Settings</Text>
              </View>
            </Pressable>
          </Drawer.Section>

          <Drawer.Section title="Preferences">
            <TouchableRipple onPress={()=>{return props.toggleTheme()}}>
              <View style={[styles.preference, isV3 && styles.v3Preference]}>
                <Text variant="labelLarge">Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={props.isDarkTheme}/>
                </View>
              </View>
            </TouchableRipple>

            

          

           
          </Drawer.Section>
        </>
    
    </DrawerContentScrollView>);
};
const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    v3Preference: {
        height: 56,
        paddingHorizontal: 28,
    },
    badge: {
        alignSelf: 'center',
    },
});
export default DrawerItems;