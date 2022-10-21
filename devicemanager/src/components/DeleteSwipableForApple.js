import React, { Component } from 'react';
import { Animated, StyleSheet, Text, View, I18nManager } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
export default class AppleStyleSwipeableRow extends Component {
    constructor(props) {
        super(props);
        this.renderLeftActions = (_progress, dragX) => {
            const trans = dragX.interpolate({
                inputRange: [0, 50, 100, 101],
                outputRange: [-20, 0, 0, 1],
                extrapolate: 'clamp',
            });
            return (<RectButton style={styles.leftAction} onPress={()=>{

                this.close();
                return props.onPressDelete()
                }}>
        <Animated.Text style={[
                    styles.actionText,
                    {
                        transform: [{ translateX: trans }],
                    },
                ]}>
                    
          Delete
        </Animated.Text>
      </RectButton>);
        };
     //   // right swipe disabled only left for delete is worlking
    //     this.renderRightAction = (text, color, x, progress) => {
    //         const trans = progress.interpolate({
    //             inputRange: [0, 1],
    //             outputRange: [x, 0],
    //         });
    //         const pressHandler = () => {
    //             this.close();
    //             // eslint-disable-next-line no-alert
    //             console.log('text');
    //         };
    //         return (<Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
    //     <RectButton style={[styles.rightAction, { backgroundColor: color }]} onPress={pressHandler}>
    //       <Text style={styles.actionText}>{text}</Text>
    //     </RectButton>
    //   </Animated.View>);
    //     };
    //     this.renderRightActions = (progress, _dragAnimatedValue) => (<View style={{
    //             width: 192,
    //             flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    //         }}>
    //   {this.renderRightAction('More', '#C8C7CD', 192, progress)}
    //   {this.renderRightAction('Flag', '#ffab00', 128, progress)}
    //   {this.renderRightAction('More', '#dd2c00', 64, progress)}
    // </View>);
        this.updateRef = (ref) => {
            this.swipeableRow = ref;
        };
        this.close = () => {
            var _a;
            (_a = this.swipeableRow) === null || _a === void 0 ? void 0 : _a.close();
        };
    }
    render() {
        const { children } = this.props;
        return (<Swipeable ref={this.updateRef} friction={2}
             enableTrackpadTwoFingerGesture leftThreshold={30}
              rightThreshold={40} renderLeftActions={this.renderLeftActions} 
            // renderRightActions={this.renderRightActions} 
            onSwipeableOpen={(direction) => {
                console.log(`Opening swipeable from the ${direction}`);
            }} onSwipeableClose={(direction) => {
                console.log(`Closing swipeable to the ${direction}`);
            }}>
        {children}
      </Swipeable>);
    }
}
const styles = StyleSheet.create({
    leftAction: {
        flex: 1,
        backgroundColor: '#497AFC',
        justifyContent: 'center',
    },
    actionText: {
        color: 'white',
        fontSize: 16,
        backgroundColor: 'transparent',
        padding: 10,
    },
    rightAction: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
});