import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {COLORS, FONTS, SIZES} from '../constants';

const IconTextButton = ({label, icon, onPress, containerStyle}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        ...containerStyle,
      }}
      onPress={onPress}>
      <Image source={icon} resizeMode="contain" style={styles.icon} />
      <Text style={{marginLeft: SIZES.base, ...FONTS.h3}}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.white,
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default IconTextButton;
