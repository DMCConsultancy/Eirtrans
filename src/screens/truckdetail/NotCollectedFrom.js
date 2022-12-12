import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
  Image,
  Alert,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import {Container, Textarea} from 'native-base';
import {colors, fontfamily, size} from '../../global/globalStyle';
import SignatureCapture from 'react-native-signature-capture';
import Close from 'react-native-vector-icons/AntDesign';
import RNFetchBlob from 'react-native-fetch-blob';
import Success from 'react-native-vector-icons/SimpleLineIcons';
import Toast from 'react-native-simple-toast';
import {connect} from 'react-redux';

import {
  setJobStatusCompleted,
  setJobStatusNotCollected,
} from '../../redux/action/jobStatus';

import CustomStatusBar from '../../components/StatusBar';
import Text from '../../components/Text';

import {
  formatSelecttoolReqObj,
  getCurrentDate,
  isJSObj,
  PrettyPrintJSON,
  randomHash,
} from '../../utils/helperFunctions';
import Loader from '../../components/button/Loader';

import {URL} from '../../../config.json';
import {setNotCollected} from '../../redux/action/notCollected';

var {width, height} = Dimensions.get('window');

class NotCollectedForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: isJSObj(props.notCollectedObj) ? props.notCollectedObj.name : '',
      email: '',
      result: isJSObj(props.notCollectedObj) ? props.notCollectedObj.img : '',
      notes: isJSObj(props.notCollectedObj) ? props.notCollectedObj.reason : '',
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
    const completeJobParamsNotCollected = this.props.notCollectedParams;

    const {job_id, load_id} = completeJobParamsNotCollected;

    const dirs = RNFetchBlob.fs.dirs;
    const fileName = `${randomHash(
      8,
    )}_${job_id}_${load_id}_collected_signature.png`;
    var path = dirs.DocumentDir + `/${fileName}`;

    RNFetchBlob.fs
      .writeFile(path, result.encoded, 'base64')
      .then(res => {
        console.log({res});
        Alert.alert('info', `It's been downloaded in ${path}.`);
      })
      .catch(err => {
        console.warn(err);
      });

    PrettyPrintJSON({path});

    this.setState(
      {result: {uri: 'file://' + path, name: fileName, type: 'image/png'}},
      () => {
        console.log({sign: result});
      },
    );
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
    const {result, notes, name} = this.state;
    const {setJobNotCollected} = this.props;

    this.setState({loading: true});

    const completeJobParamsNotCollected = this.props.notCollectedParams;

    PrettyPrintJSON({completeJobParamsNotCollected});

    // console.log({path: RNFetchBlob.wrap(result)});

    let url = URL + 'colleted';

    const driver_id = this.props.login?.id;
    const driver_name = this.props.login?.name;

    // const requestObject = {
    //   type: '9', // not collected type
    //   reason: notes,
    //   name: driver_name,
    //   job_id: completeJobParamsNotCollected.job_id,
    //   driver_id,
    //   datetime: getCurrentDate(true),
    //   user_id: completeJobParamsNotCollected.user_id,
    //   jobstatus: '1',
    //   loadcontener_id: completeJobParamsNotCollected.load_id,
    //   lan_status: '',
    //   signature: result,
    // };

    const apiData = new FormData();

    apiData.append('type', '9');
    apiData.append('reason', notes);
    apiData.append('name', driver_name);
    apiData.append('job_id', completeJobParamsNotCollected.job_id);
    apiData.append('driver_id', driver_id);
    apiData.append('datetime', getCurrentDate(true));
    apiData.append('user_id', completeJobParamsNotCollected.user_id);
    apiData.append('jobstatus', '1');
    apiData.append('loadcontener_id', completeJobParamsNotCollected.load_id);
    apiData.append('lan_status', '');
    apiData.append('signature', result);

    PrettyPrintJSON({apiData});
    // return;

    const requestOptions = {
      method: 'POST',
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(requestObject),
      body: apiData,
    };

    PrettyPrintJSON({requestOptionsCollect: requestOptions});

    let apiCall = await fetch(url, requestOptions);
    let responseData = await apiCall.json();

    PrettyPrintJSON({responseData});

    this.setState({loading: false});

    if (responseData.response === 1) {
      this.setModalVisible1(!this.state.modalVisible_alert1);

      setJobNotCollected({
        job_id: completeJobParamsNotCollected.job_id,
        load_id: completeJobParamsNotCollected.load_id,
        name: name,
        reason: notes,
        imgUri: result,
      });

      setTimeout(() => {
        this.props.navigation.navigate('Job');
      }, 1000);
    } else {
      Toast.show(responseData.message);
    }
  };

  render() {
    // const collectedStatus = this.getCollectedStatus();

    // console.log({collectedStatus});

    const jobAlreadyNotCollected = isJSObj(this.props.notCollectedObj);

    return (
      <Container style={styles.container}>
        <View style={[styles.container, {backgroundColor: colors.skyblue}]}>
          <ScrollView>
            <View style={styles.content}>
              <View>
                <Text style={styles.mytext}>Name</Text>
                <TextInput
                  style={styles.inputs}
                  placeholder="Enter name"
                  value={this.state.name}
                  editable={!jobAlreadyNotCollected}
                  onChangeText={name => {
                    if (!jobAlreadyNotCollected) {
                      this.setState({name});
                    }
                  }}
                />
              </View>

              <View style={styles.mt20}>
                <Text style={styles.mytext}>Reason</Text>
                <Textarea
                  style={[styles.inputs, {height: 100}]}
                  placeholder="Enter Reason"
                  value={this.state.notes}
                  isDisabled={jobAlreadyNotCollected}
                  onChangeText={notes => {
                    if (!jobAlreadyNotCollected) {
                      this.setState({notes});
                    }
                  }}
                />
              </View>

              <View style={styles.mt20}>
                <Text style={styles.mytext}>Signature</Text>
                <TouchableOpacity
                  onPress={() => {
                    if (!jobAlreadyNotCollected) {
                      this.setModalVisible(!this.state.modalVisible_alert);
                    }
                  }}
                  style={styles.inputs}>
                  <View style={styles.center}>
                    <Text style={styles.mytext}>Tap for signature</Text>
                  </View>
                </TouchableOpacity>
              </View>
              {this.state.result ? (
                <View style={styles.mt20}>
                  <Image
                    source={this.state.result}
                    style={{width: '100%', height: 200, resizeMode: 'contain'}}
                  />
                </View>
              ) : (
                <View />
              )}
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => {
                    if (isJSObj(this.props.notCollectedObj)) {
                      console.log(
                        'INFO: submit is disabled, since job is already not collected',
                      );
                      return;
                    }
                    this.handleCollected();
                  }}
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

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: 20,
  },
  content: {
    padding: 20,
  },
  arrow: {
    width: 20,
    height: 20,
  },
  headersty: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
  rightbox: {
    borderColor: '#000',
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 3,
    borderRadius: 5,
  },
  mytext: {
    fontSize: size.subtitle,
    fontFamily: fontfamily.medium,
    color: '#000',
  },
  inputs: {
    borderWidth: 2,
    borderColor: '#000',
    paddingHorizontal: 10,
    fontSize: size.subtitle,
    fontFamily: fontfamily.regular,
    color: '#000',
    backgroundColor: '#fff',
    height: 45,
    marginTop: 20,
  },
  mt20: {
    marginTop: 20,
  },
  btnsty: {
    padding: 10,
    borderRadius: 5,
    borderColor: '#000',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    marginTop: 20,
  },
  signature: {
    flex: 1,
    borderColor: '#000',
    borderWidth: 1,
  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors.primarylight,
    margin: 10,
    borderRadius: 5,
    borderColor: '#000',
    borderWidth: 2,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: Platform.OS == 'android' ? 1 : 0.2,
    shadowRadius: 4,
    elevation: Platform.OS == 'android' ? 5 : 0,
    width: width - 40,
    height: height - 50,
    borderRadius: 10,
  },
  modalViewsucess: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 0,
    // paddingHorizontal: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: Platform.OS == 'android' ? 1 : 0.2,
    shadowRadius: 4,
    elevation: Platform.OS == 'android' ? 5 : 0,
    width: 300,
    borderRadius: 10,
  },
  closeicon: {
    alignItems: 'flex-end',
    marginRight: 20,
    marginTop: 20,
  },
  btntext: {
    fontSize: size.title,
    fontFamily: fontfamily.regular,
    color: '#fff',
  },
  okbtn: {
    backgroundColor: colors.primarylight,
    borderRadius: 5,
    paddingHorizontal: 30,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  successtxt: {
    fontFamily: fontfamily.light,
    fontSize: 26,
    color: '#000',
    marginTop: 10,
  },
});

const mapStateToProps = state => ({
  login: state.login.data,
  jobStatus: state.jobStatus,
});

const mapDispatchToProps = dispatch => ({
  setJobNotCollected: payload => dispatch(setNotCollected(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotCollectedForm);
