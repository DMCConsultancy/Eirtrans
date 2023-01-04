import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {colors} from '../../global/theme/Theme';
import st from '../../global/styles/Styles';

const Button = ({title, onPress = () => {}}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        {
          marginVertical: 15,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 30,
          height: 50,
          backgroundColor: colors.orange,
        },
      ]}>
      <Text style={[st.tx18, {color: colors.white}]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
