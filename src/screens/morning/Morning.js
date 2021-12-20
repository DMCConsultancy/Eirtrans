import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {Container, Left, Right} from 'native-base';
import styles from './Styles';
import Toast from 'react-native-simple-toast';
import {images, size, fontfamily, colors} from '../../global/globalStyle';
import Icon from 'react-native-vector-icons/Feather';
import Check from 'react-native-vector-icons/Fontisto';
import Error from 'react-native-vector-icons/MaterialIcons';
import Success from 'react-native-vector-icons/SimpleLineIcons';
import {
  Table,
  TableWrapper,
  Row,
  Cell,
  Col,
  Rows,
} from 'react-native-table-component';
import {URL} from '../../../config.json';
import Loader from '../../components/button/Loader';
import Header from '../../components/Header';

import {connect} from 'react-redux';
import {
  getAllItems,
  setAllItems,
  AllItemsError,
} from '../../redux/action/allItem';
import {
  getCreateMorning,
  setCreateMorning,
  createMorningError,
} from '../../redux/action/createmorningaccepted';
import NetInfo from '@react-native-community/netinfo';
import MyModal from '../../components/button/Mymodal';
import {checkInternet} from '../../api/internet';
import {
  setMorningData,
  MorningDataclear,
} from '../../redux/action/setmorningdata';
import CustomStatusBar from '../../components/StatusBar';

class Morning extends Component {
  constructor(props) {
    super(props);
    this.state = {
      truck: '',
      showChecked: '',
      showYes: false,
      Trailar: '',
      setYestable: [],
      remark: '',
      generalRemark: '',
      nilStatus: false,
      Mileage: '',
      modalVisible_alert: false,
      tableHead: ['Item', 'Checked', 'Remark'],
      trcukid: '',
      netVisible_alert: false,
      tableData: [],
      currentDate: '',
      message: '',
      acceptbtn: false,
      selectedUniqueItems: undefined,
      data: [],
      pointerEvents: false,
      showmsg: true,
    };
  }

  _alertIndex(index, cellIndex) {
    // Alert.alert(`This is row ${index + 1}`);
    this.setState({showChecked: true, showYes: !this.state.showYes});
  }

  setTable() {
    const data = this.props.allItem.data;
    console.log({data});
    let items = [];
    for (let i = 0; i < data.length; i++) {
      // console.log("i",data[i])
      const newData = data[i];
      for (let j = 0; j < newData.length; j++) {
        //  console.log("j",newData[j])
        let obj = {
          id: i,
          item: newData[0],
          type: newData[1],
          remarks: newData[2],
        };
        //  console.log(obj)
        items.push(obj);
      }
      //    console.log({items})
      const key = 'id';
      const arrayUniqueByKey = [
        ...new Map(items.map(item => [item[key], item])).values(),
      ];
      this.setState({selectedUniqueItems: arrayUniqueByKey});
      // console.log(arrayUniqueByKey)
    }
  }

  UNSAFE_componentWillMount() {
    const truck = this.props.SelectedTruckDetail?.data;
    if (truck != undefined) {
      var data = this.props.truckDetail?.data.find(x => x.value === truck);
      this.setState({trcukid: data?.id});
    }
  }

  NilStatus() {
    if (this.state.nilStatus == false) {
      this.setState({nilStatus: true});
      this.allitem();
      this.setState({tableData: []});
    } else {
      this.setState({nilStatus: false});
      this.allitem();
      this.setState({setYestable: []});
    }
  }

  validation() {
    if (this.state.Trailar != '') {
      this.setState({errorTrailar: false});
    } else {
      this.setState({errorTrailar: true});
    }

    if (this.state.Mileage != '') {
      this.setState({errorMileage: false});
    } else {
      this.setState({errorMileage: true});
    }
  }

  setModalVisible = visible => {
    this.setState({modalVisible_alert: visible});
  };

  netVisible = visible => {
    this.setState({netVisible_alert: visible});
  };

  async dataConnection() {
    const connection = await checkInternet();
    // console.log("internet check",connection)
    if (
      connection.isConnected == true &&
      connection.isInternetReachable == true
    ) {
      this.setState({netVisible_alert: false});
    } else {
      this.setState({netVisible_alert: true});
    }

    if (
      this.props.getMorning.data != null &&
      connection.isConnected == true &&
      connection.isInternetReachable == true
    ) {
      this.createmorning();
      this.props.MorningDataclear();
      console.log('when connect internet');
      this.setState({showmsg: false});
    }
  }

  onPress() {
    const {
      Mileage,
      Trailar,
      generalRemark,
      currentDate,
      trcukid,
      nilStatus,
      selectedUniqueItems,
    } = this.state;
    let data = {
      Mileage,
      Trailar,
      generalRemark,
      currentDate,
      trcukid,
      nilStatus,
      selectedUniqueItems,
    };
    this.props.setMorningData(data);

    if (Trailar != '' && Mileage != '') {
      this.validation();
      this.createmorning();
    } else {
      this.validation();
    }
  }

  element(cellIndex, data, index) {
    if (cellIndex == 2) {
      return (
        <View style={{alignItems: 'center'}}>
          <TextInput
            style={styles.input}
            value={data}
            onChangeText={remark => {
              const tableData = this.props.allItem.data;
              const newCompanies = [...tableData];
              newCompanies[index][cellIndex] = remark;
              // console.log({ newCompanies })
              this.setTable();
              this.setState({tableData: newCompanies});
            }}
          />
        </View>
      );
    }
    if (cellIndex == 1) {
      return (
        <TouchableOpacity
          style={[styles.container]}
          onPress={() => {
            this._alertIndex(index, cellIndex);
            // console.log({ cellIndex, index })
            const tableData = this.props.allItem.data;
            const newCompanies = [...tableData];
            this.state.showYes == true
              ? (newCompanies[index][cellIndex] = 'N')
              : (newCompanies[index][cellIndex] = 'Y');
            console.log({newCompanies});
            this.setState({tableData: newCompanies});
            this.setTable();
          }}>
          {data == '0' || data == ''}
          {data == 'Y' && (
            <View style={styles.yesbtn}>
              <Text style={styles.btnText}>Y</Text>
            </View>
          )}

          {data == 'N' && (
            <View style={styles.nobtn}>
              <Text style={styles.btnText}>N</Text>
            </View>
          )}
        </TouchableOpacity>
      );
    } else {
      return (
        <View>
          <Text style={styles.title}>{data}</Text>
        </View>
      );
    }
  }

  async createmorning(getdata = this.props.getMorning?.data) {
    // console.log("create morning getMorning",this.props.getdata)
    // console.log("create morning sstate",this.state)
    this.setState({acceptbtn: true});
    const {
      Mileage,
      Trailar,
      generalRemark,
      currentDate,
      trcukid,
      nilStatus,
      selectedUniqueItems,
    } = this.state;
    const driver_id = this.props.login?.data[0]?.id;
    let nil = '';
    if (nilStatus == false) {
      nil = 'n';
    } else {
      nil = 'c';
    }

    let url = URL + 'createmorningaccepted';
    const params = {
      general: getdata?.generalRemark || generalRemark,
      trailerid: getdata?.Trailar || Trailar,
      mileage: getdata?.Mileage || Mileage,
      trcukid: getdata?.trcukid || trcukid,
      trucknumber: this.props.SelectedTruckDetail?.data,
      datetime: getdata?.currentDate || currentDate,
      driver_id: driver_id,
      nil: nil,
      selectitem: getdata?.selectedUniqueItems || selectedUniqueItems,
    };

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

    this.props.getCreateMorning();
    // console.log("params=>",params)
    console.log('Call createmorning accepted');
    NetInfo.fetch().then(async state => {
      if (state.isConnected == true) {
        try {
          let apiCall = await fetch(url, requestOptions);
          let responseData = await apiCall.json();
          if (responseData.response === 1) {
            this.props.setCreateMorning(responseData);
            console.log('createmorningaccepted', responseData.message);

            this.setState({message: responseData.message, acceptbtn: false});
            this.props.MorningDataclear();
            if (this.state.showmsg == true) {
              this.setModalVisible(!this.state.modalVisible_alert);
            }
          } else {
            this.props.createMorningError(responseData.message);
            console.log('createmorningaccepted else', responseData.message);
            this.setState({acceptbtn: false});
            Toast.show(responseData.message);
          }
        } catch (error) {
          console.log(error);
          this.props.createMorningError(responseData.message);
          this.setState({acceptbtn: false});
        }
      } else {
        this.setState({netVisible_alert: true});
        this.setState({acceptbtn: false});
        Toast.show(
          'You are offline, your data is saved in local. Once you are connected to the internet your data will be sync.',
          Toast.LONG,
        );
      }
    });
  }

  async allitem() {
    let url = URL + 'getallitem';
    const requestOptions = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    this.props.getAllItems();
    try {
      let apiCall = await fetch(url, requestOptions);
      let responseData = await apiCall.json();
      if (responseData.response == 1) {
        const data = responseData.data;
        if (this.state.nilStatus == true) {
          for (let i = 0; i < data.length; i++) {
            var joined = this.state.setYestable.concat([
              [data[i].name, 'Y', ''],
            ]);
            this.props.setAllItems(joined);
            this.setState({setYestable: joined});
            console.log('table data', joined);
          }
        } else {
          for (let i = 0; i < data.length; i++) {
            var joined = this.state.tableData.concat([
              [data[i].name, data[i].status, ''],
            ]);
            this.props.setAllItems(joined);
            this.setState({tableData: joined});
            //    console.log("table data",joined)
          }
        }
      } else {
        this.props.AllItemsError(responseData.message);
        console.log(responseData.message);
      }
    } catch (error) {
      this.props.AllItemsError(responseData.message);
      console.log(error);
    }
  }

  async getMorningAccepted_by_id() {
    let url =
      URL + 'getMorningAccepted_by_id/' + this.props.createMorning.data?.id;
    const requestOptions = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    try {
      let apiCall = await fetch(url, requestOptions);
      let responseData = await apiCall.json();
      if (responseData.response == 1) {
        if (responseData.res != null) {
          const data = responseData.res;
          console.log('getMorningAccepted_by_id', responseData);
          this.setState({
            generalRemark: data.general,
            Trailar: data.trailerid,
            Mileage: data.mileage,
            currentDate: data.datetime,
          });
          if (data.nil == 'c') {
            this.setState({nilStatus: true});
          } else {
            this.setState({nilStatus: false});
          }

          const selectitem = JSON.parse(data.selectitem);
          //   console.log({selectitem})

          for (let i = 0; i < selectitem.length; i++) {
            var joined = this.state.tableData.concat([
              [selectitem[i].item, selectitem[i].type, selectitem[i].remarks],
            ]);
            this.props.setAllItems(joined);
            this.setState({tableData: joined});
            //  console.log("tableData",this.state.tableData)
          }

          let event = {
            Mileage: data.mileage,
            Trailar: data.trailerid,
            generalRemark: data.general,
            currentDate: data.datetime,
            trcukid: data.trcukid,
            selectedUniqueItems: JSON.parse(data.selectitem),
          };

          // this.props.setMorningData(event);
        }
      } else {
        console.log(responseData.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  getCurrentDate() {
    const date = new Date();
    const d = date.getDate();
    const m = date.getMonth() + 1;
    const y = date.getFullYear();
    const currentDate = y + '-' + m + '-' + d;
    console.log({currentDate});
    this.setState({currentDate});
  }

  componentDidMount() {
    this.getCurrentDate();
    if (this.props.createMorning.data.response !== 1) {
      this.allitem();
    } else {
      this.setState({pointerEvents: true});
      this.getMorningAccepted_by_id();
    }
    this.dataConnection();

    console.log('this.props.getMorning=>', this.props.getMorning);
  }

  render() {
    const state = this.state;

    return (
      <View style={styles.container}>
        <CustomStatusBar />
        <ImageBackground source={images.bg} style={styles.container}>
          <Header>
            <Left>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Image
                  source={images.arrow}
                  style={styles.arrow}
                  size={25}
                  tintColor={colors.textDark}
                />
              </TouchableOpacity>
            </Left>
            <Right>
              <View style={styles.rightbox}>
                <Text style={styles.text}>
                  {this.props.SelectedTruckDetail.data}
                </Text>
              </View>
            </Right>
          </Header>
          <ScrollView keyboardShouldPersistTaps="handled">
            <View
              style={styles.content}
              pointerEvents={
                this.state.pointerEvents == true ? 'none' : 'auto'
              }>
              <View>
                {/* <ScrollView>  */}
                <Table borderStyle={styles.borderStyle}>
                  <Row
                    data={state.tableHead}
                    style={styles.head}
                    textStyle={styles.text}
                  />
                  {this.props.allItem.loading == false ? (
                    this.props.allItem.data.map((rowData, index) => (
                      <TableWrapper key={index} style={styles.row}>
                        {rowData.map((cellData, cellIndex) => (
                          <Cell
                            key={cellIndex}
                            data={this.element(cellIndex, cellData, index)}
                            textStyle={styles.text}
                          />
                        ))}
                      </TableWrapper>
                    ))
                  ) : (
                    <Loader />
                  )}
                </Table>
                {/* </ScrollView> */}
              </View>

              <View style={styles.mt20}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{width: '25%'}}>
                    <Text style={styles.formLabal}>General Remarks</Text>
                  </View>

                  <View style={{width: '75%'}}>
                    <TextInput
                      placeholder="Enter General Remark"
                      style={styles.textinput}
                      value={this.state.generalRemark}
                      onChangeText={value =>
                        this.setState({generalRemark: value})
                      }
                    />
                  </View>
                </View>
              </View>

              <View style={styles.mt20}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{width: '25%'}}>
                    <Text style={styles.formLabal}>Trailar Id</Text>
                  </View>

                  <View style={{width: '35%'}}>
                    <TextInput
                      placeholder="Enter Trailar Id"
                      style={styles.textinput}
                      value={this.state.Trailar}
                      onChangeText={value => this.setState({Trailar: value})}
                    />
                    {this.state.errorTrailar == true ? (
                      <Error
                        name="error"
                        color="red"
                        size={20}
                        style={styles.iconsty}
                      />
                    ) : null}
                  </View>

                  <View
                    style={{
                      width: '40%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {this.state.nilStatus == false ? (
                      <TouchableOpacity
                        onPress={() => {
                          this.element();
                          this.NilStatus();
                        }}>
                        <Text style={[styles.formLabal, {marginLeft: 20}]}>
                          <Check
                            name="checkbox-passive"
                            color={colors.danger}
                            size={15}
                          />
                          {'    '}Nil Defects
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          this.element();
                          this.NilStatus();
                        }}>
                        <Text style={[styles.formLabal, {marginLeft: 20}]}>
                          <Check
                            name="checkbox-active"
                            color={colors.danger}
                            size={15}
                          />
                          {'    '}Nil Defects
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>

              <View style={styles.mt20}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{width: '25%'}}>
                    <Text style={styles.formLabal}>Mileage</Text>
                  </View>

                  <View style={{width: '35%'}}>
                    <TextInput
                      placeholder="0"
                      keyboardType="numeric"
                      style={styles.textinput}
                      value={this.state.Mileage}
                      onChangeText={value => this.setState({Mileage: value})}
                    />
                    {this.state.errorMileage == true ? (
                      <Error
                        name="error"
                        color="red"
                        size={20}
                        style={styles.iconsty}
                      />
                    ) : null}
                  </View>

                  <View style={{width: '40%'}}>
                    <TouchableOpacity
                      style={styles.accptbtn}
                      onPress={() => this.onPress()}>
                      <Text style={styles.accptbtntxt}>Accept & Finalise</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
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
              <Success name="check" color={colors.primarylight} size={56} />
              <Text style={styles.successtxt}>Success!</Text>

              <Text style={styles.mytxt}>{this.state.message}</Text>

              <TouchableOpacity
                style={styles.okbtn}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible_alert);
                  this.props.navigation.goBack();
                }}>
                <Text style={[styles.formLabal, {color: '#fff'}]}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <MyModal
          visible={this.state.netVisible_alert}
          title="Retry"
          onPress={() => this.dataConnection()}
          onBackdropPress={() => this.netVisible(!this.state.netVisible_alert)}
          onRequestClose={() => this.netVisible(!this.state.netVisible_alert)}
        />

        {this.state.acceptbtn == true && <Loader />}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  allItem: state.allItems,
  truckDetail: state.truckDetail,
  login: state.login,
  SelectedTruckDetail: state.SelectedTruckDetail,
  getMorning: state.getMorning,
  createMorning: state.createMorning,
});

const mapDispatchToProps = dispatch => ({
  setAllItems: data => dispatch(setAllItems(data)),
  AllItemsError: error => dispatch(AllItemsError(error)),
  getAllItems: () => dispatch(getAllItems()),

  setCreateMorning: data => dispatch(setCreateMorning(data)),
  createMorningError: error => dispatch(createMorningError(error)),
  getCreateMorning: () => dispatch(getCreateMorning()),
  setMorningData: data => dispatch(setMorningData(data)),

  MorningDataclear: () => dispatch(MorningDataclear()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Morning);
