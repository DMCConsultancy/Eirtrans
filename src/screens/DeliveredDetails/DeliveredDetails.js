import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Modal,
  ScrollView,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import {Container, Left, Right, Textarea} from 'native-base';
import styles from './Styles';
import {colors, images} from '../../global/globalStyle';
import SignatureCapture from 'react-native-signature-capture';
import Close from 'react-native-vector-icons/AntDesign';
import RNFetchBlob from 'react-native-fetch-blob';
import Success from 'react-native-vector-icons/SimpleLineIcons';
import Toast from 'react-native-simple-toast';
import {connect} from 'react-redux';

import {
  setJobStatusCompleted,
  setJobStatusDelivered,
} from '../../redux/action/jobStatus';

import CustomStatusBar from '../../components/StatusBar';
import Header from '../../components/Header';
import {getCurrentDate, PrettyPrintJSON} from '../../utils/helperFunctions';
import Loader from '../../components/button/Loader';

import {URL} from '../../../config.json';

class DeliveredDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      result: '',
      notes: '',
      modalVisible_alert: false,
      modalVisible_alert1: false,
      loading: false,
    };
  }

  saveSign() {
    this.refs['sign'].saveImage();
  }

  resetSign() {
    this.refs['sign'].resetImage();
  }

  _onSaveEvent(result) {
    //result.encoded - for the base64 encoded png
    //result.pathName - for the file path name
    // console.log('mmm', result.encoded);
    this.setSign(result);
    this.setModalVisible(!this.state.modalVisible_alert);
  }

  setSign = result => {
    RNFetchBlob.fs
      .writeFile(result.pathName, result.encoded, 'encoding type')
      .then(success => {
        console.log({success});
        Alert.alert('info', `It's been downloaded in ${result.pathName}.`);
      })
      .catch(err => {
        console.warn(err);
      });

    PrettyPrintJSON({result});

    this.setState({result: result.encoded}, () => {
      console.log({sign: result});
    });
  };
  _onDragEvent() {
    // This callback will be called when the user enters signature
    console.log('dragged');
  }

  setModalVisible = visible => {
    this.setState({modalVisible_alert: visible});
  };

  setModalVisible1 = visible => {
    this.setState({modalVisible_alert1: visible});
  };

  handleCollected = async () => {
    const {name, phone, result, notes} = this.state;

    this.setState({loading: true});

    const crashDeliveredDetailsParamsFromTruckDetails =
      this.props.navigation.getParam('crashDeliveredDetailsParams', null);

    PrettyPrintJSON({crashDeliveredDetailsParamsFromTruckDetails});

    // console.log({path: RNFetchBlob.wrap(result)});

    let url = URL + 'colleted';

    const driver_id = this.props.login?.id;
    const driver_name = this.props.login?.name;

    const requestObject = {
      type: '3',
      reason: notes,
      name: driver_name,
      job_id: crashDeliveredDetailsParamsFromTruckDetails.job_id,
      driver_id,
      datetime: getCurrentDate(true),
      user_id: crashDeliveredDetailsParamsFromTruckDetails.user_id,
      jobstatus: '1',
      loadcontener_id: crashDeliveredDetailsParamsFromTruckDetails.load_id,
      lan_status: '1',
      signature: result,
    };

    PrettyPrintJSON({requestObject});
    // return;

    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestObject),
    };

    PrettyPrintJSON({requestOptionsCollect: requestOptions});

    let apiCall = await fetch(url, requestOptions);
    let responseData = await apiCall.json();

    PrettyPrintJSON({responseData});

    if (responseData.response === 1) {
      this.handleSubmit();
    } else {
      Toast.show(responseData.message);
    }
  };

  handleSubmit = async () => {
    const {name, phone, result} = this.state;

    const {setJobDelivered} = this.props;

    this.setState({loading: true});


    const crashDeliveredDetailsParamsFromTruckDetails =
      this.props.navigation.getParam('crashDeliveredDetailsParams', null);

    PrettyPrintJSON({crashDeliveredDetailsParamsFromTruckDetails});

    let url = URL + 'singlejob_delivery_signature';

    const driver_id = this.props.login?.id;

    var apiData = new FormData();

    apiData.append(
      'job_id',
      crashDeliveredDetailsParamsFromTruckDetails.job_id,
    );
    apiData.append('driver_id', driver_id);
    apiData.append('date_time', getCurrentDate(true));
    apiData.append(
      'loadcontener_id',
      crashDeliveredDetailsParamsFromTruckDetails.load_id,
    );

    apiData.append('name', name);
    apiData.append('email', phone);
    apiData.append('selecttool', '');
    apiData.append('reason', '');
    apiData.append('deliver_status', '1');
    apiData.append('carkey', 0); // ask

    apiData.append('cus_signature', result);

    PrettyPrintJSON({apiData});
    // return;

    const requestOptions = {
      method: 'POST',
      body: apiData,
    };

    PrettyPrintJSON({requestOptions});

    let apiCall = await fetch(url, requestOptions);
    let responseData = await apiCall.text();

    PrettyPrintJSON({responseData});

    this.setState({loading: false});

    if (responseData.response === 1) {
      console.log({createCrashReport: responseData.message});

      this.setModalVisible1(!this.state.modalVisible_alert1);

      setJobDelivered({
        job_id: crashDeliveredDetailsParamsFromTruckDetails.job_id,
        load_id: crashDeliveredDetailsParamsFromTruckDetails.load_id,
        status: 1,
      });
    } else {
      console.log('singlejob_delivery_signature_error', responseData.message);

      Toast.show(responseData.message);
    }
  };

  // getCollectedStatus = () => {
  //   const crashDeliveredDetailsParamsFromTruckDetails = this.props.navigation.getParam(
  //     'crashDeliveredDetailsParams',
  //     null,
  //   );

  //   const {jobStatus} = this.props;

  //   const found = jobStatus.find(
  //     jobs =>
  //       jobs.job_id === crashDeliveredDetailsParamsFromTruckDetails.job_id &&
  //       jobs.load_id === crashDeliveredDetailsParamsFromTruckDetails.load_id,
  //   );

  //   PrettyPrintJSON({getCollectedStatus: found});

  //   return found ? found.status : 0;
  // };

  render() {
    // const collectedStatus = this.getCollectedStatus();

    // console.log({collectedStatus});

    return (
      <Container style={styles.container}>
        <CustomStatusBar />
        <View style={[styles.container, {backgroundColor: colors.skyblue}]}>
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

          <ScrollView>
            <View style={styles.content}>
              <View>
                <Text style={styles.mytext}>Name</Text>
                <TextInput
                  style={styles.inputs}
                  placeholder="Enter name"
                  value={this.state.name}
                  onChangeText={name => this.setState({name})}
                />
              </View>

              <View style={styles.mt20}>
                <Text style={styles.mytext}>Phone Number</Text>
                <TextInput
                  style={styles.inputs}
                  placeholder="Enter Phone"
                  value={this.state.phone}
                  onChangeText={phone => this.setState({phone})}
                />
              </View>

              <View style={styles.mt20}>
                <Text style={styles.mytext}>Signature</Text>
                <TouchableOpacity
                  onPress={() =>
                    this.setModalVisible(!this.state.modalVisible_alert)
                  }
                  style={styles.inputs}>
                  <View style={styles.center}>
                    <Text style={styles.mytext}>Tap for signature</Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* <View>
                              <Image source={{uri:this.state.result}} tintColor={"#000"}
                               style={{height:100,width:"100%", resizeMode:"contain"}} />
                              </View> */}

              <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => this.handleSubmit()}
                  style={styles.btnsty}>
                  <Text style={styles.mytext}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          {this.state.loading && <Loader />}
        </View>

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
              <TouchableOpacity
                style={styles.closeicon}
                onPress={() =>
                  this.setModalVisible(!this.state.modalVisible_alert)
                }>
                <Close name="close" size={30} color={colors.danger} />
              </TouchableOpacity>
              <SignatureCapture
                style={styles.signature}
                ref="sign"
                onSaveEvent={sign => this._onSaveEvent(sign)}
                onDragEvent={sign => this._onDragEvent(sign)}
                saveImageFileInExtStorage={true}
                showNativeButtons={false}
                showTitleLabel={false}
                backgroundColor="#ffffff"
                strokeColor="#000000"
                minStrokeWidth={6}
                maxStrokeWidth={6}
                viewMode={'portrait'}
              />

              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => {
                    this.saveSign();
                  }}>
                  <Text style={styles.btntext}>Save</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => {
                    this.resetSign();
                  }}>
                  <Text style={styles.btntext}>Clear</Text>
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
            <View style={styles.modalViewsucess}>
              <Success name="check" color={colors.primarylight} size={56} />
              <Text style={styles.successtxt}>Success!</Text>

              <TouchableOpacity
                style={styles.okbtn}
                onPress={() => {
                  this.setModalVisible1(!this.state.modalVisible_alert1);
                  this.props.navigation.navigate('Testdetails');
                }}>
                <Text style={styles.btntext}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  login: state.login.data,
  jobStatus: state.jobStatus,
});

const mapDispatchToProps = dispatch => ({
  setJobDelivered: payload => dispatch(setJobStatusDelivered(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeliveredDetails);
