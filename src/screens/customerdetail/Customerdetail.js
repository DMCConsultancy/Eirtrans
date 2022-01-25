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

import {URL} from '../../../config.json';

import CustomStatusBar from '../../components/StatusBar';
import Header from '../../components/Header';
import {PrettyPrintJSON} from '../../utils/helperFunctions';
import Loader from '../../components/button/Loader';

class Customerdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
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

  handleSubmit = async () => {
    const {name, email, result, notes} = this.state;

    this.setState({loading: true});

    const completeJobParamsFromDescription = this.props.navigation.getParam(
      'completeJobParams',
      null,
    );

    PrettyPrintJSON({completeJobParamsFromDescription});

    // console.log({path: RNFetchBlob.wrap(result)});

    let url = URL + 'completeJob';

    const driver_id = this.props.login?.id;

    var apiData = new FormData();

    apiData.append(
      'car_collection_id',
      completeJobParamsFromDescription.car_collection_id,
    );
    apiData.append('driver_id', driver_id);
    apiData.append('customer_id', completeJobParamsFromDescription.customer_id);
    apiData.append('job_id', completeJobParamsFromDescription.job_id);

    apiData.append('name', name);
    apiData.append('email', email);
    apiData.append('note', notes);
    apiData.append(
      'selecttool',
      JSON.stringify(completeJobParamsFromDescription.selecttool),
    );
    apiData.append('carkey', 0); // ask

    apiData.append('image', result);

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
    } else {
      console.log('complete Job', responseData.message);

      Toast.show(responseData.message);
    }
  };

  render() {
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
                <Text style={styles.mytext}>Email Address</Text>
                <TextInput
                  style={styles.inputs}
                  placeholder="Enter email"
                  value={this.state.email}
                  onChangeText={email => this.setState({email})}
                />
              </View>

              <View style={styles.mt20}>
                <Text style={styles.mytext}>Notes</Text>
                <Textarea
                  style={[styles.inputs, {height: 100}]}
                  placeholder="Enter notes"
                  value={this.state.notes}
                  onChangeText={notes => this.setState({notes})}
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
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Customerdetail);
