import {StyleSheet, Platform} from 'react-native';
import {paddingTop} from 'styled-system';
import {colors, fontfamily, size} from '../../global/globalStyle';

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
    height: '10%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'transparent',
    elevation: 0,
    marginTop: 30,
  },
  rightbox: {
    borderColor: '#000',
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 3,
    backgroundColor: '#fff',
  },
  head: {height: 40, backgroundColor: '#fff'},
  text: {
    textAlign: 'center',
    fontSize: size.subtitle,
    fontFamily: fontfamily.bold,
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    // height:50,
  },
  btn: {width: 58, backgroundColor: '#78B7BB', borderRadius: 2},
  btnText: {
    textAlign: 'center',
    color: '#000',
    fontSize: size.label,
    fontFamily: fontfamily.regular,
  },
  input: {
    color: '#000',
    fontSize: size.label,
    fontFamily: fontfamily.regular,
  },
  borderStyle: {borderColor: '#000', borderWidth: 2},
  yesbtn: {
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  nobtn: {
    backgroundColor: colors.dangerlight,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: size.label,
    fontFamily: fontfamily.medium,
    paddingLeft: 5,
    textTransform: 'uppercase',
  },
  formLabal: {
    fontSize: size.subtitle,
    fontFamily: fontfamily.medium,
    color: '#000',
  },
  textinput: {
    fontSize: size.subtitle,
    fontFamily: fontfamily.medium,
    paddingLeft: 15,
    paddingRight: 30,
    borderRadius: 2,
    borderColor: '#000',
    borderWidth: 2,
    height: 40,
    backgroundColor: '#fff',
  },
  mt20: {
    marginTop: 20,
  },
  accptbtn: {
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#000',
    padding: 10,
    marginLeft: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accptbtntxt: {
    fontSize: size.subtitle,
    fontFamily: fontfamily.medium,
    color: '#000',
  },
  iconsty: {
    position: 'absolute',
    top: 10,
    right: 10,
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
