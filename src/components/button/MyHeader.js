import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import st from '../../global/styles/Styles';
import {colors} from '../../global/theme/Theme';

const Header = ({title, onPress}) => {
  return (
    <View style={[{backgroundColor:colors.orange},st.pd20, st.align_C]}>
      <Text style={[st.tx28,{color:colors.white}, st.txAlignC]}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
