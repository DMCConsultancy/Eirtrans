import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {images, colors, size, fontfamily} from '../global/globalStyle';
import {DrawerActions} from 'react-navigation-drawer';
import AsyncStorage from '@react-native-community/async-storage';
import {withNavigationFocus} from 'react-navigation';
import {connect} from 'react-redux';

import {URL} from '../../config.json';

import Text from '../components/Text';
import {isJSObj, PrettyPrintJSON} from '../utils/helperFunctions';

var {width} = Dimensions.get('window');
class CustomSidebarMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      count: null,
    };
  }

  componentDidMount = () => {
    this.getNotificationsCount();
  };

  componentDidUpdate(prevProps) {
    // console.log({isFocused: this.props.navigation.state.isDrawerOpen});
    if (
      prevProps.navigation.state.isDrawerOpen !==
      this.props.navigation.state.isDrawerOpen
    ) {
      if (this.props.navigation.state.isDrawerOpen) {
        console.log(
          'INFO: sidemenu component appeared',
          this.props.navigation.state.isDrawerOpen,
        );
        this.getNotificationsCount(true);
      }
    }
  }

  async getNotificationsCount(load = false) {
    let url = URL + 'getCountNotification';

    if (load) {
      this.setState({
        loading: load,
      });
    }

    const apiData = new FormData();

    apiData.append('driver_id', this.props.driverDetails.id);

    PrettyPrintJSON(apiData);

    const requestOptions = {
      method: 'POST',
      body: apiData,
    };

    try {
      let apiCall = await fetch(url, requestOptions);
      let responseData = await apiCall.json();
      if (responseData.response == 1) {
        const count =
          responseData.data &&
          Array.isArray(responseData.data) &&
          responseData.data.length
            ? isJSObj(responseData.data[0])
              ? responseData.data[0]['count(*)']
              : 0
            : 0;

        PrettyPrintJSON({count});

        this.setState({count, loading: false});
      } else {
        console.log(responseData.message);
        this.setState({loading: false});
      }
    } catch (error) {
      console.log(error);
      this.setState({loading: false});
    }
  }

  render() {
    const {count, loading} = this.state;

    return (
      <View style={styles.container}>
        <ScrollView>
          <Image style={styles.logo} source={images.logo} />

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.dispatch(DrawerActions.toggleDrawer());
              this.props.navigation.navigate('Home');
            }}
            style={styles.row}>
            <View style={styles.width20}>
              <Image source={images.home} style={styles.imagesty} />
            </View>
            <View style={styles.width80}>
              <Text style={styles.title}>Home</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.border} />

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Notification')}
            style={styles.row}>
            <View style={styles.width20}>
              <Image source={images.bell} style={styles.imagesty} />
            </View>
            <View style={[styles.width40]}>
              <Text style={styles.title}>Notification</Text>
            </View>
            {loading ? (
              <ActivityIndicator color={colors.danger} />
            ) : parseInt(count, 10) ? (
              <View style={[styles.width20, styles.countCont]}>
                <Text style={[styles.title, styles.count]}>{count}</Text>
              </View>
            ) : (
              <View />
            )}
          </TouchableOpacity>
          <View style={styles.border} />

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Expenses')}
            style={styles.row}>
            <View style={styles.width20}>
              <Image source={images.dollar} style={styles.imagesty} />
            </View>
            <View style={styles.width80}>
              <Text style={styles.title}>My Expense</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.border} />

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Contact')}
            style={styles.row}>
            <View style={styles.width20}>
              <Image source={images.contact} style={styles.imagesty} />
            </View>
            <View style={styles.width80}>
              <Text style={styles.title}>Contact Us</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.border} />

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('About')}
            style={styles.row}>
            <View style={styles.width20}>
              <Image source={images.group} style={styles.imagesty} />
            </View>
            <View style={styles.width80}>
              <Text style={styles.title}>About Us</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.border} />

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Terms')}
            style={styles.row}>
            <View style={styles.width20}>
              <Image source={images.terms} style={styles.imagesty} />
            </View>
            <View style={styles.width80}>
              <Text style={styles.title}>Terms & Condition</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.border} />

          <TouchableOpacity
            onPress={() => {
              AsyncStorage.clear();
              this.props.navigation.navigate('Login');
            }}
            style={styles.row}>
            <View style={styles.width20}>
              <Image source={images.logout} style={styles.imagesty} />
            </View>
            <View style={styles.width80}>
              <Text style={styles.title}>Logout</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.border} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
  },
  logo: {
    width: width * 0.73,
    height: width * 0.4,
    resizeMode: 'contain',
    marginTop: 10,
  },
  border: {
    height: 1,
    backgroundColor: '#ccc',
  },
  title: {
    fontSize: size.label,
    color: colors.dangerlight,
    fontFamily: fontfamily.regular,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 25,
    alignItems: 'center',
  },
  width20: {
    width: '20%',
    marginLeft: 20,
  },
  width80: {
    width: '80%',
  },
  width40: {
    width: '40%',
  },
  imagesty: {
    height: 25,
    width: 25,
  },

  countCont: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    color: '#fff',
    fontFamily: fontfamily.bold,
  },
});

const mapStateToProps = state => ({
  driverDetails: state.login.data,
});

export default connect(mapStateToProps)(withNavigationFocus(CustomSidebarMenu));
