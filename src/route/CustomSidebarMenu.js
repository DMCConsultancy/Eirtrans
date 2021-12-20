import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {images, colors, size, fontfamily} from '../global/globalStyle';
import {DrawerActions} from 'react-navigation-drawer';
import AsyncStorage from '@react-native-community/async-storage';

var {width, height} = Dimensions.get('window');
export default class CustomSidebarMenu extends Component {
  constructor() {
    super();
  }

  render() {
    const {navigate} = this.props.navigation.navigate;
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
            <View style={styles.width80}>
              <Text style={styles.title}>Notification</Text>
            </View>
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
  imagesty: {
    height: 25,
    width: 25,
  },
});
