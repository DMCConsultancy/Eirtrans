import {StyleSheet, Dimensions, Platform} from 'react-native';
var {width} = Dimensions.get('window');

import {colors, size, fontfamily} from '../../global/globalStyle';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 50,
    alignSelf: 'center',
  },
  logo: {
    width: width * 0.8,
    height: width * 0.4,
    resizeMode: 'contain',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickersty: {
    // width: '100%',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    marginTop: 40,
    height: 45,
    // maxWidth: 576,
  },
  input: {
    backgroundColor: '#666',
    height: 45,
    color: '#ffff',
    fontSize: size.subtitle,
    fontFamily: fontfamily.medium,
    paddingHorizontal: 10,
    marginTop: 40,
    borderRadius: 4,
    letterSpacing: 1,
  },
  overlay: {
    // ...StyleSheet.absoluteFillObject,
    // backgroundColor: 'rgba(69,85,117,0.7)',
    //  backgroundColor: 'rgba(255,255,255,0.2)'
  },
  mt: {
    marginTop: 90,
  },
  iconsty: {
    position: 'absolute',
    top: 50,
    right: 0,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#fff',
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: Platform.OS == 'android' ? 1 : 0.2,
    shadowRadius: 4,
    elevation: Platform.OS == 'android' ? 5 : 0,
    width: width - 80,
    borderRadius: 15,
  },
  title: {
    fontFamily: fontfamily.regular,
    fontSize: size.title,
    color: '#000',
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fontfamily.regular,
    fontSize: size.subtitle,
    color: '#777',
    textAlign: 'center',
    marginTop: 10,
  },
  btnsty: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primarylight,
    borderRadius: 5,
    marginTop: 15,
  },
});

export default styles;
