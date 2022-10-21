import { StyleSheet } from 'react-native'
import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Surface, Avatar, Title, Caption, withTheme,useTheme } from 'react-native-paper'
import EditIcon from 'react-native-vector-icons/Feather';
const ListElement = ({ item, onPressListElement,
  onEdit,
  onPressDelete, colors }) => {
  const {id, name,os,modal,deviceOwner,qrImage } = item
  // const currentPrice = modal;
  const priceChange = os;
  // const { colors } = useTheme();

  return ((
    <TouchableOpacity
      onPress={onPressListElement}
      style={styles.surfaceContainer}
    >
      <Surface style={styles.surface}>
        <Avatar.Image style={styles.avatar}  size={32} source={{ uri: `${qrImage}` }} />
        <View style={styles.infoContainer}>
          <View style={{flex:0.6,flexDirection:'column'}}>
          <View style={styles.sectionContainer}>
            <Title
              numberOfLines={1}
              style={styles.coinName}
            >
              {name}
            </Title>
            
          </View>
          <View style={styles.sectionContainer2}>
          <Caption>Modal: </Caption>
          <Caption
           style={{fontWeight:'800', }}
            >
              {modal}
            </Caption>
            </View>
          <View style={styles.sectionContainer2}>
            <Caption>Owner: </Caption>
            <Caption
             style={{fontWeight:'800', }}
            >
              {deviceOwner}
            </Caption>
          </View>
          </View>
          <View style={{flex:0.4,flexDirection:'column',justifyContent:'space-around'}}>
            <View style={{flexDirection: 'row',alignItems:'flex-start'}}>
            <Caption
              style={{fontWeight:'800',fontSize:8 }}>OS: </Caption>
          <Caption
              style={{fontWeight:'800',fontSize:8 }}
            >
              {os}
            </Caption>
            </View>
            <View style={{flexDirection: 'row',justifyContent:'center'}}>
          <TouchableOpacity  onPress={()=>{onEdit(item)}}>
          <EditIcon
            size={28}
            name="edit"
            color={colors.primary}
            style={
             {opacity:1.2 }}
            
          />
        </TouchableOpacity>
        </View>
            </View>
        </View>
        
      </Surface>
   
    </TouchableOpacity>
  ))
}


export default withTheme(ListElement)
const styles = StyleSheet.create({
    infoContainer: {
      flexDirection:'row',
    },
    surfaceContainer: {
      flex:1,
      width: '100%',
    },
    surface: {
      width: '100%',
      paddingVertical: 8,
      alignItems: 'center',
      flexDirection: 'row',
    },
    sectionContainer: {
      flex:1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    sectionContainer2: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    avatar: {
      marginHorizontal: 8,
    },
    coinName: {
      textTransform: 'uppercase',
    },
  })