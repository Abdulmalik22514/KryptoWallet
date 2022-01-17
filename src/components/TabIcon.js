import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS} from '../constants';

const TabIcon = ({focused, icon, iconStyle, label, isTrade}) => {
  if (isTrade) {
    return (
      <View style={styles.tradeContainer}>
        <Image
          source={icon}
          resizeMode="contain"
          style={{
            width: 25,
            height: 25,
            tintColor: COLORS.white,
            ...iconStyle,
          }}
        />
        <Text style={{color: COLORS.white}}>{label}</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.tabContainer}>
        <Image
          source={icon}
          resizeMode="contain"
          style={{
            width: 25,
            height: 25,
            tintColor: focused ? COLORS.white : COLORS.secondary,
            ...iconStyle,
          }}
        />
        <Text
          style={{
            color: focused ? COLORS.white : COLORS.secondary,
          }}>
          {label}
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  tabContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tradeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    backgroundColor: COLORS.black,
    borderRadius: 30,
  },
});

export default TabIcon;
