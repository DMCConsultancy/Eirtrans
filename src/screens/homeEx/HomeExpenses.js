import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  Image,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {Container, Left, Right} from 'native-base';
import Arrow from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './Styles';
import RNPickerSelect from 'react-native-picker-select';
import {colors, images, size, fontfamily} from '../../global/globalStyle';
import DatePicker from 'react-native-datepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Success from 'react-native-vector-icons/SimpleLineIcons';

import CustomStatusBar from '../../components/StatusBar';
import Header from '../../components/Header';
export default class Expenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expense: '',
      dob: '',
      show: false,
      modalVisible_alert1: false,
      isDatePickerVisible: false,
      time: new Date(),
      modal_alert: false,
    };
  }

  showDatePicker = () => {
    this.setState({isDatePickerVisible: true});
  };

  hideDatePicker = () => {
    this.setState({isDatePickerVisible: false});
  };

  handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    this.hideDatePicker();
    this.setState({time: date});
  };

  time(time) {
    // console.log({time})
    const date = new Date(time);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var strTime = hours + ':' + minutes;
    return strTime;
  }

  requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  chooseFile = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        console.log('source', source);
      }
    });
  };

  chooseFileCamera = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    let isCameraPermitted = this.requestCameraPermission();
    let isStoragePermitted = this.requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        console.log('base64 -> ', response);
      });
    }
  };

  screenShotModal = visible => {
    this.setState({modal_alert: visible});
  };

  setModalVisible1 = visible => {
    this.setState({modalVisible_alert1: visible});
  };

  render() {
    return (
      <Container style={[styles.container, {backgroundColor: colors.skyblue}]}>
        <CustomStatusBar />
        <Header>
          <Left>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image
                source={images.arrow}
                style={styles.arrow}
                tintColor={colors.textDark}
              />
            </TouchableOpacity>
          </Left>
          <Right></Right>
        </Header>
        <View style={styles.content}>
          <View>
            <Text style={styles.title}>Expense Type</Text>
            <RNPickerSelect
              placeholder={{
                label: 'Expense Type',
                value: null,
              }}
              items={items}
              onValueChange={value => console.log(value)}
              useNativeAndroidPickerStyle={false}
              style={pickerStyle}
              Icon={() => {
                return <Icon name="chevron-down" size={13} color="#000" />;
              }}
            />
          </View>

          <View style={styles.mt20}>
            <Text style={styles.title}>Expense Description</Text>
            <TextInput
              placeholder="Enter Exp Desc"
              style={styles.input}
              value={this.state.expense}
              onChangeText={expense => this.setState({expense})}
            />
          </View>

          <View style={styles.mt20}>
            <Text style={styles.title}>Amount</Text>
            <TextInput
              placeholder="Enter Amount"
              style={styles.input}
              value={this.state.amount}
              onChangeText={amount => this.setState({amount})}
            />
          </View>

          <View style={[styles.row, styles.mt20]}>
            <View style={{width: '50%'}}>
              <Text style={styles.title}>Date</Text>
              <DatePicker
                style={styles.datePicker}
                date={this.state.dob}
                mode="date"
                placeholder={'  '}
                format="DD/MM/YYYY"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                iconComponent={<Arrow name="calendar" size={18} color="#777" />}
                customStyles={datePickerStyle}
                onDateChange={dt => {
                  this.setState({dob: dt});
                }}
              />
            </View>

            <View style={{width: '50%'}}>
              <Text style={styles.title}>Time</Text>
              <View style={styles.datePicker}>
                <View style={styles.row}>
                  <View style={{width: '85%'}}>
                    <Text>{this.time(this.state.time)}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => this.setState({isDatePickerVisible: true})}
                    style={{width: '15%'}}>
                    <Arrow name="clock" size={20} color="#777" />
                  </TouchableOpacity>
                </View>
              </View>
              <DateTimePickerModal
                isVisible={this.state.isDatePickerVisible}
                mode="time"
                locale="en_GB" // Use "en_GB" here
                is24Hour={true}
                onConfirm={this.handleConfirm}
                onCancel={this.hideDatePicker}
              />
            </View>
          </View>

          <View style={[styles.row, styles.mt20]}>
            <View style={styles.boxcontainer}>
              <TouchableOpacity
                style={styles.box}
                onPress={() => {
                  this.screenShotModal(!this.state.modal_alert);
                  this.setState({show: false});
                }}>
                <Icon name="camera" size={60} />
                <Text style={styles.boxtxt}>Camera</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.boxcontainer}>
              <TouchableOpacity
                style={styles.box}
                onPress={() => {
                  this.screenShotModal(!this.state.modal_alert);
                  this.setState({show: true});
                }}>
                <Icon name="image" size={60} />
                <Text style={styles.boxtxt}>Gallery</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.boxcontainer}>
              <TouchableOpacity
                style={styles.box}
                onPress={() => {
                  this.setModalVisible1(!this.state.modalVisible_alert1);
                }}>
                <Icon name="arrow-up" size={60} />
                <Text style={styles.boxtxt}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modal_alert}
          onBackdropPress={() => this.screenShotModal(!this.state.modal_alert)}
          onRequestClose={() => {
            this.screenShotModal(!this.state.modal_alert);
          }}>
          <View style={styles.center}>
            <View style={styles.modalView}>
              <Text style={styles.title}>Add Photo!</Text>

              <View style={styles.mt20}>
                {this.state.show == false ? (
                  <TouchableOpacity
                    onPress={() => {
                      this.chooseFileCamera();
                      this.screenShotModal(!this.state.modal_alert);
                    }}>
                    <Text style={styles.boxtxt}>Take Photo</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      this.chooseFile();
                      this.screenShotModal(!this.state.modal_alert);
                    }}>
                    <Text style={styles.boxtxt}>Choose from Library</Text>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.mt20}>
                <TouchableOpacity
                  onPress={() => this.screenShotModal(!this.state.modal_alert)}>
                  <Text style={styles.boxtxt}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible_alert1}
          onBackdropPress={() =>
            this.setModalVisible1(!this.state.modalVisible_alert1)
          }
          onRequestClose={() => {
            this.setModalVisible1(!this.state.modalVisible_alert1);
          }}>
          <View style={styles.center}>
            <View style={[styles.modalView, {alignItems: 'center'}]}>
              <Success name="check" color={colors.primarylight} size={56} />
              <Text style={styles.successtxt}>Success!</Text>

              <TouchableOpacity
                style={styles.okbtn}
                onPress={() => {
                  this.setModalVisible1(!this.state.modalVisible_alert1);
                  this.props.navigation.navigate('Home');
                }}>
                <Text style={[styles.title, {color: '#fff'}]}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </Container>
    );
  }
}

const items = [
  {label: 'OIL', value: 'OIL'},
  {label: 'STORAGE', value: 'STORAGE'},
  {label: 'FUEL', value: 'FUEL'},
  {label: 'TOLL', value: 'TOLL'},
  {label: 'MISC', value: 'MISC'},
];

const pickerStyle = {
  inputIOS: {
    color: '#000',
    fontSize: size.subtitle,
    //   fontFamily: fontfamily.roboto
  },
  inputAndroid: {
    color: '#000',
    backgroundColor: '#fff',
    fontSize: size.subtitle,
    fontFamily: fontfamily.regular,
    borderWidth: 1.5,
    paddingHorizontal: 10,
    height: 45,
    marginTop: 15,
  },
  iconContainer: {
    top: 30,
    right: 10,
  },
  placeholder: {
    color: '#000',
  },
};

const datePickerStyle = {
  placeholderText: {
    color: '#242424',
    fontFamily: fontfamily.regular,
    fontSize: size.subtitle,
  },
  dateInput: {
    borderWidth: 0,
    alignItems: 'flex-start',
  },
  dateText: {
    fontFamily: fontfamily.regular,
    fontSize: size.subtitle,
    color: '#000',
  },
};
