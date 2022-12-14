import {StyleSheet, Platform, Dimensions} from 'react-native';
import {fontfamily, size, colors} from '../../global/globalStyle';
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
    backgroundColor: '#fff',
  },
  text: {
    fontSize: size.label,
    fontFamily: fontfamily.medium,
    color: '#000',
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
  borderStyle: {borderColor: '#000', borderWidth: 2},
  head: {backgroundColor: '#fff'},
  text: {
    padding: 3,
    textAlign: 'center',
    fontSize: size.subtitle,
    textTransform: 'uppercase',
    fontFamily: fontfamily.bold,
  },
  textCell: {
    padding: 3,
    textAlign: 'center',
    fontSize: size.subtitle,
    textTransform: 'capitalize',
    fontFamily: fontfamily.medium,
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    position: 'relative',
    justifyContent: 'center',
  },
  checkMark: {
    position: 'absolute',
    alignSelf: 'center',
  },
  btn: {width: 58, backgroundColor: '#78B7BB', borderRadius: 2},
  btnText: {
    textAlign: 'center',
    color: '#000',
    fontSize: size.label,
    fontFamily: fontfamily.regular,
  },
  btnsty: {
    padding: 10,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: 250,
  },
  mybtnText: {
    color: '#000',
    fontSize: size.subtitle,
    fontFamily: fontfamily.medium,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 0,
    // paddingHorizontal: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: Platform.OS == 'android' ? 1 : 0.2,
    shadowRadius: 4,
    elevation: Platform.OS == 'android' ? 5 : 0,
    width: 300,

    borderRadius: 10,
  },
  successtxt: {
    fontFamily: fontfamily.light,
    fontSize: 26,
    color: '#000',
    marginTop: 10,
  },
  okbtn: {
    backgroundColor: colors.primarylight,
    borderRadius: 5,
    paddingHorizontal: 30,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },

  // shipping

  shippingCont: {
    backgroundColor: '#fff',
    width: '95%',
    alignSelf: 'center',
    padding: 10,
    marginVertical: 30,
    borderRadius: 5,
  },

  flexRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  shippingHead: {
    alignSelf: 'center',
    marginBottom: 20,
  },

  shippingTitle: {
    color: colors.textDark,
    fontSize: size.title,
    fontWeight: '800',
    fontFamily: 'Roboto-Bold',
  },

  shippingHeadingsCont: {
    // width: '30%',
    // backgroundColor: 'blue'
  },

  shippingValuesCont: {
    width: '50%',
    // backgroundColor: 'red',
  },

  signCont: {
    backgroundColor: '#fff',
    padding: 10,
    width: '95%',
    borderRadius: 3,
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default styles;
