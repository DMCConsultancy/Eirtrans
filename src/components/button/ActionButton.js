import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {fontfamily, size} from '../../global/globalStyle';

import Text from '../Text';

export const ActionButton = ({onPress, title, containerStyle, btnStyle}) => {
  return (
    <View style={[{alignItems: 'center'}, containerStyle]}>
      <TouchableOpacity onPress={onPress} style={[styles.btnsty, btnStyle]}>
        <Text style={styles.btnText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btnsty: {
    padding: 10,
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: '#fff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: 250,
  },
  btnText: {
    color: '#000',
    fontSize: size.subtitle,
    fontFamily: fontfamily.medium,
  },
});
