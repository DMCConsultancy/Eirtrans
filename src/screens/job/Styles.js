import {StyleSheet, Platform, Dimensions} from 'react-native';
import {fontfamily, size} from '../../global/globalStyle';
var {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  arrow: {
    width: 20,
    height: 20,
  },
  headersty: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
  rightbox: {
    borderColor: '#000',
    borderWidth: 1.5,
    paddingHorizontal: 20,
    paddingVertical: 3,
    borderRadius: 3,
  },
  text: {
    fontSize: size.subtitle,
    fontFamily: fontfamily.bold,
    color: '#000',
    textTransform: 'uppercase',
  },
  logo: {
    width: width * 0.8,
    height: width * 0.4,
    resizeMode: 'contain',
    marginTop: 20,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
