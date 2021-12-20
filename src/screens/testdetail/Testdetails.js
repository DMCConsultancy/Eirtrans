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

export default class Test extends Component {
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
    let url = URL + 'getSelectedByJobCustomer';

    const params = {
      id: this.state.id,
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

        for (let i = 0; i < data.car_collection_data.length; i++) {
          var joined = this.state.tableData.concat([
            [
              data.car_collection_data[i].customer,
              data.car_collection_data[i].make_model,
              data.car_collection_data[i].reg,
              data.car_collection_data[i].collection_address,
              data.car_collection_data[i].lan,
            ],
          ]);

          this.setState({tableData: joined});
          //    console.log("table data",joined)
        }
      } else {
        this.setState({loading: false});
        console.log(responseData.message);
      }
    } catch (error) {
      this.setState({loading: false});
      console.log(error);
    }
  }

  componentDidMount() {
    this.getSelectedByJobCustomer();
  }

  UNSAFE_componentWillMount() {
    const id = this.props.navigation.getParam('id', id);
    this.setState({id});
  }

  getCustomerID(index) {
    console.log({index});
    const data = this.state.data?.car_collection_data[index];
    console.log({data});
    this.props.navigation.navigate('Truckdetail', {info: data});
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
                  {rowData.map((cellData, cellIndex) => (
                    <Cell
                      key={cellIndex}
                      onPress={() => this.getCustomerID(index)}
                      data={cellData}
                      textStyle={styles.textCell}
                    />
                  ))}
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

            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() =>
                  this.setModalVisible(!this.state.modalVisible_alert)
                }
                style={styles.btnsty}>
                <Text style={styles.mybtnText}>Load Collected</Text>
              </TouchableOpacity>
            </View>
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
