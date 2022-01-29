import {StyleSheet, Platform, Dimensions} from 'react-native';
import {colors, fontfamily, size} from '../../global/globalStyle';
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
  row: {
    flexDirection: 'row',
  },
  wdh90: {
    width: '85%',
  },
  wdh10: {
    width: '15%',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 0,
    padding: 20,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: Platform.OS == 'android' ? 1 : 0.2,
    shadowRadius: 4,
    elevation: Platform.OS == 'android' ? 5 : 0,
    width: 350,
    borderRadius: 10,
  },
  modalViewscreen: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 0,
    padding: 20,
    //  alignItems: "center",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: Platform.OS == 'android' ? 1 : 0.2,
    shadowRadius: 4,
    elevation: Platform.OS == 'android' ? 5 : 0,
    width: width - 20,
    height: height - 40,
    borderRadius: 10,
  },
  iconContainer: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderLeftColor: '#ccc',
    borderLeftWidth: 1.5,
    marginLeft: -4,
    height: 45,
  },

  linkCont: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    marginTop: 30,
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  link: {
    textDecorationLine: 'underline',
    color: colors.danger,
    fontWeight: '700',
  },
  formLabal: {
    fontSize: size.label,
    fontFamily: fontfamily.regular,
    color: '#fff',
  },
  formLabalHeading: {
    fontSize: size.heading,
    fontFamily: fontfamily.regular,
    color: '#fff',
  },
  imageShot: {
    width: '100%',
    height: '90%',
    resizeMode: 'contain',
  },
  sendScreenbtn: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.success,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 5,
    marginTop: 10,
  },
  heading: {
    fontFamily: fontfamily.medium,
    fontSize: 24,
    color: '#000',
  },
  mt20: {
    marginTop: 20,
  },

  successtxt: {
    fontFamily: fontfamily.regular,
    fontSize: 26,
    color: '#000',
    marginTop: 10,
  },
  mytxt: {
    fontFamily: fontfamily.regular,
    fontSize: size.subtitle,
    color: '#777',
    marginTop: 10,
  },
  okbtn: {
    backgroundColor: colors.primarylight,
    borderRadius: 5,
    paddingHorizontal: 30,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default styles;
