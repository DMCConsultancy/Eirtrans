import React from 'react';
import {TouchableOpacity, Text, Image} from 'react-native';
import {colors} from '../../global/theme/Theme';
import st from '../../global/styles/Styles';

const Button = ({title, uri, disabled, onPress = () => {}}) => {
  return (
    <TouchableOpacity
      // disabled={disabled == '0' ? false : true}
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
          flexDirection: 'row',
        },
      ]}>
      {uri && (
        <Image
          source={{uri: uri}}
          style={{width: 25, height: 25, marginRight: 10}}
        />
      )}
      <Text style={[st.tx18, {color: colors.white}]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
