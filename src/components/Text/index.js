import React from 'react';
import {Text} from 'react-native';

const DefaultText = ({children, ...props}) => {
  return (
    <Text {...props} allowFontScaling={false}>
      {children}
    </Text>
  );
};

export default DefaultText;
