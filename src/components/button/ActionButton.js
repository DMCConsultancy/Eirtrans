import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import {colors, fontfamily, size} from '../../global/globalStyle';

export const ActionButton = ({onPress, title}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <TouchableOpacity onPress={onPress} style={styles.btnsty}>
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
