import React from 'react';
import {StyleSheet, TouchableOpacity, Image, View} from 'react-native';
import {colors, size, fontfamily} from '../../global/globalStyle';

import Text from '../Text';

TouchableOpacity.defaultProps = {activeOpacity: 0.8};

const MyButton = ({
  onPress,
  title,
  backgroundColor,
  disabled,
  color,
  textTransform,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.appButtonContainer, backgroundColor && {backgroundColor}]}
    disabled={disabled}>
    <Text
      style={[
        styles.appButtonText,
        color && {color},
        textTransform && {textTransform},
      ]}>
      {title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  img: {
    position: 'absolute',
    left: 25,
  },
  appButtonContainer: {
    backgroundColor: colors.dangerlight,
    paddingVertical: 12,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 5,
    height: 45,
  },
  appButtonText: {
    fontSize: size.subtitle,
    color: '#fff',
    fontFamily: fontfamily.bold,
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});

export default MyButton;
