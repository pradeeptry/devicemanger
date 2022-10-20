import { StyleSheet } from 'react-native'
import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Surface, Avatar, Title, Caption, withTheme,useTheme } from 'react-native-paper'
import { shape, string, bool, func } from 'prop-types'
import { propTypes } from '../../constants'
import styles from './ListElement.styles'

const ListElement = ({ item, onPressListElement, onPressAddToFavorites, isFavorited, theme }) => {
  const { image, symbol } = item
  const currentPrice = item.current_price
  const priceChange = item.price_change_24h
  const { colors } = useTheme();

  return ((
    <TouchableOpacity
      onPress={onPressListElement}
      style={styles.surfaceContainer}
    >
      <Surface style={styles.surface}>
        <Avatar.Image style={styles.avatar} size={28} source={{ uri: image && image }} />
        <View style={styles.infoContainer}>
          <View style={styles.sectionContainer}>
            <Title
              numberOfLines={1}
              style={styles.coinName}
            >
              {symbol}
            </Title>
            <Title style={{ color: colors.accent }}>
              {' $'}
              {currentPrice}
            </Title>
          </View>
          <View style={styles.sectionContainer}>
            <Caption>Last 24h: </Caption>
            <Caption
              style={{ color: priceChange < 0 ? colors.error : colors.accent }}
            >
              {priceChange}
            </Caption>
          </View>
        </View>
        <TouchableOpacity hitSlop={{ x: 10, y: 10 }} onPress={onPressAddToFavorites}>
          <Avatar.Icon
            size={28}
            icon="star"
            style={[
              styles.avatar,
              { backgroundColor: isFavorited ? colors.accent : colors.disabled },
            ]}
          />
        </TouchableOpacity>
      </Surface>
    </TouchableOpacity>
  ))
}


export default withTheme(ListElement)
const styles = StyleSheet.create({
    infoContainer: {
      flexGrow: 1,
    },
    surfaceContainer: {
      width: '100%',
    },
    surface: {
      width: '100%',
      paddingVertical: 8,
      alignItems: 'center',
      flexDirection: 'row',
    },
    sectionContainer: {
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