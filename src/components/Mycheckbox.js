import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CheckBox from '@react-native-community/checkbox';
import {colors} from '../global/theme/Theme';
import st from '../global/styles/Styles';

const Mycheckbox = ({onValueChange, value, title}) => {
  return (
    <View style={[st.row, st.mt_v]}>
      <View style={[st.wdh60]}>
        <Text style={[st.tx20, st.txAlignC]}>{title}</Text>
      </View>
      <View style={st.wdh40}>
        <CheckBox
          style={{transform: [{scaleX: 1.5}, {scaleY: 1.5}]}}
          disabled={false}
          tintColors={{true: colors.orange}}
          onCheckColor={colors.orange}
          value={value}
          onValueChange={onValueChange}
        />
      </View>
    </View>
  );
};

export default Mycheckbox;

const styles = StyleSheet.create({});
