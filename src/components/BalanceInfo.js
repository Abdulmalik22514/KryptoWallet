import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS, icons, SIZES} from '../constants';

const BalanceInfo = ({title, displayAmount, changePct, containerStyle}) => {
  return (
    <View style={{...containerStyle}}>
      {/* Title */}
      <Text style={{...FONTS.h3, color: COLORS.white}}>{title}</Text>
      {/* Figures */}
      <View style={styles.figuresConatiner}>
        <Text style={{...FONTS.h3, color: COLORS.lightGray3}}>$</Text>
        <Text
          style={{marginLeft: SIZES.base, ...FONTS.h2, color: COLORS.white}}>
          {displayAmount.toLocaleString()}
        </Text>
        <Text style={{...FONTS.h3, color: COLORS.lightGray3}}>USD</Text>
      </View>
      {/* Change Percentage */}
      <View style={styles.changePct}>
        {changePct != 0 && (
          <Image
            source={icons.upArrow}
            style={{
              width: 10,
              height: 10,
              alignSelf: 'center',
              tintColor: changePct > 0 ? COLORS.lightGreen : COLORS.red,
              transform:
                changePct > 0 ? [{rotate: '45deg'}] : [{rotate: '125deg'}],
            }}
          />
        )}
        <Text
          style={{
            marginLeft: SIZES.base,
            alignSelf: 'flex-end',
            ...FONTS.h4,
            color:
              changePct === 0
                ? COLORS.lightGray3
                : changePct > 0
                ? COLORS.lightGreen
                : COLORS.red,
          }}>
          {changePct.toFixed(2)}%
        </Text>

        <Text
          style={{
            marginLeft: SIZES.base,
            alignSelf: 'flex-end',
            color: COLORS.lightGray3,
            ...FONTS.h5,
          }}>
          7d Change
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  figuresConatiner: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  displayAmount: {
    color: COLORS.white,
    fontSize: 22,
    lineHeight: 30,
    marginLeft: 8,
    fontWeight: '600',
  },
  usd: {
    color: COLORS.lightGray3,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
  },
  changePct: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});

export default BalanceInfo;
