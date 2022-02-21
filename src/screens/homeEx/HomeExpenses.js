import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  Image,
  Platform,
  PermissionsAndroid,
  Appearance,
  ActivityIndicator,
} from 'react-native';
import {Container, Left, Right, Toast} from 'native-base';
import Arrow from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './Styles';
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-datepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';

import CustomStatusBar from '../../components/StatusBar';
import Header from '../../components/Header';
import Text from '../../components/Text';

import {colors, images, size, fontfamily} from '../../global/globalStyle';

import {URL} from '../../../config.json';
import {connect} from 'react-redux';
import Loader from '../../components/button/Loader';
import {ValueEmpty} from '../../utils/validations';

const colorScheme = Appearance.getColorScheme();
class Expenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // expense data
      selectExpenseType: -1,
      expenseDesc: '',
      expenseDate: '',
      expenseAmount: '',
      time: new Date(),
      imageSource: null,
      // ===============

      submitLoading: false,

      show: false,
      success_modal: false,
      error_modal: false,

      isDatePickerVisible: false,
      modal_alert: false,
      expenseType: null,
      expenseTypeSelectData: null,
    };
  }

  componentDidMount = () => {
    this.getExpenseType();
  };

  getExpenseType = async () => {
    let url = URL + 'getAllExpenceType';

    const requestOptions = {
      method: 'GET',
    };

    try {
      let apiCall = await fetch(url, requestOptions);
      let responseData = await apiCall.json();

      if (responseData.response == 1) {
        const data = responseData.data;

        const selectData = data.map(ele => ({
          label: ele.name,
          value: ele.id,
        }));

        this.setState({expenseTypeSelectData: selectData, expenseType: data});
      } else {
        console.log(responseData.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  showDatePicker = () => {
    this.setState({isDatePickerVisible: true});
  };

  hideDatePicker = () => {
    this.setState({isDatePickerVisible: false});
  };

  handleTimePickerConfirm = date => {
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

        // console.log(JSON.stringify(source, null, 4));
        this.setState({
          imageSource: source.assets[0] || null,
        });
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
        let source = response;

        // console.log(JSON.stringify(response, null, 4));

        this.setState({
          imageSource: source.assets[0] || null,
        });
      });
    }
  };

  screenShotModal = visible => {
    this.setState({modal_alert: visible});
  };

  setSuccessModalVisibility = visible => {
    this.setState({success_modal: visible});
  };

  setErrorModalVisibility = visible => {
    this.setState({error_modal: visible});
  };

  getExpenseTypeNamebyID = expenseID => {
    const {expenseTypeSelectData} = this.state;

    return expenseTypeSelectData.find(ele => ele.value === expenseID)?.label;
  };

  validateFields = () => {
    const {
      selectExpenseType,
      expenseDesc,
      expenseAmount,
      expenseDate,
      time,
      imageSource,
    } = this.state;

    let result = true;

    if (selectExpenseType < -1) {
      result = false;
    }

    if (ValueEmpty(expenseDesc)) {
      result = false;
    }

    if (ValueEmpty(expenseAmount)) {
      result = false;
    }

    if (ValueEmpty(expenseDate)) {
      result = false;
    }

    if (ValueEmpty(time)) {
      result = false;
    }

    if (!imageSource) {
      result = false;
    }

    return result;
  };

  handleSubmit = async () => {
    const {
      selectExpenseType,
      expenseDesc,
      expenseAmount,
      expenseDate,
      time,
      imageSource,
    } = this.state;
    const {driverDetails} = this.props;

    // console.log(JSON.stringify({driverDetails}, null, 4));

    const apiUrl = `${URL}addMyExpence`;

    if (!this.validateFields()) {
      this.setErrorModalVisibility(true);
      return;
    }

    this.setState({
      submitLoading: true,
    });

    var apiData = new FormData();

    console.log({
      expense_type: this.getExpenseTypeNamebyID(selectExpenseType),
      expenseAmount,
    });

    apiData.append('description', expenseDesc);
    apiData.append('amount', expenseAmount);
    apiData.append('datatime', expenseDate);
    apiData.append('driver_id', driverDetails?.data.id);
    apiData.append('expence_type_id', selectExpenseType);
    apiData.append(
      'expence_type',
      this.getExpenseTypeNamebyID(selectExpenseType),
    );
    apiData.append('image', {
      uri: imageSource.uri,
      name: imageSource.fileName,
      type: imageSource.type,
    });

    // console.log({imgType: {
    //   uri: imageSource.uri,
    //   name: imageSource.fileName,
    //   type: imageSource.type,
    // }});

    // console.log(JSON.stringify({apiData}, null, 4));
    // return;

    var requestOptions = {
      method: 'POST',
      body: apiData,
      // redirect: 'follow',
    };

    const apiCall = await fetch(apiUrl, requestOptions);
    let responseData = await apiCall.json();

    console.log({responseData});

    if (responseData.response === 1) {
      this.setSuccessModalVisibility(!this.state.success_modal);

      this.setState({
        submitLoading: false,
      });
    } else {
      this.setState({
        submitLoading: false,
      });
      Toast.show({
        text: responseData.message,
      });
      console.log('error', {error});
    }
  };

  render() {
    const {expenseTypeSelectData, submitLoading} = this.state;

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
        {submitLoading ? (
          <Loader />
        ) : (
          <View style={styles.content}>
            <View>
              <Text style={styles.title}>Expense Type</Text>
              {expenseTypeSelectData ? (
                <RNPickerSelect
                  placeholder={{
                    label: 'Expense Type',
                    value: null,
                  }}
                  items={expenseTypeSelectData}
                  onValueChange={value =>
                    this.setState({selectExpenseType: value})
                  }
                  useNativeAndroidPickerStyle={false}
                  style={pickerStyle}
                  Icon={() => {
                    return <Icon name="chevron-down" size={13} color="#000" />;
                  }}
                />
              ) : (
                <ActivityIndicator color={colors.primary} size={'large'} />
              )}
            </View>

            <View style={styles.mt20}>
              <Text style={styles.title}>Expense Description</Text>
              <TextInput
                placeholder="Enter Exp Desc"
                style={styles.input}
                value={this.state.expenseDesc}
                onChangeText={expenseDesc => this.setState({expenseDesc})}
              />
            </View>

            <View style={styles.mt20}>
              <Text style={styles.title}>Amount</Text>
              <TextInput
                placeholder="Enter Amount"
                style={styles.input}
                value={this.state.expenseAmount}
                keyboardType="numeric"
                onChangeText={expenseAmount => this.setState({expenseAmount})}
              />
            </View>

            <View style={[styles.row, styles.mt20]}>
              <View style={{width: '50%'}}>
                <Text style={styles.title}>Date</Text>
                <DatePicker
                  style={styles.datePicker}
                  date={this.state.expenseDate}
                  mode="date"
                  placeholder={'  '}
                  format="DD/MM/YYYY"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  iconComponent={
                    <Arrow name="calendar" size={18} color="#777" />
                  }
                  customStyles={datePickerStyle}
                  onDateChange={dt => {
                    this.setState({expenseDate: dt});
                  }}
                />
              </View>

              <View style={{width: '50%'}}>
                <Text style={styles.title}>Time</Text>
                <View style={styles.datePicker}>
                  <TouchableOpacity
                    style={styles.row}
                    onPress={() => this.setState({isDatePickerVisible: true})}>
                    <View style={{width: '85%'}}>
                      <Text>{this.time(this.state.time)}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => this.setState({isDatePickerVisible: true})}
                      style={{width: '15%'}}>
                      <Arrow name="clock" size={20} color="#777" />
                    </TouchableOpacity>
                  </TouchableOpacity>
                </View>
                <DateTimePickerModal
                  isVisible={this.state.isDatePickerVisible}
                  mode="time"
                  locale="en_GB" // Use "en_GB" here
                  is24Hour={true}
                  onConfirm={this.handleTimePickerConfirm}
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
                    this.handleSubmit();
                  }}>
                  <Icon name="arrow-up" size={60} />
                  <Text style={styles.boxtxt}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modal_alert}
          style={{backgroundColor: 'red'}}
          onBackdropPress={() => {
            console.log('backdroppress');
            this.screenShotModal(!this.state.modal_alert);
          }}
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
          visible={this.state.success_modal}
          onBackdropPress={() =>
            this.setSuccessModalVisibility(!this.state.success_modal)
          }
          onRequestClose={() => {
            this.setSuccessModalVisibility(!this.state.success_modal);
          }}>
          <View style={styles.center}>
            <View style={[styles.modalView, {alignItems: 'center'}]}>
              <SimpleIcon name="check" color={colors.primarylight} size={56} />
              <Text style={styles.successtxt}>Success!</Text>

              <TouchableOpacity
                style={styles.okbtn}
                onPress={() => {
                  this.setSuccessModalVisibility(!this.state.success_modal);
                  this.props.navigation.navigate('Home');
                }}>
                <Text style={[styles.title, {color: '#fff'}]}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.error_modal}
          onBackdropPress={() =>
            this.setErrorModalVisibility(!this.state.error_modal)
          }
          onRequestClose={() => {
            this.setErrorModalVisibility(!this.state.error_modal);
          }}>
          <View style={styles.center}>
            <View style={[styles.modalView, {alignItems: 'center'}]}>
              <EntypoIcon
                name="circle-with-cross"
                color={colors.dangerlight}
                size={42}
              />
              <Text style={styles.successtxt}>Error!</Text>

              <Text style={styles.errortxtDesc}>
                Something went wrong, please check the fields and try again !
              </Text>

              <TouchableOpacity
                style={styles.okbtnError}
                onPress={() => {
                  this.setErrorModalVisibility(!this.state.error_modal);
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

const pickerStyle = {
  inputIOS: {
    color: '#333',
    fontSize: size.subtitle,
    //   fontFamily: fontfamily.roboto
  },
  inputAndroid: {
    color: '#333',
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

const mapStateToProps = state => ({
  driverDetails: state.login,
});

export default connect(mapStateToProps)(Expenses);
