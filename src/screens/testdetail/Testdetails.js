import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Modal,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {Body, Container, Left, Right} from 'native-base';
import styles from './Styles';
import {images, colors} from '../../global/globalStyle';
import Success from 'react-native-vector-icons/SimpleLineIcons';
import Icon from 'react-native-vector-icons/Feather';

import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';
import {URL} from '../../../config.json';
import Loader from '../../components/button/Loader';
import CustomStatusBar from '../../components/StatusBar';
import Header from '../../components/Header';
import Text from '../../components/Text';
import {
  getCurrentDate,
  getCurrentLoadsJobsStatus,
  getCurrentLoadsNotCollectedJobs,
  PrettyPrintJSON,
} from '../../utils/helperFunctions';
import {ActionButton} from '../../components/button/ActionButton';
import {connect} from 'react-redux';
import {withNavigationFocus} from 'react-navigation';
import {
  setJobFoundShipping,
  setJobStatusLoadCompleted,
  setJobStatusLoadDelivered,
} from '../../redux/action/jobStatus';

class Loads extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible_alert: false,
      id: '',
      data: null,
      tableHead: [
        'customar name',
        'model',
        'reg',
        'collection address',
        'lane',
      ],
      tableData: [],
      shippingAddress: null,
      loading: true,
    };
  }

  setModalVisible = visible => {
    this.setState({modalVisible_alert: visible});
  };

  async getSelectedByJobCustomer(load = false) {
    let url = URL + 'getJobsByLoadContainer';
    const loadItem = this.props.navigation.getParam('loadItem', null);

    console.log('INFO: getting jobs ');

    if (load) {
      this.setState({
        loading: load,
        tableData: [],
      });
    }

    if (!loadItem) {
      console.log('WARN: load id not found');
    }

    const params = {
      id: loadItem.id,
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

        this.setState({data});

        PrettyPrintJSON({loads: data});

        data.car_collection_data.map(arr => {
          const ele = arr[0];

          var joined = this.state.tableData.concat([
            [
              ele.name,
              ele.make_model,
              ele.reg,
              ele.collection_address,
              ele.lane_number,
              {
                bookingStatus: ele.bookingstatus,
              },
            ],
          ]);

          this.setState({tableData: joined});

          this.getCarShippingAddress();
        });
      } else {
        this.setState({loading: false});
        console.log(responseData.message);
      }
    } catch (error) {
      this.setState({loading: false});
      console.log(error);
    }
  }

  async getDriverAssignToLoadertocompletejob() {
    let url = URL + 'getDriverAssignToLoadertocompletejob';
    const driver_id = this.props.driverDetails.id;

    var apiData = new FormData();

    apiData.append('driver_id', driver_id);
    apiData.append('date', getCurrentDate(true));

    const requestOptions = {
      method: 'POST',
      body: apiData,
    };

    try {
      let apiCall = await fetch(url, requestOptions);
      let responseData = await apiCall.json();

      // PrettyPrintJSON({checkStatus: responseData});

      if (responseData.response == 1) {
        const data = responseData.data;

        PrettyPrintJSON({data});
      } else {
        console.log(responseData.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  getCarShippingAddress = async (load = false) => {
    let url = URL + 'getCarDeliverAddress';
    const loadItem = this.props.navigation.getParam('loadItem', null);
    const driver_id = this.props.driverDetails.id;

    const {setShippingFound} = this.props;

    console.log('INFO: getting delivery address ');

    if (load) {
      this.setState({
        loading: load,
      });
    }

    if (!loadItem) {
      console.log('WARN: load id not found');
    }

    const params = {
      loadcontener_id: loadItem.id,
      driver_id,
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
        const data =
          responseData.data &&
          Array.isArray(responseData.data) &&
          responseData.data.length
            ? responseData.data[0]
            : null;

        PrettyPrintJSON({shippingAddress: data});

        this.setState({shippingAddress: data, loading: false});

        // if shipping is not already received, set receive code
        if (!this.checkIfShippingCodeAlreadySet()) {
          setShippingFound(loadItem.id);
        }
      } else {
        this.setState({loading: false});
        console.log(responseData.message);
      }
    } catch (error) {
      this.setState({loading: false});
      console.log(error);
    }
  };

  handleLoadCollectedPress = async () => {
    let url = URL + 'loadcomplete';

    const {setLoadCompleted} = this.props;

    this.setState({loading: true});

    const driver_id = this.props.driverDetails.id;
    const loadItem = this.props.navigation.getParam('loadItem', null);

    PrettyPrintJSON({loadItem});

    var apiData = new FormData();

    // ! ask loadcontener_id must multiple
    apiData.append('loadcontener_id', loadItem.id);
    apiData.append('driver_id', driver_id);
    apiData.append('deliverytype', '');

    const requestOptions = {
      method: 'POST',
      body: apiData,
    };

    try {
      let apiCall = await fetch(url, requestOptions);
      let responseData = await apiCall.json();

      PrettyPrintJSON({handleLoadCollectedPress: responseData});

      this.setState({loading: false});

      if (responseData.response == 1) {
        const data = responseData.data;

        PrettyPrintJSON({handleLoadCollectedPressData: data});

        setLoadCompleted(loadItem.id);

        this.setModalVisible(!this.state.modalVisible_alert);
      } else {
        console.log(responseData.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleDeliverAllJobs = () => {
    const loadItem = this.props.navigation.getParam('loadItem', null);

    this.props.navigation.navigate('DeliveredDetails', {
      type: 'allDeliver',
      loadID: loadItem.id,
      jobID: loadItem.job_id,
    });
  };

  handleSignature = () => {
    const loadItem = this.props.navigation.getParam('loadItem', null);

    this.props.navigation.navigate('DeliveredDetails', {
      type: 'signature',
      loadID: loadItem.id,
      jobID: loadItem.job_id,
    });
  };

  handleLoadDelivered = async () => {
    let url = URL + 'finalSubmit';

    const {setLoadDelivered} = this.props;

    this.setState({loading: true});

    const driver_id = this.props.driverDetails.id;
    const loadItem = this.props.navigation.getParam('loadItem', null);

    var apiData = new FormData();

    apiData.append('loadcontener_id', loadItem.id);
    apiData.append('driver_id', driver_id);
    apiData.append('date_time', getCurrentDate(true));
    apiData.append('load_type', '');

    PrettyPrintJSON({apiData});

    const requestOptions = {
      method: 'POST',
      body: apiData,
    };

    try {
      let apiCall = await fetch(url, requestOptions);
      let responseData = await apiCall.json();

      PrettyPrintJSON({handleLoadDeliveredPress: responseData});

      this.setState({loading: false});

      if (responseData.response == 1) {
        const data = responseData.data;

        PrettyPrintJSON({handleLoadDeliveredPressData: data});

        setLoadDelivered(loadItem.id);

        this.setModalVisible(!this.state.modalVisible_alert);

        setTimeout(() => {
          this.props.navigation.navigate('Job');
        }, 3000);
      } else {
        console.log(responseData.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getSelectedByJobCustomer();
    // this.getCarShippingAddress();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      console.log('INFO: Testdetails component appeared', this.props.isFocused);

      if (this.props.isFocused) {
        this.getSelectedByJobCustomer(true);
      }
    }
  }

  getCustomerID(index) {
    console.log({index});
    const data = this.state.data?.car_collection_data[index];
    const loadItem = this.props.navigation.getParam('loadItem', null);

    // PrettyPrintJSON({data});
    this.props.navigation.navigate('Truckdetail', {info: data[0], loadItem});
  }

  showLoadCollected = () => {
    const {tableData, data} = this.state;
    const {jobStatus, notCollected} = this.props;

    if (!data) {
      return false;
    }

    const loadItem = this.props.navigation.getParam('loadItem', null);

    let loadCollected = false;

    let currentLoadsJobs = getCurrentLoadsJobsStatus(
      data?.car_collection_data,
      jobStatus,
      loadItem.id,
    );

    let currentLoadsNotCollectedJobs = getCurrentLoadsNotCollectedJobs(
      data?.car_collection_data,
      notCollected,
      loadItem.id,
    );

    PrettyPrintJSON({currentLoadsJobs, currentLoadsNotCollectedJobs});

    if (currentLoadsJobs.length) {
      loadCollected = currentLoadsJobs.every(job => {
        console.log({status: job.status});
        return job.status >= 1;
      });
    }

    PrettyPrintJSON({
      currentLoadsJobs_length: currentLoadsJobs.length,
      condition: tableData.length === currentLoadsJobs.length && !loadCollected,
      condition1: tableData.length === currentLoadsJobs.length,
      condition2: loadCollected,
      totalCurrentJobsLengthMatches:
        currentLoadsJobs.length + currentLoadsNotCollectedJobs.length ===
        tableData.length,
        combined: currentLoadsJobs.length + currentLoadsNotCollectedJobs.length,
      table: tableData.length,
    });

    return (
      (currentLoadsJobs.length === tableData.length ||
        currentLoadsJobs.length + currentLoadsNotCollectedJobs.length ===
          tableData.length) &&
      !loadCollected
    );
  };

  checkIfShippingCodeAlreadySet = () => {
    const {jobStatus, navigation} = this.props;

    const loadItem = navigation.getParam('loadItem', null);

    let found = false;

    if (jobStatus) {
      found = jobStatus.some(
        jobs => jobs.load_id === loadItem.id && jobs.status >= 1.5,
      );
    }

    return found;
  };

  getLoadStatus = () => {
    const {jobStatus, navigation} = this.props;
    const {data} = this.state;

    if (!data) {
      return 0;
    }

    PrettyPrintJSON({jobStatussss: jobStatus});

    const loadItem = navigation.getParam('loadItem', null);

    let currentLoadsJobs = getCurrentLoadsJobsStatus(
      data?.car_collection_data,
      jobStatus,
      loadItem.id,
    );

    let found = false;

    if (currentLoadsJobs) {
      found = currentLoadsJobs.find(jobs => jobs.load_id === loadItem.id);
    }

    PrettyPrintJSON({currentLoadsJobs, found});

    return found ? found.status : null;
  };

  renderShippingAddress = () => {
    const {shippingAddress} = this.state;

    PrettyPrintJSON(shippingAddress);

    if (!shippingAddress) {
      return <View />;
    }

    const shippingHeadings = [
      'Shipping Ref',
      'Customer Ref',
      'PBN',
      'Carrier',
      'Route',
      'Registration',
      'Date of travel',
      'Day',
      'Time',
      'Length',
      'Driver',
      'Contents',
      'Customer',
      'MRN',
      'IMO',
      'ETA',
    ];

    const shippingValues = {
      shippingref: shippingAddress.shippingref,
      customerref: shippingAddress.cusref,
      pbn_number: shippingAddress.pbn_number,
      carrier: shippingAddress.carrier,
      route: shippingAddress.route,
      registration: shippingAddress.registration,
      dateoftravel: shippingAddress.dateoftravel,
      day: shippingAddress.day,
      time: shippingAddress.time,
      length: shippingAddress.lenght,
      drivername: shippingAddress.drivername,
      contents: shippingAddress.contents,
      customer: shippingAddress.customer,
      mrn_number: shippingAddress.mrn_number,
      imo: shippingAddress.imo,
      eta: shippingAddress.eta,
    };

    return (
      <View style={styles.shippingCont}>
        <View style={styles.shippingHead}>
          <Text style={styles.shippingTitle}>Shipping Address</Text>
        </View>
        <View style={styles.flexRow}>
          <View style={styles.shippingHeadingsCont}>
            {shippingHeadings.map(headings => (
              <Text style={styles.shippingHeading}>{headings}</Text>
            ))}
          </View>
          <View>
            {shippingHeadings.map(() => (
              <Text style={styles.shippingHeading}> : </Text>
            ))}
          </View>
          <View style={styles.shippingValuesCont}>
            {Object.keys(shippingValues).map(keys => (
              <Text style={styles.shippingHeading}>{shippingValues[keys]}</Text>
            ))}
          </View>
        </View>
      </View>
    );
  };

  renderLoadActionbuttons = () => {
    const {shippingAddress} = this.state;
    const {navigation} = this.props;

    const loadItem = navigation.getParam('loadItem', null);

    if (!shippingAddress && loadItem.shipping_type === '1') {
      return <View />;
    }

    const loadStatus = this.getLoadStatus();

    console.log({loadStatus});

    if (!loadStatus) {
      return <View />;
    }

    const onPress =
      loadStatus < 4
        ? this.handleDeliverAllJobs
        : loadStatus === 4
        ? this.handleSignature
        : this.handleLoadDelivered;

    const title =
      loadStatus < 4
        ? 'Deliver All Jobs'
        : loadStatus === 4
        ? 'Signature'
        : 'Load Delivered';

    return (
      <View>
        <ActionButton title={title} onPress={onPress} />
      </View>
    );
  };

  renderSignature = () => {
    const {signature, navigation} = this.props;

    const loadItem = navigation.getParam('loadItem', null);

    const loadSignature = signature.find(sign => sign.load_id === loadItem.id);

    console.log({loadSignature});

    if (!loadSignature) {
      return <View />;
    }

    return (
      <View style={styles.signCont}>
        <View>
          <Text style={styles.text}>{loadSignature.name}</Text>
        </View>
        <View>
          <Image
            source={loadSignature.image}
            style={{width: 200, height: 200, resizeMode: 'contain'}}
          />
        </View>
      </View>
    );
  };

  render() {
    const state = this.state;

    const RenderShippingAddress = this.renderShippingAddress;
    const RenderLoadActionbuttons = this.renderLoadActionbuttons;

    const RenderSignature = this.renderSignature;

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
            <Body style={{alignItems: 'center'}}>
              <Text style={styles.text}>{this.state.data?.loadnumber}</Text>
            </Body>
            <Right>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Home')}
                style={styles.rightbox}>
                <Text style={styles.text}>Home</Text>
              </TouchableOpacity>
            </Right>
          </Header>

          <ScrollView contentContainerStyle={styles.content}>
            <Table borderStyle={styles.borderStyle}>
              <Row
                data={state.tableHead}
                style={styles.head}
                textStyle={styles.text}
              />
              {state.tableData.map((rowData, index) => {
                const bookingDelivered =
                  rowData[rowData.length - 1].bookingStatus === '4' ||
                  rowData[rowData.length - 1].bookingStatus === '3';

                // console.log({bookingDelivered});

                return (
                  <TableWrapper key={index} style={styles.row}>
                    {rowData.map((cellData, cellIndex) => {
                      if (cellData && typeof cellData === 'object') {
                        console.log({cellData});
                        if (
                          cellData.bookingStatus === '7' ||
                          cellData.bookingStatus === '4' ||
                          cellData.bookingStatus === '3'
                        ) {
                          return (
                            <Icon
                              style={styles.checkMark}
                              name="check"
                              size={65}
                              color={colors.success}
                              key={cellIndex}
                            />
                          );
                        } else {
                          return (
                            <Icon
                              style={styles.checkMark}
                              name="loading2"
                              size={0}
                              color={'transparent'}
                              key={cellIndex}
                            />
                          );
                        }
                      }

                      console.log(
                        `returning cell on index = ${cellIndex}, ${
                          cellData.bookingStatus === '4'
                        }, ${cellData.bookingStatus}`,
                      );

                      return (
                        <Cell
                          key={cellIndex}
                          onPress={() => this.getCustomerID(index)}
                          data={cellData}
                          textStyle={[
                            styles.textCell,
                            {
                              color: bookingDelivered
                                ? colors.success
                                : colors.textDark,
                            },
                          ]}
                        />
                      );
                    })}
                  </TableWrapper>
                );
              })}
            </Table>
            <RenderShippingAddress />
            <RenderSignature />
            <RenderLoadActionbuttons />

            {/* <FlatList style={styles.borderStyle}
                data={this.state.data?.car_collection_data}
                renderItem={this.renderItem}
                keyExtractor={item => item.id}
                ListHeaderComponent={this.FlatListHeader}
                ListEmptyComponent={this.EmptyListMessage}
            /> */}
            {this.showLoadCollected() && (
              <ActionButton
                onPress={() => this.handleLoadCollectedPress()}
                title={'Load Collected'}
              />
            )}
          </ScrollView>

          {this.state.loading == true && <Loader />}
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
          <View style={[styles.center, {flex: 1}]}>
            <View style={styles.modalView}>
              <Success name="check" color="green" size={56} />
              <Text style={styles.successtxt}>Success!</Text>

              <TouchableOpacity
                style={styles.okbtn}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible_alert);
                }}>
                <Text style={[styles.mybtnText, {color: '#fff'}]}>Ok</Text>
              </TouchableOpacity>
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
  signature: state.signature,
});

const mapDispatchToProps = dispatch => ({
  setLoadCompleted: loadId => dispatch(setJobStatusLoadCompleted(loadId)),
  setShippingFound: loadId => dispatch(setJobFoundShipping(loadId)),
  setLoadDelivered: loadId => dispatch(setJobStatusLoadDelivered(loadId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigationFocus(Loads));
