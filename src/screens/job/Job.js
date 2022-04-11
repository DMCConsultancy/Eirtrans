import React, {Component} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  ImageBackground,
  ActivityIndicator,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import {Container, Item, Left, Right} from 'native-base';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import isEqual from 'lodash.isequal';

import styles from './Styles';
import {colors, images} from '../../global/globalStyle';
import Icon from 'react-native-vector-icons/Feather';
import Success from 'react-native-vector-icons/SimpleLineIcons';
import MyButton from '../../components/button/Mybutton';
import {URL} from '../../../config.json';
import Loader from '../../components/button/Loader';
import CustomStatusBar from '../../components/StatusBar';
import Header from '../../components/Header';
import Text from '../../components/Text';

import {getCurrentDate, PrettyPrintJSON} from '../../utils/helperFunctions';
import {setJobStatusFinalTruckScreenshot} from '../../redux/action/jobStatus';
import Toast from 'react-native-simple-toast';

class Job extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible_alert: false,
      data: [],
      currentDate: '',
      loading: true,

      showScreenshotLinks: false,
      photomodal_alert: false,
      truckImage: null,
      screenshotLoading: false,
      screenShotmodal_alert: false,
      refresh: true,
    };
  }

  componentDidMount() {
    this.getDriverAssignToLoader();
  }

  componentDidUpdate = prevProps => {
    const {jobStatus} = this.props;

    if (!isEqual(prevProps.jobStatus, jobStatus)) {
      let truckPicUpdated = false;

      if (jobStatus) {
        truckPicUpdated = jobStatus.every(jobs => jobs.status === 3);
      }

      this.setState(state => ({
        refresh: !state.refresh,
        showScreenshotLinks: !truckPicUpdated,
      }));
    }
  };

  UNSAFE_componentWillMount() {
    this.getCurrentDate();
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

        this.photoModal(!this.state.photomodal_alert);
      }
    });
  };

  setPhotos = source => {
    PrettyPrintJSON({source});

    this.screenShotModal(!this.state.screenShotmodal_alert);

    this.setState({
      truckImage: source.assets[0],
    });
  };

  renderItem = ({item}) => {
    const collectedStatus = this.checkIfLoadIsCollected(item);
    const loadDelivered = this.checkIfLoadIsDelivered(item);

    if (item.loadnumber === '2204894672') {
      console.log({collectedStatus, loadDelivered});
      PrettyPrintJSON({item});
    }

    if (loadDelivered) {
      return <View />;
    }

    if (collectedStatus >= 2) {
      return (
        <View style={styles.row}>
          <View style={styles.wdh90}>
            <MyButton
              title={item.load_title}
              onPress={() =>
                this.props.navigation.navigate('Testdetails', {
                  loadItem: item,
                })
              }
              backgroundColor="#fff"
              color="#000"
              textTransform="uppercase"
            />
          </View>
          <View style={styles.wdh10}>
            <View style={styles.iconContainer}>
              <Icon name="check" size={25} color={colors.success} />
            </View>
          </View>
        </View>
      );
    }

    return (
      <MyButton
        title={item.load_title}
        onPress={() =>
          this.props.navigation.navigate('Testdetails', {
            loadItem: item,
          })
        }
        backgroundColor="#fff"
        color="#000"
        textTransform="uppercase"
      />
    );
  };

  checkIfLoadIsCollected = item => {
    const {jobStatus} = this.props;
    const {showScreenshotLinks} = this.state;

    // console.log('checking If Load Is Collected...');

    let found = false;
    let truckPicUpdated = false;

    // console.log({jobStatus});

    if (jobStatus) {
      found = jobStatus.find(
        jobs => jobs.job_id === item.job_id && jobs.load_id === item.id,
      );

      truckPicUpdated = jobStatus.every(jobs => jobs.status === 3);

      // console.log({truckPicUpdated, status: found.status});
    }

    // if load collected by truck Pic is not updated show `Take Truck` link
    if (
      found &&
      found.status >= 2 &&
      !truckPicUpdated &&
      !showScreenshotLinks
    ) {
      this.setState({showScreenshotLinks: true});
    }

    PrettyPrintJSON({getCollectedStatus: found});

    return found ? found.status : 0;
  };

  checkIfLoadIsDelivered = item => {
    const {jobStatus} = this.props;

    // console.log('checking If Load Is delivered...');

    let found = false;

    // console.log({jobStatus});

    if (jobStatus) {
      found = jobStatus.find(
        jobs => jobs.load_id === item.id && jobs.status === 6,
      );

      // console.log({found});
    }

    return found;
  };

  setModalVisible = visible => {
    this.setState({modalVisible_alert: visible});
  };

  getCurrentDate() {
    const date = new Date();
    const d = date.getDate();
    const m = date.getMonth() + 1;
    const y = date.getFullYear();
    const currentDate = y + '-' + m + '-' + d;
    console.log({currentDate});
    this.setState({currentDate});
  }

  async getDriverAssignToLoader() {
    let url = URL + 'getDriverAssignToLoader';

    const params = {
      date: this.state.currentDate,
      driverid: this.props.driverDetails.id,
    };

    // console.log(JSON.stringify({params}, null, 4));
    // return;

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
        PrettyPrintJSON({responseData});
        let data = responseData.data;

        PrettyPrintJSON({dataaaa: data});

        data = data.filter(loadObj => loadObj);
        PrettyPrintJSON({jobssss: data});

        this.setState({data, loading: false});
      } else {
        console.log(responseData.message);
        this.setState({loading: false});
      }
    } catch (error) {
      console.log(error);
      this.setState({loading: false});
    }
  }

  photoModal = visible => {
    this.setState({photomodal_alert: visible});
  };

  screenShotModal = visible => {
    this.setState({screenShotmodal_alert: visible});
  };

  renderScreenshotLinks = () => {
    return (
      <TouchableOpacity
        onPress={() => this.photoModal(!this.state.photomodal_alert)}
        style={styles.linkCont}>
        <Text style={styles.link}>Click Here to take picture of truck</Text>
      </TouchableOpacity>
    );
  };

  handleUploadImage = async () => {
    const {truckImage} = this.state;
    const {setJobStatustoScreenshot, jobStatus} = this.props;

    this.setState({
      screenshotLoading: true,
    });

    let url = URL + 'finaltruck_screenshot';

    const driver_id = this.props.driverDetails?.id;

    const date = getCurrentDate(true);

    var apiData = new FormData();

    apiData.append('driver_id', driver_id);
    apiData.append('date', date);

    apiData.append('loadcontener_id', jobStatus[jobStatus.length - 1].load_id);

    apiData.append('screenshot', {
      uri: truckImage.uri,
      name: `${driver_id}_${date}_truck_picture.jpg`,
      type: 'image/jpg',
    });

    apiData.append('image', {
      uri: truckImage.uri,
      name: `${driver_id}_${date}_truck_picture.jpg`,
      type: 'image/jpg',
    });

    // PrettyPrintJSON({
    //   imageConfig: {
    //     uri: truckImage.uri,
    //     name: `${driver_id}_${crashReportParamsFromLoads.load_id}_screenshot.jpg`,
    //     type: 'image/jpg',
    //   },
    // });

    PrettyPrintJSON({apiData});
    // return;

    const requestOptions = {
      method: 'POST',
      body: apiData,
    };

    PrettyPrintJSON({requestOptions});

    console.log('final truck screenshot api');

    let apiCall = await fetch(url, requestOptions);
    let responseData = await apiCall.json();

    PrettyPrintJSON({responseData});

    this.setState({
      screenshotLoading: false,
    });

    if (responseData.response === 1) {
      console.log({screenshotAPI: responseData.message});

      this.screenShotModal(!this.state.screenShotmodal_alert);

      this.setModalVisible(!this.state.modalVisible_alert);

      setJobStatustoScreenshot();
    } else {
      console.log('final truck screenshotAPI else', responseData.message);
      Toast.show(responseData.message);
    }
  };

  render() {
    const {showScreenshotLinks, screenshotLoading, truckImage, refresh} =
      this.state;

    // PrettyPrintJSON({truckImage});

    const RenderScreenshotLinks = this.renderScreenshotLinks;

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

          <View style={styles.content}>
            <View style={styles.center}>
              <Image style={styles.logo} source={images.logo} />
            </View>

            <View style={{marginTop: '20%'}}>
              <FlatList
                extraData={refresh}
                data={this.state.data}
                renderItem={this.renderItem}
                style={{marginBottom: 110}}
                keyExtractor={item => item.id.toString()}
              />
            </View>
            {showScreenshotLinks && <RenderScreenshotLinks />}
            {/* <RenderScreenshotLinks /> */}
          </View>

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
          <View style={styles.center}>
            <View style={[styles.modalView, {alignItems: 'center'}]}>
              <Success name="check" color="green" size={56} />
              <Text style={styles.successtxt}>Success!</Text>

              <Text style={styles.mytxt}>
                Truck Image uploaded successfully
              </Text>

              <TouchableOpacity
                style={styles.okbtn}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible_alert);
                }}>
                <Text style={[styles.formLabal, {color: '#fff'}]}>Ok</Text>
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
              <Text style={styles.heading}>Take Truck Photo</Text>
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
              {truckImage && (
                <Image
                  source={{uri: truckImage.uri}}
                  style={styles.imageShot}
                />
              )}
              <TouchableOpacity
                style={styles.sendScreenbtn}
                onPress={() => {
                  this.handleUploadImage();
                }}>
                {screenshotLoading ? (
                  <ActivityIndicator color={'#000'} size={'large'} />
                ) : (
                  <Text style={[styles.formLabalHeading, {color: '#000'}]}>
                    Upload Image
                  </Text>
                )}
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
});

const mapDispatchToProps = dispatch => ({
  setJobStatustoScreenshot: () => dispatch(setJobStatusFinalTruckScreenshot()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Job);
