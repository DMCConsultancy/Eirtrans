import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  FlatList,
  Modal,
  TextInput,
  Platform,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import {Container, Left, Right} from 'native-base';
import {captureScreen} from 'react-native-view-shot';
import Success from 'react-native-vector-icons/SimpleLineIcons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import {connect} from 'react-redux';

import {URL} from '../../../config.json';

import CustomStatusBar from '../../components/StatusBar';
import Header from '../../components/Header';

import {colors, images} from '../../global/globalStyle';

import styles from './Styles';
import {PrettyPrintJSON} from '../../utils/helperFunctions';
import Loader from '../../components/button/Loader';
import Text from '../../components/Text';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import CarDamageMarking from '../../components/CarDamageMarking';

const numColumns = 3;

class Truckdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible_alert: false,
      showtxt: false,
      messege: '',
      selectedItem: null,
      photomodal_alert: false,
      data: data,
      modalVisible_alert1: false,
      data1: data1,
      imageURI: '',
      screenShotmodal_alert: false,
      photos: [],
      loading: false,
      screenshotLoading: false,

      markingText: null,
      markingDamageIndex: -1,
    };
  }

  formatData = (data, numColumns) => {
    if (data != undefined) {
      const numberOfFullRows = Math.floor(data.length / numColumns);
      let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
      while (
        numberOfElementsLastRow !== numColumns &&
        numberOfElementsLastRow !== 0
      ) {
        data.push({key: `blank-${numberOfElementsLastRow}`, empty: true});
        numberOfElementsLastRow++;
      }
      return data;
    }
  };

  captureScreenFunction = () => {
    captureScreen({
      format: 'jpg',
      quality: 0.8,
    }).then(
      uri => {
        this.setState({imageURI: uri});
      },
      error => console.error('Oops, Something Went Wrong', error),
    );
  };

  onPress(index) {
    const {photos} = this.state;

    this.setState({selectedItem: index, markText: null});

    console.log({index});

    if (index === '11') {
      this.captureScreenFunction();
      this.screenShotModal(true);
      console.log({index});
    } else if (index === '12') {
      this.props.navigation.navigate('ViewCarshReport', {
        photos,
      });
    } else {
      // this.chooseFile()
      // Todo: call `crashReport` API
      this.photoModal(!this.state.photomodal_alert);
    }
  }

  handleMarking = damageID => {
    const damage = data.find(damageObj => damageObj.id === damageID);

    console.log({damage});

    if (damage) {
      this.setState({
        markingText: damage.init,
        markingDamageIndex: damageID,
      });
    }
  };

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

  chooseFile = async () => {
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
          this.photoModal(!this.state.photomodal_alert);
          alert('User cancelled camera picker');
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          this.photoModal(!this.state.photomodal_alert);
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          this.photoModal(!this.state.photomodal_alert);
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          this.photoModal(!this.state.photomodal_alert);
        } else {
          let source = response;
          console.log('source', source);

          this.setPhotos(source);

          this.setModalVisible(!this.state.modalVisible_alert);
          this.photoModal(!this.state.photomodal_alert);
        }
      });
    }
  };

  chooseFileGallery = () => {
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
        this.photoModal({photomodal_alert: false});
        console.log('User cancelled image picker');
      } else if (response.error) {
        this.photoModal({photomodal_alert: false});
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        this.photoModal({photomodal_alert: false});
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
        this.photoModal({photomodal_alert: false});
      } else {
        let source = response;
        console.log('source', source);

        this.setPhotos(source);

        this.setModalVisible(!this.state.modalVisible_alert);
        this.photoModal(!this.state.photomodal_alert);
      }
    });
  };

  setPhotos = source => {
    PrettyPrintJSON({source});

    this.setState(state => {
      let photos = [...state.photos];

      photos.push({
        source,
        type: data.find(ele => ele.id === state.selectedItem),
        id: data.find(ele => ele.id === state.selectedItem).id,
      });

      return {
        photos,
        imageURI: source.assets[0]?.uri,
      };
    });
  };

  ItemView = ({item, index}) => {
    const {photos} = this.state;

    const photosFound = photos.find(ele => ele.id === item.id);

    const actionButton = ['10', '11', '12'].includes(item.id);

    // do not include buttons from button as selected item
    const condition = photosFound && !actionButton;

    // console.log({condition, photosFound});

    return (
      <View style={[styles.container, {marginTop: 10}]}>
        <TouchableOpacity
          style={[
            styles.btnsty,
            condition ? {backgroundColor: colors.danger} : {},
          ]}
          onPress={() => {
            if (actionButton) {
              this.onPress(item.id);
            } else {
              this.handleMarking(item.id);
            }
          }}>
          <Text
            style={condition ? [styles.text, {color: '#fff'}] : styles.text}>
            {item.label}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  setModalVisible = visible => {
    this.setState({modalVisible_alert: visible});
  };

  setModal = visible => {
    this.setState({modalVisible_alert1: visible});
  };

  screenShotModal = visible => {
    this.setState({screenShotmodal_alert: visible});
  };

  photoModal = visible => {
    this.setState({photomodal_alert: visible});
  };

  handleCrashReport = async () => {
    const {selectedItem, messege, imageURI} = this.state;

    this.setState({
      loading: true,
    });

    const crashReportParamsFromLoads = this.props.navigation.getParam(
      'crashReportParams',
      null,
    );

    PrettyPrintJSON({crashReportParamsFromLoads});

    let url = URL + 'creatcrashreport';

    const driver_id = this.props.login?.id;

    var apiData = new FormData();

    apiData.append('driver_id', driver_id);
    apiData.append('type', selectedItem);
    apiData.append('user_id', crashReportParamsFromLoads.user_id);
    apiData.append('loadcontener_id', crashReportParamsFromLoads.load_id);
    apiData.append('job_id', crashReportParamsFromLoads.job_id);
    apiData.append('details', messege);
    apiData.append('screenshot', {
      uri: imageURI,
      name: `${selectedItem}_${driver_id}_${crashReportParamsFromLoads.user_id}_screenshot.jpg`,
      type: 'image/jpg',
    });
    apiData.append('image', {
      uri: imageURI,
      name: `${selectedItem}_${driver_id}_${crashReportParamsFromLoads.user_id}_screenshot.jpg`,
      type: 'image/jpg',
    });

    PrettyPrintJSON({
      imageConfig: {
        uri: imageURI,
        name: `${selectedItem}_${driver_id}_${crashReportParamsFromLoads.user_id}_screenshot.jpg`,
        type: 'image/jpg',
      },
    });

    PrettyPrintJSON({apiData});
    // return;

    const requestOptions = {
      method: 'POST',
      body: apiData,
    };

    PrettyPrintJSON({requestOptions});

    console.log('createCrashReport');

    let apiCall = await fetch(url, requestOptions);
    let responseData = await apiCall.json();

    PrettyPrintJSON({responseData});

    this.setState({
      loading: false,
      messege: '',
    });

    if (responseData.response === 1) {
      console.log({createCrashReport: responseData.message});

      // this.setState({showtxt: true});
      // this.screenShotModal(!this.state.screenShotmodal_alert);
      // this.setModal(!this.state.modalVisible_alert1);

      this.setModalVisible(!this.state.modalVisible_alert);
      this.setModal(!this.state.modalVisible_alert1);
    } else {
      console.log('createCrashReport else', responseData.message);
      Toast.show(responseData.message);
    }
    // NetInfo.fetch().then(async state => {
    //   if (state.isConnected == true) {
    //     try {

    //     } catch (error) {
    //       console.log(error);
    //       this.props.createMorningError(responseData.message);
    //       this.setState({acceptbtn: false});
    //     }
    //   } else {
    //     this.setState({netVisible_alert: true});
    //     this.setState({acceptbtn: false});
    //     Toast.show(
    //       'You are offline, your data is saved in local. Once you are connected to the internet your data will be sync.',
    //       Toast.LONG,
    //     );
    //   }
    // });
  };

  handleScreenshot = async () => {
    const {messege, imageURI} = this.state;

    this.setState({
      screenshotLoading: true,
    });

    const crashReportParamsFromLoads = this.props.navigation.getParam(
      'crashReportParams',
      null,
    );

    PrettyPrintJSON({crashReportParamsFromLoads});

    let url = URL + 'screenshot';

    const driver_id = this.props.login?.id;

    var apiData = new FormData();

    apiData.append('driver_id', driver_id);
    apiData.append('user_id', crashReportParamsFromLoads.user_id);
    apiData.append('loadcontener_id', crashReportParamsFromLoads.load_id);
    apiData.append('job_id', crashReportParamsFromLoads.job_id);
    apiData.append('details', messege);
    apiData.append('screenshot', {
      uri: imageURI,
      name: `${driver_id}_${crashReportParamsFromLoads.user_id}_screenshot.jpg`,
      type: 'image/jpg',
    });
    apiData.append('image', {
      uri: imageURI,
      name: `${driver_id}_${crashReportParamsFromLoads.user_id}_screenshot.jpg`,
      type: 'image/jpg',
    });

    PrettyPrintJSON({
      imageConfig: {
        uri: imageURI,
        name: `${driver_id}_${crashReportParamsFromLoads.user_id}_screenshot.jpg`,
        type: 'image/jpg',
      },
    });

    PrettyPrintJSON({apiData});
    // return;

    const requestOptions = {
      method: 'POST',
      body: apiData,
    };

    PrettyPrintJSON({requestOptions});

    console.log('screenshot api');

    let apiCall = await fetch(url, requestOptions);
    let responseData = await apiCall.json();

    PrettyPrintJSON({responseData});

    this.setState({
      screenshotLoading: false,
    });

    if (responseData.response === 1) {
      console.log({screenshotAPI: responseData.message});

      this.setState({showtxt: true});
      this.screenShotModal(!this.state.screenShotmodal_alert);
      this.setModal(!this.state.modalVisible_alert1);

      // this.setModalVisible(!this.state.modalVisible_alert);
      // this.setModal(!this.state.modalVisible_alert1);
    } else {
      console.log('screenshotAPI else', responseData.message);
      Toast.show(responseData.message);
    }
    // NetInfo.fetch().then(async state => {
    //   if (state.isConnected == true) {
    //     try {

    //     } catch (error) {
    //       console.log(error);
    //       this.props.createMorningError(responseData.message);
    //       this.setState({acceptbtn: false});
    //     }
    //   } else {
    //     this.setState({netVisible_alert: true});
    //     this.setState({acceptbtn: false});
    //     Toast.show(
    //       'You are offline, your data is saved in local. Once you are connected to the internet your data will be sync.',
    //       Toast.LONG,
    //     );
    //   }
    // });
  };

  redirectToDescriptionPage = () => {
    const crashReportParamsFromLoads = this.props.navigation.getParam(
      'crashReportParams',
      null,
    );

    console.log({crashReportParamsFromLoads});

    this.props.navigation.navigate('Description', {
      completeJobParams: crashReportParamsFromLoads,
    });
  };

  render() {
    const {screenshotLoading, markingText, markingDamageIndex} = this.state;

    console.log({markingText, markingDamageIndex});

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

            <Right>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Home')}
                style={styles.rightbox}>
                <Text style={styles.text}>HOME</Text>
              </TouchableOpacity>
            </Right>
          </Header>

          <ScrollView style={styles.scrollView}>
            <CarDamageMarking
              markText={markingText}
              afterMarkExec={() => this.onPress(markingDamageIndex)}>
              <Image source={images.car} style={styles.imgsty} />
            </CarDamageMarking>
            <FlatList
              columnWrapperStyle={styles.row}
              style={{paddingHorizontal: 15}}
              data={this.formatData(this.state.data, numColumns)}
              renderItem={this.ItemView}
              keyExtractor={(item, index) => index.toString()}
              numColumns={numColumns}
              extraData={this.state.data}
            />

            <FlatList
              columnWrapperStyle={styles.row}
              style={{paddingHorizontal: 15, marginTop: 20, paddingBottom: 10}}
              data={this.formatData(this.state.data1, numColumns)}
              renderItem={this.ItemView}
              keyExtractor={(item, index) => index.toString()}
              numColumns={numColumns}
            />
          </ScrollView>
          {this.state.loading == true && <Loader />}
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
              <Text style={styles.damagetxt}>Damage Detail</Text>
              <View style={styles.bordersty} />
              <Text style={styles.text}>
                Enter additional notes if required
              </Text>

              <TextInput
                style={styles.input}
                value={this.state.messege}
                onChangeText={messege => this.setState({messege})}
              />

              <View style={[styles.bordersty, {backgroundColor: '#ccc'}]} />

              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() =>
                    this.setModalVisible(!this.state.modalVisible_alert)
                  }
                  style={styles.mybtnsty}>
                  <Text style={styles.damagetxt}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.handleCrashReport();
                  }}
                  style={[
                    styles.mybtnsty,
                    {borderLeftWidth: 2, borderLeftColor: '#ccc'},
                  ]}>
                  <Text style={styles.damagetxt}>Ok</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible_alert1}
          onBackdropPress={() => this.setModal(!this.state.modalVisible_alert1)}
          onRequestClose={() => {
            this.setModal(!this.state.modalVisible_alert1);
          }}>
          <View style={styles.center}>
            <View style={[styles.modalView, {alignItems: 'center'}]}>
              <Success name="check" color={colors.primarylight} size={56} />
              <Text style={styles.successtxt}>Success!</Text>
              {this.state.showtxt == true ? (
                <Text style={styles.mytxt}>
                  Damage details recorded successfully.
                </Text>
              ) : (
                <Text style={styles.mytxt}></Text>
              )}

              <TouchableOpacity
                style={styles.okbtn}
                onPress={() => {
                  this.setModal(!this.state.modalVisible_alert1);
                  if (this.state.showtxt == true) {
                    this.redirectToDescriptionPage();
                  }
                }}>
                <Text style={styles.formLabal}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.screenShotmodal_alert}
          onBackdropPress={() =>
            this.screenShotModal(!this.state.screenShotmodal_alert)
          }
          onRequestClose={() => {
            this.screenShotModal(!this.state.screenShotmodal_alert);
          }}>
          <View style={styles.center}>
            <View style={styles.modalViewscreen}>
              <Image
                source={{uri: this.state.imageURI}}
                style={styles.imageShot}
              />
              <TouchableOpacity
                style={styles.sendScreenbtn}
                onPress={() => {
                  // Todo: call API `screenshot`

                  // screenshotLoading

                  this.handleScreenshot();
                }}>
                {screenshotLoading ? (
                  <ActivityIndicator color={'#000'} size={'large'} />
                ) : (
                  <Text style={[styles.formLabal, {color: '#000'}]}>
                    Send Screenshot
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.photomodal_alert}
          onBackdropPress={() => this.photoModal(!this.state.photomodal_alert)}
          onRequestClose={() => {
            this.photoModal(!this.state.photomodal_alert);
          }}>
          <View style={styles.center}>
            <View style={styles.modalView}>
              <Text style={styles.heading}>Take Damage Photo</Text>
              <TouchableOpacity
                onPress={() => this.chooseFile()}
                style={styles.mt20}>
                <Text style={[styles.formLabal, {color: '#000'}]}>
                  Take a photo
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.chooseFileGallery()}
                style={styles.mt20}>
                <Text style={[styles.formLabal, {color: '#000'}]}>
                  Pick from Gallery
                </Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(Truckdetail);

const data = [
  {init: 'D', label: 'Dent', id: '1'},
  {init: 'B', label: 'Broken', id: '2'},
  {init: 'Cr', label: 'Cracked', id: '3'},
  {init: 'Ch', label: 'Chipped', id: '4'},
  {init: 'S', label: 'Scratched', id: '5'},
  {init: 'H', label: 'Holed', id: '6'},
  {init: 'M', label: 'Missing', id: '7'},
  {init: 'O', label: 'Other', id: '8'},
  {init: 'T', label: 'Torn', id: '9'},
];

const data1 = [
  {label: 'Reset', id: '10'},
  {label: 'Record & Continue', id: '11'},
  {label: 'View Photos', id: '12'},
];
