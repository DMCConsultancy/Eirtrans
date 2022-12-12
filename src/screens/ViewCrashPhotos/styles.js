import {StyleSheet} from 'react-native';
import {colors, fontfamily, size} from '../../global/globalStyle';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.skyblue,
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
  },

  itemCont: {
    width: '100%',
    height: 300,
  },

  imgsty: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },

  label: {
    fontSize: size.heading,
    fontFamily: fontfamily.bold,
    color: '#000',
  },

  labelCont: {
    paddingHorizontal: 15,
    marginTop: 20,
  },

  nullCont: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    marginVertical: 30,
  },
  nullContText: {
    textAlign: 'center',
    fontSize: size.heading,
    fontFamily: fontfamily.bold,
    color: colors.danger,
  },
});
