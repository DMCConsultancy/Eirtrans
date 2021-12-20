import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  StatusBar,
  FlatList,
  Modal,
  TextInput,
  Platform,
  Dimensions,
  ScrollView,
} from 'react-native';
import {Container, Left, Right} from 'native-base';
import {captureScreen} from 'react-native-view-shot';
import Success from 'react-native-vector-icons/SimpleLineIcons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import CustomStatusBar from '../../components/StatusBar';
import Header from '../../components/Header';

import {colors, images} from '../../global/globalStyle';

import styles from './Styles';

const numColumns = 3;
const Item_wdh = Dimensions.get('window').width;

export default class Truckdetail extends Component {
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
    this.setState({selectedItem: index});
    if (index == '11') {
      this.captureScreenFunction();
      this.screenShotModal(true);
      console.log({index});
    } else {
      // this.chooseFile()
      this.photoModal(!this.state.photomodal_alert);
    }
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
        this.setModalVisible(!this.state.modalVisible_alert);
        this.photoModal(!this.state.photomodal_alert);
      }
    });
  };

  ItemView = ({item, index}) => {
    return (
      <View style={[styles.container, {marginTop: 10}]}>
        <TouchableOpacity onPress={() => this.onPress(item.id)}>
          <View style={styles.btnsty}>
            <Text
              style={
                this.state.selectedItem === item.id
                  ? [styles.text, {color: colors.danger}]
                  : styles.text
              }>
              {item.labal}
            </Text>
          </View>
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

  render() {
    const state = this.state;
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

          <ScrollView>
            <View style={styles.content}>
              <Image source={images.car} style={styles.imgsty} />
            </View>
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
              style={{paddingHorizontal: 15, marginTop: 20}}
              data={this.formatData(this.state.data1, numColumns)}
              renderItem={this.ItemView}
              keyExtractor={(item, index) => index.toString()}
              numColumns={numColumns}
            />
          </ScrollView>
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
                    this.setModalVisible(!this.state.modalVisible_alert);
                    this.setModal(!this.state.modalVisible_alert1);
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
                    this.props.navigation.navigate('Description');
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
                  this.setState({showtxt: true});
                  this.screenShotModal(!this.state.screenShotmodal_alert);
                  this.setModal(!this.state.modalVisible_alert1);
                }}>
                <Text style={[styles.formLabal, {color: '#000'}]}>
                  Send Screenshot
                </Text>
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
              <Text style={styles.heading}>Take Dent Photo</Text>
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

const data = [
  {labal: 'Dent', id: '1'},
  {labal: 'Broken', id: '2'},
  {labal: 'Cracked', id: '3'},
  {labal: 'Chipped', id: '4'},
  {labal: 'Scratched', id: '5'},
  {labal: 'Holed', id: '6'},
  {labal: 'Missing', id: '7'},
  {labal: 'Other', id: '8'},
  {labal: 'Torn', id: '9'},
];

const data1 = [
  {labal: 'Reset', id: '10'},
  {labal: 'Record & Continue', id: '11'},
  {labal: 'View Photos', id: '12'},
];
