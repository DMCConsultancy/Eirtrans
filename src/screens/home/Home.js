import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  ImageBackground,
  Modal,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {Container} from 'native-base';
import {DrawerActions} from 'react-navigation-drawer';
import {NavigationEvents} from 'react-navigation';
import Toast from 'react-native-simple-toast';

import {images, colors} from '../../global/globalStyle';

import styles from './Styles';

import MyButton from '../../components/button/Mybutton';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {URL} from '../../../config.json';
import {
  getTruckDetail,
  setTruckDetail,
  TruckDetailError,
} from '../../redux/action/truckdetail';
import {connect} from 'react-redux';
import Loader from '../../components/button/Loader';
import {
  getSelectedTruckDetail,
  setSelectedTruckDetail,
  SelectedTruckDetailError,
} from '../../redux/action/selectedTruckDetail';
import Icon from 'react-native-vector-icons/Feather';
import CustomStatusBar from '../../components/StatusBar';
import {getCurrentDate, PrettyPrintJSON} from '../../utils/helperFunctions';

class Home extends Component {
  _unsubscribe;

  constructor(props) {
    super(props);
    this.state = {
      modalVisible_alert: false,
      value3Index: '',
      value2: '',
      morningCheckLoader: [],
      morningAccepted: null,
    };
  }

  toggleDrawer = () => {
    this.props.navigation.dispatch(DrawerActions.toggleDrawer());
  };

  setModalVisible = visible => {
    this.setState({modalVisible_alert: visible});
  };

  async truckdetails() {
    let url = URL + 'getAllTrucks';

    const requestOptions = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    this.props.getTruckDetail();

    try {
      let apiCall = await fetch(url, requestOptions);
      let responseData = await apiCall.json();
      if (responseData.response == 1) {
        const data = responseData.data;
        const trucks = [];
        for (let i = 0; i < data.length; i++) {
          let obj = {
            id: data[i].id,
            label: data[i].truck_number,
            value: data[i].truck_number,
            truck_status: data[i].truck_status,
            date_time: data[i].date_time,
            truck_pickstatus: data[i].truck_pickstatus,
          };

          trucks.push(obj);
        }
        this.setState({
          morningCheckLoader: new Array(trucks.length).fill(false),
        });
        this.props.setTruckDetail(trucks);
      } else {
        this.props.TruckDetailError(responseData.message);
      }
    } catch (error) {
      console.log(error);
      this.props.TruckDetailError(error);
    }
  }

  checkMorningAccepted = async () => {
    let url = URL + 'getTodayCheckDetails';

    // this.setState({morningAcceptedLoading: true});

    const requestParams = {
      driver_id: this.props.login.data.id,
      currenttdate: getCurrentDate(true),
    };

    PrettyPrintJSON({requestParams});

    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestParams),
    };

    try {
      let apiCall = await fetch(url, requestOptions);
      let responseData = await apiCall.json();

      PrettyPrintJSON({responseData});

      if (responseData.response == 1) {
        const data = responseData.data;

        this.setState({morningAccepted: true});
      } else {
        Toast.show(responseData.message);
        this.setState({morningAccepted: false});
      }
    } catch (error) {
      console.log(error);
      Toast.show(error);
    }
  };

  setMorningCheckLoader = truckDataIndex => {
    this.setState(state => {
      let morningLoaders = [...state.morningCheckLoader];
      morningLoaders[truckDataIndex] = !morningLoaders[truckDataIndex];

      return {
        morningCheckLoader: morningLoaders,
      };
    });
  };

  async createmorningCheck(selectedTruckNumber, truckDataIndex) {
    const {truckDetail} = this.props;

    // const {currentDate, trcukid} = this.state;

    this.setMorningCheckLoader(truckDataIndex);

    const selectedTruck = truckDetail.data.find(
      truck => truck.value === selectedTruckNumber,
    );

    PrettyPrintJSON({selectedTruck});
    // return;

    const driver_id = this.props.login?.data?.id;
    const driver_mobile = this.props.login?.data?.mobile;
    const driver_name = this.props.login?.data?.name;

    let url = URL + 'createMorningCheck';

    const params = {
      driver_id: driver_id,
      truck_number: selectedTruckNumber,
      currenttdate: getCurrentDate(true),
      mobile: driver_mobile,
      drivername: driver_name,
      id: selectedTruck.id,
      truck_pickstatus: selectedTruck.truck_pickstatus,
    };

    PrettyPrintJSON({morningCheckParams: params});

    for (const key of Object.keys(params)) {
      if (params[key] === '' || params[key] === undefined) {
        delete params[key];
      }
    }

    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    };

    console.log('Call createmorning check');

    let apiCall = await fetch(url, requestOptions);
    let responseData = await apiCall.json();

    PrettyPrintJSON({morningCheckResponse: responseData});

    this.setMorningCheckLoader(truckDataIndex);

    if (responseData.response === 1) {
      console.log('createmorningCheck', responseData.message);

      this.props.setSelectedTruckDetail(selectedTruckNumber);
      this.props.navigation.navigate('Morning');
      this.setModalVisible(!this.state.modalVisible_alert);
    } else {
      console.log('createmorningCheck else', responseData.message);
      // this.setState({acceptbtn: false});
      Toast.show(responseData.message);
    }
  }

  subscribeToFocusEvent = () => {
    const {navigation} = this.props;

    console.log('INFO: subscribing to navigation focus event');

    this._unsubscribe = navigation.addListener('focus', () => {
      console.log('component appeared');
      this.checkMorningAccepted();
    });
    console.log({subscribe: this._unsubscribe});
  };

  componentDidMount() {
    this.truckdetails();
    this.checkMorningAccepted();
    // this.subscribeToFocusEvent();
  }

  unsubscribeFocusEvent = () => {
    console.log('INFO: unsubscribing to navigation focus event');

    if (this._unsubscribe) {
      console.log({unsubs: this._unsubscribe});

      this._unsubscribe.remove();
    }
  };

  morningCheck() {
    if (this.props.createMorning.data.response !== 1) {
      this.setModalVisible(!this.state.modalVisible_alert);
    } else {
      this.props.navigation.navigate('Morning');
    }
  }

  render() {
    const {morningCheckLoader, morningAccepted} = this.state;

    console.log({condition: morningAccepted ? false : true});

    return (
      <Container style={styles.container}>
        {/* naviagtion events to refresh morning status */}
        <NavigationEvents
          onDidFocus={() => this.subscribeToFocusEvent()}
          onWillBlur={() => this.unsubscribeFocusEvent()}
        />
        {/* =========================================== */}
        <CustomStatusBar />
        <ImageBackground source={images.bg} style={styles.container}>
          <View style={styles.content}>
            <TouchableOpacity onPress={() => this.toggleDrawer()}>
              <Image source={images.menu} style={styles.menu} />
            </TouchableOpacity>

            <View style={styles.center}>
              <Image style={styles.logo} source={images.logo} />
            </View>
            <View style={styles.mt20}>
              {/* {this.props.createMorning.data.response === 1 ? (
                <View style={styles.row}>
                  <View style={styles.wdh90}>
                    <MyButton
                      title="Morning Checks"
                      onPress={() => this.morningCheck()}
                      backgroundColor="#fff"
                      color="#000"
                      textTransform="capitalize"
                    />
                  </View>
                  <View style={styles.wdh10}>
                    <View style={styles.iconContainer}>
                      <Icon name="check" size={20} color={colors.success} />
                    </View>
                  </View>
                </View>
              ) : (
                <MyButton
                  title="Morning Checks"
                  onPress={() => this.morningCheck()}
                  backgroundColor="#fff"
                  color="#000"
                  textTransform="capitalize"
                />
              )} */}
              {morningAccepted === false ? (
                <MyButton
                  title="Morning Checks"
                  onPress={() => this.morningCheck()}
                  backgroundColor="#fff"
                  color="#000"
                  textTransform="capitalize"
                />
              ) : (
                <View style={styles.row}>
                  <View style={styles.wdh90}>
                    <MyButton
                      title="Morning Checks"
                      onPress={() => this.morningCheck()}
                      backgroundColor="#fff"
                      color="#000"
                      textTransform="capitalize"
                    />
                  </View>
                  <View style={styles.wdh10}>
                    <View style={styles.iconContainer}>
                      {morningAccepted ? (
                        <Icon name="check" size={20} color={colors.success} />
                      ) : (
                        <ActivityIndicator color={colors.success} />
                      )}
                    </View>
                  </View>
                </View>
              )}

              <MyButton
                title="Jobs"
                disabled={
                  // this.props.createMorning.data.response !== 1 ? true : false
                  morningAccepted ? false : true
                }
                onPress={() => {
                  if (this.props.createMorning.data.response === 1) {
                    this.props.navigation.navigate('Job');
                  }
                }}
                backgroundColor="#fff"
                textTransform="capitalize"
                color={
                  // this.props.createMorning.data.response !== 1 ? '#ccc' : '#000'
                  !morningAccepted ? '#ccc' : '#000'
                }
              />

              <MyButton
                title="Expenses"
                disabled={
                  // this.props.createMorning.data.response !== 1 ? true : false
                  morningAccepted ? false : true
                }
                onPress={() => {
                  if (this.props.createMorning.data.response === 1) {
                    this.props.navigation.navigate('HomeExpenses');
                  }
                }}
                backgroundColor="#fff"
                textTransform="capitalize"
                color={
                  // this.props.createMorning.data.response !== 1 ? '#ccc' : '#000'
                  !morningAccepted ? '#ccc' : '#000'
                }
              />
            </View>
          </View>
        </ImageBackground>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible_alert}
          onBackdropPress={() =>
            this.setModalVisible(!this.state.modalVisible_alert)
          }
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible_alert);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {this.props.truckDetail.loading == false ? (
                <ScrollView
                  style={styles.container}
                  keyboardShouldPersistTaps="handled">
                  <MyButton
                    title="Select truck"
                    backgroundColor={colors.warning}
                    color="#000"
                    textTransform="capitalize"
                  />
                  <View style={styles.mt20}>
                    <RadioForm formHorizontal={false} animation={true}>
                      {this.props.truckDetail.data.map((obj, i) => {
                        return (
                          <RadioButton labelHorizontal={true} key={i}>
                            {morningCheckLoader[i] ? (
                              <View style={{marginLeft: 10}}>
                                <ActivityIndicator
                                  color={colors.danger}
                                  size={'small'}
                                />
                              </View>
                            ) : (
                              <RadioButtonInput
                                obj={obj}
                                index={i}
                                isSelected={this.state.value3Index === i}
                                onPress={(value, index) => {
                                  console.log({value});
                                  // Todo: handle once 500 error is resolved
                                  this.createmorningCheck(value, i);
                                  this.setState({
                                    value2: value,
                                    value3Index: index,
                                  });
                                  // ! comment out once 500 error is resolved
                                  // this.props.setSelectedTruckDetail(value);
                                  // this.props.navigation.navigate('Morning');
                                  // this.setModalVisible(
                                  //   !this.state.modalVisible_alert,
                                  // );
                                }}
                                borderWidth={2}
                                buttonInnerColor={colors.danger}
                                buttonOuterColor={colors.danger}
                                buttonSize={10}
                                buttonOuterSize={20}
                                buttonStyle={{}}
                                buttonWrapStyle={{marginLeft: 10, marginTop: 5}}
                              />
                            )}

                            <RadioButtonLabel
                              obj={obj}
                              index={i}
                              labelHorizontal={true}
                              onPress={(value, index) => {
                                console.log({value});
                                // Todo: handle once 500 error is resolved
                                this.createmorningCheck(value, i);
                                this.setState({
                                  value2: value,
                                  value3Index: index,
                                });
                                // ! comment out once 500 error is resolved
                                // this.props.setSelectedTruckDetail(value);
                                // this.props.navigation.navigate('Morning');
                                // this.setModalVisible(
                                //   !this.state.modalVisible_alert,
                                // );
                              }}
                              labelStyle={styles.labelStyle}
                              labelWrapStyle={{marginTop: 5}}
                            />
                          </RadioButton>
                        );
                      })}
                    </RadioForm>
                  </View>
                </ScrollView>
              ) : (
                <Loader />
              )}
            </View>
          </View>
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  truckDetail: state.truckDetail,
  login: state.login,
  createMorning: state.createMorning,
});

const mapDispatchToProps = dispatch => ({
  setTruckDetail: data => dispatch(setTruckDetail(data)),
  TruckDetailError: error => dispatch(TruckDetailError(error)),
  getTruckDetail: () => dispatch(getTruckDetail()),

  setSelectedTruckDetail: data => dispatch(setSelectedTruckDetail(data)),
  SelectedTruckDetailError: error => dispatch(SelectedTruckDetailError(error)),
  getSelectedTruckDetail: () => dispatch(getSelectedTruckDetail()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
