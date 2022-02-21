import React, {Component} from 'react';
import {
  View,
  Image,
  TextInput,
  ImageBackground,
  Modal,
  TouchableOpacity,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {Container} from 'native-base';
import styles from './Styles';
import {colors, images, size, fontfamily} from '../../global/globalStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import MyButton from '../../components/button/Mybutton';
import {URL} from '../../../config.json';
import {getDriver, setDriver, driverError} from '../../redux/action/alldriver';
import {connect} from 'react-redux';
import {checkConnectivity} from '../../redux/action/connectivity';
import MyModal from '../../components/button/Mymodal';
import Loader from '../../components/button/Loader';
import Toast from 'react-native-simple-toast';
import Error from 'react-native-vector-icons/MaterialIcons';
import Close from 'react-native-vector-icons/SimpleLineIcons';
import AsyncStorage from '@react-native-community/async-storage';
import {getDeviceId} from 'react-native-device-info';
import {getLogin, setLogin, loginError} from '../../redux/action/login';
import CustomStatusBar from '../../components/StatusBar';
import Text from '../../components/Text';

import {PrettyPrintJSON, randomHash} from '../../utils/helperFunctions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible_alert: false,
      selectedDriver: '',
      loginStatus: false,
      data: [],
      visible: false,
      error_pin: false,
      pin: '',
      message: '',
    };
  }

  async alldriver() {
    let url = URL + 'getAllDrivers';
    const requestOptions = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    this.props.getDriver();
    try {
      let apiCall = await fetch(url, requestOptions);
      let responseData = await apiCall.json();
      if (responseData.response == 1) {
        const data = responseData.data;

        const driver = [];
        for (let i = 0; i < data.length; i++) {
          let obj = {
            label: data[i].name,
            value: data[i].id,
            id: data[i].id,
            appversion: data[i].appversion,
            deviceid: data[i].deviceid,
            driver_status: data[i].driver_status,
            ip: data[i].ip,
            mobile: data[i].mobile,
            pincode: data[i].pincode,
            token: data[i].token,
            type: data[i].type,
          };
          driver.push(obj);
        }
        this.props.setDriver(driver);
      } else {
        this.props.driverError(responseData.message);
      }
    } catch (error) {
      console.log(error);
      this.props.driverError(error);
    }
  }

  async loginHandle() {
    const {data, pin, selectedDriver} = this.state;

    const hash = randomHash();

    console.log({hash});

    let url = URL + 'loginDriver';

    this.setState({loginStatus: true});

    if (selectedDriver !== '' && pin !== '') {
      const params = {
        id: data[0]?.id,
        name: data[0]?.label,
        driver_status: data[0]?.driver_status,
        token: hash,
        ip: data[0]?.ip, // Todo: handle IP
        appversion: '1.0',
        deviceid: getDeviceId(),
        type: data[0]?.type,
        pincode: pin,
        mobile: data[0]?.mobile,
      };

      PrettyPrintJSON({params});

      const requestOptions = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      };

      this.props.getLogin();

      if (this.props.netConnection.data == true) {
        try {
          let apiCall = await fetch(url, requestOptions);
          let responseData = await apiCall.json();

          console.log(JSON.stringify({responseData}, null, 4));

          if (responseData.response === 1) {
            this.validation();

            const token = responseData.data.token;
            const data = responseData.data;

            console.log({token});

            this.props.setLogin(data);

            AsyncStorage.setItem('token', token);

            this.props.navigation.navigate('Home');

            Toast.show(responseData.message);

            console.log(responseData.message);

            this.setState({loginStatus: false});
          } else {
            this.loginModal(!this.state.visible);

            this.setState({message: responseData.message});

            this.props.loginError(responseData.message);

            this.setState({loginStatus: false});
          }
        } catch (error) {
          console.log(error);

          this.props.loginError(error);

          this.setModalVisible(!this.state.modalVisible_alert);

          this.setState({loginStatus: false});
        }
      } else {
        this.setModalVisible(!this.state.modalVisible_alert);

        this.setState({loginStatus: false});
      }
    } else {
      this.validation();

      console.log({pin, selectedDriver});

      this.setState({loginStatus: false});
    }
  }

  validation() {
    if (this.state.selectedDriver == '') {
      Toast.show('Select Driver');
    }
    if (this.state.pin != '') {
      this.setState({error_pin: false});
    } else {
      this.setState({error_pin: true});
    }
  }

  getDetail(value) {
    var data = this.props.allDriver.data.filter(x => x.id === value);
    console.log({data});
    this.setState({data});
  }

  connection() {
    if (this.props.netConnection.data == false) {
      this.setModalVisible(!this.state.modalVisible_alert);
    }
  }

  componentDidMount() {
    this.alldriver();
    //  console.log("netconnection",this.props.netConnection)
    if (this.props.netConnection.data == false) {
      this.setModalVisible(!this.state.modalVisible_alert);
    }
    this.getToken();
  }

  getToken = async () => {
    try {
      let data = await AsyncStorage.getItem('token');
      if (data != '' && data != null && data != 'undefined') {
        this.props.navigation.navigate('Home');
      } else {
        this.props.navigation.navigate('Login');
      }
    } catch (error) {
      this.props.navigation.navigate('Login');
      console.log('Something went wrong', error);
    }
  };

  UNSAFE_componentWillMount() {
    this.props.checkConnectivity();
  }

  dataConnection() {
    console.log('calling net', this.props.netConnection);
    this.props.checkConnectivity();
    if (this.props.netConnection.data == false) {
      this.setState({modalVisible_alert: true});
    } else {
      this.setState({modalVisible_alert: false});
    }
  }

  setModalVisible = visible => {
    this.setState({modalVisible_alert: visible});
  };

  loginModal = visible => {
    this.setState({visible: visible});
  };

  render() {
    return (
      <Container style={styles.container}>
        <CustomStatusBar />

        <ImageBackground
          blurRadius={1}
          source={images.bg}
          style={styles.container}>
          {this.props.allDriver.loading == false ? (
            <View style={styles.content}>
              <View style={styles.center}>
                <Image style={styles.logo} source={images.logo} />
              </View>

              <View style={styles.pickersty}>
                <RNPickerSelect
                  placeholder={{
                    label: 'Select Driver',
                    value: null,
                  }}
                  textInputProps={{
                    allowFontScaling: false
                  }}
                  items={this.props.allDriver.data}
                  onValueChange={value => {
                    this.setState({selectedDriver: value});
                    console.log({value});
                    this.getDetail(value);
                  }}
                  useNativeAndroidPickerStyle={false}
                  style={pickerStyle}
                  Icon={() => {
                    return <Icon name="chevron-down" size={13} color="#000" />;
                  }}
                />
              </View>

              <View>
                <TextInput
                  placeholder="Enter Pin"
                  style={styles.input}
                  selectionColor="#fff"
                  placeholderTextColor="#fff"
                  value={this.state.pin}
                  onChangeText={pin => this.setState({pin})}
                />
                {this.state.error_pin == true ? (
                  <Error
                    name="error"
                    color="red"
                    size={25}
                    style={styles.iconsty}
                  />
                ) : null}
              </View>

              <View style={styles.mt}>
                <MyButton
                  title="Login"
                  onPress={() => {
                    this.loginHandle();
                  }}
                />
              </View>
            </View>
          ) : (
            <Loader />
          )}
        </ImageBackground>
        <View style={styles.overlay} />

        <MyModal
          visible={this.state.modalVisible_alert}
          title="Retry"
          onPress={() => this.dataConnection()}
          onBackdropPress={() =>
            this.setModalVisible(!this.state.modalVisible_alert)
          }
          onRequestClose={() =>
            this.setModalVisible(!this.state.modalVisible_alert)
          }
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.visible}
          onBackdropPress={() => this.loginModal(!this.state.visible)}
          onRequestClose={() => this.loginModal(!this.state.visible)}>
          <View style={[styles.center, styles.container]}>
            <View style={styles.modalView}>
              <Close name="close" size={50} color={colors.dangerlight} />
              <View>
                <Text style={styles.title}>Please try again!</Text>

                <Text style={styles.subtitle}>{this.state.message}</Text>
              </View>

              <TouchableOpacity
                onPress={() => this.loginModal(!this.state.visible)}
                style={styles.btnsty}>
                <Text style={[styles.title, {color: '#fff'}]}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {this.state.loginStatus == true && <Loader />}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  allDriver: state.allDriver,
  netConnection: state.netConnection,
});

const mapDispatchToProps = dispatch => ({
  setDriver: data => dispatch(setDriver(data)),
  driverError: error => dispatch(driverError(error)),
  getDriver: () => dispatch(getDriver()),
  setLogin: data => dispatch(setLogin(data)),
  loginError: error => dispatch(loginError(error)),
  getLogin: () => dispatch(getLogin()),
  checkConnectivity: () => dispatch(checkConnectivity()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const pickerStyle = {
  inputIOS: {
    color: '#000',
    fontSize: size.title,
    //   fontFamily: fontfamily.roboto
  },
  inputAndroid: {
    color: '#000',
    fontSize: size.title,
    fontFamily: fontfamily.medium,
    // borderWidth: 2
    paddingHorizontal: 10,
    backgroundColor: colors.warning,
  },
  iconContainer: {
    top: 12,
    right: 10,
  },
  placeholder: {
    color: '#000',
  },
};
