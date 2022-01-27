import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  ImageBackground,
} from 'react-native';
import {Body, Container, Left, Right} from 'native-base';
import styles from './Styles';
import {images, colors} from '../../global/globalStyle';
import Success from 'react-native-vector-icons/SimpleLineIcons';
import Icon from 'react-native-vector-icons/Feather';

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
import CustomStatusBar from '../../components/StatusBar';
import Header from '../../components/Header';
import {getCurrentDate, PrettyPrintJSON} from '../../utils/helperFunctions';
import {ActionButton} from '../../components/button/ActionButton';
import {connect} from 'react-redux';
import { style } from 'styled-system';

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
      loading: true,
    };
  }

  setModalVisible = visible => {
    this.setState({modalVisible_alert: visible});
  };

  async getSelectedByJobCustomer() {
    let url = URL + 'getJobsByLoadContainer';
    const loadItem = this.props.navigation.getParam('loadItem', null);

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

        this.setState({data, loading: false});

        PrettyPrintJSON({loads: data});

        data.car_collection_data[0].map(ele => {
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

      PrettyPrintJSON({checkStatus: responseData});

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

  componentDidMount() {
    this.getSelectedByJobCustomer();
    // this.getDriverAssignToLoadertocompletejob();
  }

  getCustomerID(index) {
    console.log({index});
    const data = this.state.data?.car_collection_data[index];
    const loadItem = this.props.navigation.getParam('loadItem', null);

    // PrettyPrintJSON({data});
    this.props.navigation.navigate('Truckdetail', {info: data[0], loadItem});
  }

  render() {
    const state = this.state;
    return (
      <Container style={styles.container}>
        <CustomStatusBar />
        <ImageBackground source={images.bg} style={styles.container}>
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

          <View style={styles.content}>
            <Table borderStyle={styles.borderStyle}>
              <Row
                data={state.tableHead}
                style={styles.head}
                textStyle={styles.text}
              />
              {state.tableData.map((rowData, index) => (
                <TableWrapper key={index} style={styles.row}>
                  {rowData.map((cellData, cellIndex) => {
                    if (typeof cellData === 'object') {
                      if (cellData.bookingStatus.toString() === '7') {
                        return (
                          <Icon style={styles.checkMark} name="check" size={65} color={colors.success} />
                        );
                      } else {
                        return null;
                      }
                    }

                    return (
                      <Cell
                        key={cellIndex}
                        onPress={() => this.getCustomerID(index)}
                        data={cellData}
                        textStyle={styles.textCell}
                      />
                    );
                  })}
                </TableWrapper>
              ))}
            </Table>

            {/* <FlatList style={styles.borderStyle}
                         data={this.state.data?.car_collection_data}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.id}
                        ListHeaderComponent={this.FlatListHeader}
                        ListEmptyComponent={this.EmptyListMessage}
                    /> */}

            <ActionButton
              onPress={() =>
                this.setModalVisible(!this.state.modalVisible_alert)
              }
              title={'Load Collected'}
            />
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
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Loads);
