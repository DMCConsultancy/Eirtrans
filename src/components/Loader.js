import React from 'react';
import {
  useWindowDimensions,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { colors } from '../global/theme/Theme';
import st from '../global/styles/Styles';

const Loader = ({visible = false}) => {
  const {width, height} = useWindowDimensions();
  return (
    visible && (
      <View style={[style.container, {height, width}]}>
        <View style={style.loader}>
          <ActivityIndicator size="large" color={colors.success} />
          <Text style={[st.tx16,{marginLeft: 10}]}>Loading...</Text>
        </View>
      </View>
    )
  );
};

const style = StyleSheet.create({
  loader: {
    height: 70,
    backgroundColor: colors.light,
    marginHorizontal: 50,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  container: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems:'center'
  },
});

export default Loader;