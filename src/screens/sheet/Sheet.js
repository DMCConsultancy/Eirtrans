import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Modal,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import st from '../../global/styles/Styles';
import Mycheckbox from '../../components/Mycheckbox';
import Button from '../../components/button/Button';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {images, colors} from '../../global/theme/Theme';
import {getApi, uploadApi} from '../../utils/apicalls/apicalls';
import {API} from '../../utils/endpoints/endpoints';
import {errorRes} from '../../utils/helper/helperfunctions';
import Loader from '../../components/Loader';
import {getPickerImageResp} from '../../utils/helper/helperfunctions';

const Sheet = ({navigation}) => {
  const [data, setData] = useState([]);
  const [expenses, setExpenses] = useState('');
  const [items, setItem] = useState(navigation.getParam("item"))//route.params.item);
  const [expensefilePath, setExpenseFilePath] = useState(null);
  const [damagefilePath, setDamageFilePath] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('');

  const onValueChange = (text, index) => {
    const mydata = [...data];
    mydata[index].check = !text.check;
    setData(mydata);

    //total expenses
    const arr = mydata.filter(i => i.check === true);
    let amount = 0;
    for (let i = 0; i < arr.length; i++) {
      amount = amount + parseInt(arr[i].amount);
    }
    setExpenses(amount);
  };

  const ItemView = ({item, index}) => {
    if (items.id <= 5) {
      if (item.id <= 5)
        return (
          <Mycheckbox
            title={item.type}
            value={item.check}
            onValueChange={() => onValueChange(item, index)}
          />
        );
    } else {
      if (item.id > 5)
        return (
          <Mycheckbox
            title={item.type}
            value={item.check}
            onValueChange={() => onValueChange(item, index)}
          />
        );
    }
  };

  const toggleModalVisibility = isModalVisible => {
    setIsModalVisible(isModalVisible);
  };

  const checkCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Eirtans Camera Permission',
            message:
              'Eirtrans needs access to your camera ' +
              'so you can change your profile picture.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const checkWriteToExternalPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Eirtans Storage Permission',
            message:
              'Eirtans needs to write to your storage ' +
              'to save your picture in Gallery',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Storage permission approved');
          return true;
        } else {
          console.log('Storage permission denied');
          return false;
        }
      } catch (err) {
        console.warn(err);
        console.log(err);
      }
    } else return true;
  };

  const handleTakePhoto = async () => {
    const isCameraPermitted = await checkCameraPermission();
    let isStoragePermitted = await checkWriteToExternalPermission();

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
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
          toggleModalVisibility(!isModalVisible);
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
          toggleModalVisibility(!isModalVisible);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          alert(response.customButton);
          toggleModalVisibility(!isModalVisible);
        } else {
          let source = response;
          toggleModalVisibility(!isModalVisible);
          const data = getPickerImageResp(source);
          // console.log(data)
          if (mode == 'expeses') {
            setExpenseFilePath(data);
          } else {
            setDamageFilePath(data);
          }
        }
      });
    }
  };

  const handleChooseFromGallery = () => {
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
        toggleModalVisibility(!isModalVisible);
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        toggleModalVisibility(!isModalVisible);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
        toggleModalVisibility(!isModalVisible);
      } else {
        let source = response;
        const data = getPickerImageResp(source);
        if (mode == 'expeses') {
          setExpenseFilePath(data);
        } else {
          setDamageFilePath(data);
        }
        toggleModalVisibility(!isModalVisible);
      }
    });
  };

  useEffect(() => {
    getExpenseType_handle();
  }, []);

  const getExpenseType_handle = async () => {
    const api = API.GET_EXPENSETYPE;
    try {
      setLoading(true);
      const result = await getApi(api);
      // console.log({result: result.data});
      if (result.status == 200) {
        setLoading(false);
        const data = result.data.data;
        data.map(v => ({...v, check: false}));
        setData(data);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      errorRes(e);
    }
  };

  const saveTimeSheet_Handle = async () => {
    const api = API.SAVETIMESHEET;

    const arr = data.filter(i => i.check === true);
    let ids = [];
    for (let i = 0; i < arr.length; i++) {
     let myid = arr[i].id;
      ids.push(myid)
    }

    const formdata = new FormData();
    formdata.append('driver_id', '1');
    formdata.append('expence', ids.toString());
    if (damagefilePath) formdata.append('damage', damagefilePath);
    // formdata.append('total_hours', '166');
    // formdata.append('total_wage', '13');
    formdata.append('day', items.id);
    if (expensefilePath) formdata.append('expence_image', expensefilePath);
    try {
      setLoading(true);
      const result = await uploadApi(api, formdata);
      // console.log({result: result});
      if (result.status == 200) {
        const data = result.data;
        alert(data.message);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      errorRes(e);
    }
  };

  return (
    <View style={st.flex}>
      <Loader visible={loading} />
      <Header title={`Weekly Time Sheet ${'\n'}${'\n'} ${items.day}`} />

      <ScrollView>
        <View style={st.pd20}>
          <View>
            <FlatList
              data={data}
              renderItem={ItemView}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>

          <View style={[st.row, st.mt_v, st.pd20]}>
            <View style={[st.wdh50]}>
              <View style={st.box}>
                <Text style={st.tx20}>{'Expenses'}</Text>
                <Text style={st.tx14}>{`Amount: ${expenses}`}</Text>
              </View>
              <View style={st.align_C}>
                <Button
                  title={'Upload'}
                  onPress={() => {
                    toggleModalVisibility(!isModalVisible), setMode('expeses');
                  }}
                />
              </View>
            </View>

            <View style={[st.wdh50]}>
              <View style={st.box2}>
                <View style={{marginLeft: 30}}>
                  <Text style={st.tx20}>{'Damage'}</Text>
                  <Text style={st.tx14}>
                    {'Car Reg:      '}
                    {'Date:      '}
                  </Text>
                </View>
              </View>
              <View style={st.align_C}>
                <Button
                  title={'Upload'}
                  onPress={() => {
                    toggleModalVisibility(!isModalVisible), setMode('damage');
                  }}
                />
              </View>
            </View>
          </View>

          <View style={[st.align_C]}>
            <Button title={'Save'} onPress={() => saveTimeSheet_Handle()} />
          </View>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent
        visible={isModalVisible}
        presentationStyle="overFullScreen"
        onRequestClose={() => toggleModalVisibility(!isModalVisible)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={[st.tx18, st.txAlignC]}>Upload</Text>

            <TouchableOpacity
              style={styles.cross_btn}
              onPress={() => toggleModalVisibility(!isModalVisible)}>
              <Text style={[st.tx18, {color: colors.orange}]}>X</Text>
            </TouchableOpacity>

            <View style={styles.border} />

            <View style={[st.row, styles.contaier]}>
              <TouchableOpacity
                style={st.align_C}
                onPress={() => handleTakePhoto()}>
                <Image source={images.camera} style={{width: 30, height: 30}} />
                <Text style={[st.tx14, st.color_S]}>{'Take a photo'}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={st.align_C}
                onPress={() => handleChooseFromGallery()}>
                <Image
                  source={images.gallery}
                  style={{width: 30, height: 30}}
                />
                <Text style={[st.tx14, st.color_S]}>{'From Gallery'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Sheet;

const styles = StyleSheet.create({
  centeredView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  border: {
    height: 1,
    backgroundColor: colors.danger,
  },
  icnsty: {
    width: 30,
    height: 30,
  },
  contaier: {
    justifyContent: 'space-around',
    paddingTop: 20,
  },
  cross_btn: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
});
