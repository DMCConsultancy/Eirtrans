import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  ImageBackground,
  ScrollView,
  Platform,
  Linking,
  Alert,
} from 'react-native';
import {Container, Left, Right, Textarea} from 'native-base';
import Dot from 'react-native-vector-icons/Entypo';
import Success from 'react-native-vector-icons/SimpleLineIcons';
import {connect} from 'react-redux';

import styles from './Styles';
import {colors, images} from '../../global/globalStyle';

import Loader from '../../components/button/Loader';
import CustomStatusBar from '../../components/StatusBar';
import Header from '../../components/Header';
import Text from '../../components/Text';

import UserLocation from '../../services/userLocation';

import {isJSObj, PrettyPrintJSON} from '../../utils/helperFunctions';

import {URL} from '../../../config.json';
import NotCollectedFrom from './NotCollectedFrom';

class Truckdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible_alert: false,
      from: '',
      to: '',
      btnclr: false,
      messege: '',
      loading: false,
      info: null,
      data: [],
      notCollected: false,
      notCollectedObj: null,
    };
  }

  setModalVisible = visible => {
    this.setState({modalVisible_alert: visible});
  };

  async getCustomerDetails() {
    let url = URL + 'getCustomerDetails';

    const params = {
      id: this.state.info?.id,
    };
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    };

    try {
      let apiCall = await fetch(url, requestOptions);
      let responseData = await apiCall.json();
      if (responseData.response == 1) {
        const data = responseData.data;
        this.setState({data, loading: false});
      } else {
        console.log(responseData.message);
        this.setState({loading: false});
      }
    } catch (error) {
      this.setState({loading: false});
      console.log(error);
    }
  }

  componentDidMount() {
    // this.getCustomerDetails();
    this.getUsersCurrentLocation();
    this.setNotCollectedObj();
  }

  componentDidUpdate = prevProps => {
    if (prevProps.notCollected.length !== this.props.notCollected.length) {
      this.setNotCollectedObj();
    }
  };

  getUsersCurrentLocation = async () => {
    const location = new UserLocation();

    this.setState({loading: true});

    const streetAddress = await location
      .getUsersCurrentLocation()
      .catch(error => console.log({location: error}));

    console.log('INFO: location fetched...');

    PrettyPrintJSON({streetAddress});

    this.setState({loading: false, from: streetAddress || ''});
  };

  UNSAFE_componentWillMount() {
    const info = this.props.navigation.getParam('info', info);
    this.setState({info});
  }

  handleCollectYes = () => {
    const {from} = this.state;

    const loadItem = this.props.navigation.getParam('loadItem', null);
    const info = this.props.navigation.getParam('info', null);

    PrettyPrintJSON({loadItem, info});

    if (!loadItem) {
      console.error('lo adItem is null in TruckDetails');
      return;
    }

    if (!from) {
      alert('Please add Shipping from location, before collecting the job');
      this.setModalVisible(!this.state.modalVisible_alert);
      return;
    }

    const crashReportParams = {
      customer_id: loadItem.id,
      load_id: loadItem.id,
      user_id: info.user_id,
      car_collection_id: loadItem.job_id,
      job_id: info.id,
    };

    this.setModalVisible(!this.state.modalVisible_alert);
    // this.setState({btnclr: true});
    this.props.navigation.navigate('Cars', {crashReportParams});
  };

  getIfCurrentJobCollected = () => {
    const {jobStatus, navigation} = this.props;

    const loadItem = navigation.getParam('loadItem', null);
    const info = this.props.navigation.getParam('info', null);

    let found = false;

    // console.log({jobStatus});

    if (jobStatus) {
      // console.log({job_id: loadItem.job_id, load_id: loadItem.id});

      found = jobStatus.some(
        jobs => jobs.job_id === info.id && jobs.load_id === loadItem.id,
      );
    }

    return found;
  };

  getIfCurrentJobIsLoadCollected = () => {
    const {jobStatus, navigation} = this.props;

    const loadItem = navigation.getParam('loadItem', null);
    const info = this.props.navigation.getParam('info', null);

    let found = false;

    console.log({getIfCurrentJobIsLoadCollected: jobStatus});

    if (jobStatus) {
      // console.log({job_id: loadItem.job_id, load_id: loadItem.id});

      found = jobStatus.some(
        jobs =>
          jobs.job_id === info.id &&
          jobs.load_id === loadItem.id &&
          jobs.status >= 1,
      );
    }

    return found;
  };

  getIfCurrentJobFoundShipping = () => {
    const {jobStatus, navigation} = this.props;

    const loadItem = navigation.getParam('loadItem', null);
    const info = this.props.navigation.getParam('info', null);

    if (loadItem.shipping_type === '0') {
      return true;
    }

    let found = false;

    console.log({getIfCurrentJobFoundShipping: jobStatus});

    if (jobStatus) {
      // console.log({job_id: loadItem.job_id, load_id: loadItem.id});

      found = jobStatus.some(
        jobs =>
          jobs.job_id === info.id &&
          jobs.load_id === loadItem.id &&
          jobs.status >= 1.5,
      );
    }

    return found;
  };

  getIfCurrentJobIsDelivered = () => {
    const {jobStatus, navigation} = this.props;

    const loadItem = navigation.getParam('loadItem', null);
    const info = this.props.navigation.getParam('info', null);

    let found = false;

    console.log({jobStatus});

    if (jobStatus) {
      found = jobStatus.some(
        jobs =>
          jobs.job_id === info.id &&
          jobs.load_id === loadItem.id &&
          jobs.status >= 2,
      );
    }

    return found;
  };

  setNotCollectedObj = () => {
    const {notCollected, navigation} = this.props;

    const loadItem = navigation.getParam('loadItem', null);
    const info = this.props.navigation.getParam('info', null);

    let found = false;

    console.log({notCollected});

    if (notCollected) {
      found = notCollected.find(
        jobs => jobs.job_id === info.id && jobs.load_id === loadItem.id,
      );
    }

    console.log({found});

    if (isJSObj(found)) {
      this.setState({
        notCollectedObj: {
          name: found.name,
          reason: found.reason,
          img: found.imgUri,
        },
      });
    }
  };

  handleDelivered = () => {
    const loadItem = this.props.navigation.getParam('loadItem', null);
    const info = this.props.navigation.getParam('info', null);

    PrettyPrintJSON({loadItem, info});

    if (!loadItem) {
      console.error('loadItem is null in handle delivered');
      return;
    }

    const crashDeliveredDetailsParams = {
      load_id: loadItem.id,
      user_id: info.user_id,
      job_id: info.id,
      shipping_type: loadItem.shipping_type,
    };

    this.props.navigation.navigate('DeliveredDetails', {
      crashDeliveredDetailsParams,
    });
  };

  render() {
    const state = this.state;

    const loadItem = this.props.navigation.getParam('loadItem', null);
    const info = this.props.navigation.getParam('info', null);

    const notCollectedParams = {
      customer_id: loadItem.id,
      load_id: loadItem.id,
      user_id: info.user_id,
      car_collection_id: loadItem.job_id,
      job_id: info.id,
    };

    const jobLoadCollected = this.getIfCurrentJobIsLoadCollected();
    const jobFoundShipping = this.getIfCurrentJobFoundShipping();
    const jobCollected = this.getIfCurrentJobCollected();
    const jobDelivered = this.getIfCurrentJobIsDelivered();
    const jobNotCollected = state.notCollectedObj;

    PrettyPrintJSON({
      address:
        loadItem.shipping_type === '0' || jobCollected
          ? "delivery_address"
          : "collection_address",
    });

    console.log({
      jobLoadCollected,
      jobDelivered,
      jobCollected,
      jobNotCollected,
    });

    return (
      <Container style={styles.container}>
        <CustomStatusBar />
        <ImageBackground
          blurRadius={1}
          source={images.bg}
          style={styles.container}>
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

            <Right>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Home')}
                style={styles.rightbox}>
                <Text style={styles.text}>Home</Text>
              </TouchableOpacity>
            </Right>
          </Header>

          <ScrollView>
            <View style={styles.content}>
              <View>
                <View style={styles.row}>
                  <View style={styles.width40}>
                    <Text style={styles.formLabel}>
                      From <Dot name="dots-two-vertical" />{' '}
                    </Text>
                  </View>
                  <View style={styles.width60}>
                    <TextInput
                      style={styles.input}
                      onChangeText={from => this.setState({from})}
                      value={this.state.from}
                    />
                  </View>
                </View>

                <View style={[styles.row, {marginTop: 10}]}>
                  <View style={styles.width40}>
                    <Text style={styles.formLabel}>
                      To <Dot name="dots-two-vertical" />{' '}
                    </Text>
                  </View>
                  <View style={styles.width60}>
                    <TextInput
                      style={styles.input}
                      editable={false}
                      selectTextOnFocus={false}
                      // onChangeText={(form)=>this.setState({form})}
                      // value={this.state.info?.delivery_address}
                      value={
                        loadItem.shipping_type === '0' || jobCollected
                          ? state.info?.delivery_address
                          : state.info?.collection_address
                      }
                    />
                  </View>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => {
                  const scheme = Platform.select({
                    ios: 'maps:0,0?q=',
                    android: 'geo:0,0?q=',
                  });

                  // const latLng = `${26.85535016139612},${80.94663768345126}`;
                  const label =
                    loadItem.shipping_type === '0' || jobCollected
                      ? state.info?.delivery_address
                      : state.info?.collection_address;

                  const url = Platform.select({
                    ios: `${scheme}${label}`,
                    android: `${scheme}${label}`,
                  });

                  PrettyPrintJSON({url});

                  Linking.openURL(url);
                }}>
                {/* Todo: dynamic map */}
                <Image source={images.map} style={styles.mapsty} />
                <Text style={styles.maptxtsty}>tap here for go on map </Text>
              </TouchableOpacity>

              <View>
                <View style={styles.cardsty}>
                  <View style={styles.topribben}>
                    <Text style={styles.text}>{this.state.info?.reg}</Text>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.card40}>
                      <Text style={styles.text}>
                        Post code
                        <Dot name="dots-two-vertical" />{' '}
                      </Text>
                    </View>
                    <View style={styles.card60}>
                      <Text style={styles.label}>
                        {state.data[0]?.post_code}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.row}>
                    <View style={styles.card40}>
                      <Text style={styles.text}>
                        Collection Address
                        <Dot name="dots-two-vertical" />{' '}
                      </Text>
                    </View>
                    <View style={styles.card60}>
                      <Text style={styles.label}>
                        {state.info?.collection_address}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.row}>
                    <View style={styles.card40}>
                      <Text style={styles.text}>
                        Delivery Address
                        <Dot name="dots-two-vertical" />{' '}
                      </Text>
                    </View>
                    <View style={styles.card60}>
                      <Text style={styles.label}>
                        {state.info?.delivery_address}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.row}>
                    <View style={styles.card40}>
                      <Text style={styles.text}>
                        Contact
                        <Dot name="dots-two-vertical" />{' '}
                      </Text>
                    </View>
                    <View style={styles.card60}>
                      <Text style={styles.label}>{state.data[0]?.mobile}</Text>
                    </View>
                  </View>

                  <View>
                    <Textarea
                      style={styles.textarea}
                      disabled={true}
                      value={state.data[0]?.additional_comment}
                      onChangeText={messege => this.setState({messege})}
                    />
                  </View>
                </View>
                <View style={styles.bottomRibben} />
              </View>

              <View style={styles.cardjob}>
                <Text style={styles.heading}>Job Status</Text>

                <View style={styles.row}>
                  <View style={{width: '50%'}}>
                    <TouchableOpacity
                      style={
                        this.state.btnclr == true || jobCollected
                          ? [styles.btnsty, {backgroundColor: colors.success}]
                          : styles.btnsty
                      }
                      onPress={() => {
                        if (jobNotCollected) {
                          console.log(
                            'INFO: job already not collected, so collected is disabled',
                          );
                          return;
                        }
                        if (!jobCollected) {
                          this.setModalVisible(!this.state.modalVisible_alert);
                        }
                      }}>
                      <Text style={styles.text}>Collected</Text>
                    </TouchableOpacity>
                  </View>

                  {jobLoadCollected && !jobNotCollected ? (
                    <View style={{width: '50%'}}>
                      <TouchableOpacity
                        style={
                          jobDelivered
                            ? [styles.btnsty, {backgroundColor: colors.success}]
                            : styles.btnsty
                        }
                        onPress={() => {
                          if (!jobDelivered && jobFoundShipping) {
                            this.handleDelivered();
                          }

                          if (!jobFoundShipping) {
                            alert(
                              'Job cannot be delivered until Shipping address is available, Please ring office to get your shipping address',
                            );
                          }
                        }}>
                        <Text style={styles.text}>Delivered</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View style={{width: '50%'}}>
                      <TouchableOpacity
                        style={
                          jobNotCollected
                            ? [styles.btnsty, {backgroundColor: colors.success}]
                            : styles.btnsty
                        }
                        onPress={() => {
                          if (jobNotCollected) {
                            console.log('INFO: job already not collected');
                            return;
                          }
                          this.setState({notCollected: true});
                        }}>
                        <Text style={styles.text}>Not Collected</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
                {state.notCollected || jobNotCollected ? (
                  <View>
                    <NotCollectedFrom
                      notCollectedParams={notCollectedParams}
                      notCollectedObj={jobNotCollected}
                      navigation={this.props.navigation}
                    />
                  </View>
                ) : (
                  <View />
                )}
              </View>
            </View>
            {this.state.loading == true && <Loader />}
          </ScrollView>
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
          <View style={styles.center}>
            <View style={styles.modalView}>
              <Success
                name="exclamation"
                color={colors.warninglight}
                size={56}
              />
              <Text style={styles.successtxt}>Are you sure?</Text>

              <Text style={styles.mytxt}>You want to collect!</Text>

              <View style={styles.row}>
                <View style={{width: '50%'}}>
                  <TouchableOpacity
                    style={styles.cancelbtn}
                    onPress={() =>
                      this.setModalVisible(!this.state.modalVisible_alert)
                    }>
                    <Text style={styles.btntxt}>Cancel</Text>
                  </TouchableOpacity>
                </View>
                <View style={{width: '50%'}}>
                  <TouchableOpacity
                    style={styles.yesbtn}
                    onPress={() => {
                      this.handleCollectYes();
                    }}>
                    <Text style={styles.btntxt}>Yes</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  driverDetails: state.login.data,
  jobStatus: state.jobStatus,
  notCollected: state.notCollected,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Truckdetail);
