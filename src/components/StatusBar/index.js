import React from 'react';
import {StatusBar} from 'react-native';

const CustomStatusBar = () => {
  return (
    <StatusBar
      barStyle="dark-content"
      translucent={true}
      backgroundColor={'transparent'}
    />
  );
};

export default CustomStatusBar;
