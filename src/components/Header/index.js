import React from 'react';
import {StyleSheet, View} from 'react-native';

const Header = ({children, headerStyle}) => {
  return <View style={[styles.header, headerStyle]}>{children}</View>;
};

export default Header;

const styles = StyleSheet.create({
  header: {
    height: '10%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'transparent',
    elevation: 0,
    marginTop: 30,
  },
});
