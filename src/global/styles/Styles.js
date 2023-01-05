import {StyleSheet, Platform, Dimensions} from 'react-native';
import {size, family} from '../fonts/Font';
import {colors} from '../theme/Theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flex: {flex: 1},
  row: {flexDirection: 'row'},
  pd20: {padding: 20},
  pd_H20: {paddingHorizontal: 20},
  mt_v: {marginVertical: 10},

  wdh60: {width: '60%'},
  wdh50: {width: '50%'},
  wdh40: {width: '40%'},

  center: {justifyContent: 'center', alignItems: 'center', flex: 1},
  align_C: {alignItems: 'center'},
  align_E: {alignItems: 'flex-end'},
  justify_C: {justifyContent: 'center'},
  justify: {justifyContent: 'flex-end'},
  justify_S: {justifyContent: 'space-between'},
  justify_A: {justifyContent: 'space-around'},

  txAlignC: {textAlign: 'center'},
  txAlignJ: {textAlign: 'justify'},
  txAlignR: {textAlign: 'right'},
  txAlignL: {textAlign: 'left'},

  txCap: {textTransform: 'capitalize'},

  txDecor: {textDecorationLine: 'underline'},

  tx12: {
    fontSize: size.label,
    color: colors.warning,
    fontFamily: family.light,
  },
  tx14: {
    fontSize: size.subtitle,
    color: colors.black,
    fontFamily: family.regular,
  },
  tx16: {
    fontSize: size.title,
    color: colors.black,
    fontFamily: family.medium,
  },
  tx18: {
    fontSize: size.subheading,
    color: '#000',
    fontFamily: family.bold,
  },
  tx20: {
    fontSize: size.heading,
    color: colors.black,
    fontFamily: family.bold,
  },
  tx28: {
    fontSize: 24,
    color: colors.black,
    fontFamily: family.bold,
  },
  box: {
    borderRightWidth: 1,
    borderColor: '#000',
    // alignItems:'center'
  },
  box2: {
    borderLeftWidth: 1,
    borderColor: '#000',
    // alignItems:'center'
  },
  input: {
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colors.grey,
    height: 35,
    fontSize: size.label,
    color: colors.warning,
    fontFamily: family.light,
    width:"60%"
    // paddingHorizontal: 10,
  },
});
