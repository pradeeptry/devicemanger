import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

const MyComponent = (props) => (
  <FAB
    icon="plus"
    style={[styles.fab,props.style]}
    onPress={() =>{ props.navigation.push('Add Device',{isEdit:true})}}
  />
);

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 80,
  },
})

export default MyComponent;