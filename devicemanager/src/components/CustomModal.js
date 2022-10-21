import React from 'react'
import { ScrollView, View,StyleSheet,Image } from 'react-native'
import { Subheading, Title,Chip, Avatar,List,Card, Paragraph, withTheme,Text } from 'react-native-paper'

const CustomModal = ({ item, theme }) => {

 
  const { colors } = theme


    const { name, modal, qrImage, deviceOwner, os } = item
  
  return (
    <ScrollView
    style={styles.scrollView}
    contentContainerStyle={[styles.scrollViewContent, { backgroundColor: colors.surface }]}
  >
     <Card.Title
     titleStyle={{alignSelf:'center'}}
    //  titleVariant={headlineMedium}
     headlineMedium
    title="Device Details "
  />
        <View style={{paddingVertical:6,flexDirection:'row',justifyContent:'space-between'}}>
            <View style={{justifyContent:'flex-start',alignItems:'center'}}>
        <Text variant="titleSmall">Device Name</Text>

            </View>
            <View style={{justifyContent:'flex-start',alignItems:'center'}}>
            <Text variant="labelSmall">{name}</Text>

            </View>
      </View>
      <View style={{paddingVertical:6,flexDirection:'row',justifyContent:'space-between'}}>
            <View style={{justifyContent:'flex-start',alignItems:'center'}}>
      <Text variant="titleSmall">Device Modal</Text>
      </View>
      <View style={{justifyContent:'flex-start',alignItems:'center'}}>
      <Text variant="labelSmall">{modal}</Text>
     </View>
      </View>
      <View style={{paddingVertical:6,flexDirection:'row',justifyContent:'space-between'}}>
            <View style={{justifyContent:'flex-start',alignItems:'center'}}>
      <Text variant="titleSmall">Device Owner</Text>
      </View>
      <View style={{justifyContent:'flex-start',alignItems:'center'}}>

      <Text variant="labelSmall">{deviceOwner}</Text>
</View>
      </View>
      <View style={{paddingVertical:6,flexDirection:'row',justifyContent:'space-between'}}>
            <View style={{justifyContent:'flex-start',alignItems:'center'}}>
      <Text variant="titleSmall">OS</Text>
      </View>
      <View style={{justifyContent:'flex-start',alignItems:'center'}}>

      <Text variant="labelSmall">{os}</Text>
      </View>
      </View>
      <View style={{justifyContent:'center',alignItems:'center'}}>
      <View style={{height:80,width:80}}>
        <Image source={{ uri: `${qrImage}` }} resizeMode={'cover'} style={{height:'100%',width:'100%'}} />
      </View>
      </View>
      </ScrollView>
  )
  
}


const styles= StyleSheet.create({
   
    scrollView: {
        height: '75%',
      },
      sectionContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      scrollViewContent: {
        // margin: 16,
        padding: 16,
        justifyContent: 'center',
        // alignItems: 'center',
      },
    avatar: {
      marginHorizontal: 8,
    },
  })

export default withTheme(CustomModal)