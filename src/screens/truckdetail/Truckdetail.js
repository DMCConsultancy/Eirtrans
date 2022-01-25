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
  Platform,
  Linking,
} from 'react-native';
import {Container, Left, Right, Textarea} from 'native-base';
import styles from './Styles';
import {colors, images} from '../../global/globalStyle';
import Dot from 'react-native-vector-icons/Entypo';
import Success from 'react-native-vector-icons/SimpleLineIcons';

import {URL} from '../../../config.json';
import Loader from '../../components/button/Loader';
import CustomStatusBar from '../../components/StatusBar';
import Header from '../../components/Header';
import {PrettyPrintJSON} from '../../utils/helperFunctions';

export default class Truckdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible_alert: false,
      from: '', // Todo: add user's current location
      to: '',
      btnclr: false,
      messege: '',
      loading: true,
      info: null,
      data: [],
    };
  }

  setModalVisible = visible => {
    this.setState({modalVisible_alert: visible});
  };

  async getCustomerDetails() {
    let url = URL + 'getCustomerDetails';

    const params = {
      id: this.state.info?.id,
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
      } else {
        console.log(responseData.message);
        this.setState({loading: false});
      }
    } catch (error) {
      this.setState({loading: false});
      console.log(error);
    }
  }

  componentDidMount() {
    this.getCustomerDetails();
  }

  UNSAFE_componentWillMount() {
    const info = this.props.navigation.getParam('info', info);
    this.setState({info});
  }

  handleCollectYes = () => {
    const loadItem = this.props.navigation.getParam('loadItem', null);

    if (!loadItem) {
      console.error('loadItem is null in TruckDetails');
      return;
    }

    const crashReportParams = {
      customer_id: loadItem.id,
      car_collection_id: loadItem.job_id,
      job_id: loadItem.job_id,
    };

    this.setModalVisible(!this.state.modalVisible_alert);
    this.props.navigation.navigate('Cars', {crashReportParams});
  };

  render() {
    const state = this.state;

    const {info} = this.state;

    PrettyPrintJSON(info);

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

            <Right>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Home')}
                style={styles.rightbox}>
                <Text style={styles.text}>Home</Text>
              </TouchableOpacity>
            </Right>
          </Header>

          <ScrollView>
            <View style={styles.content}>
              <View>
                <View style={styles.row}>
                  <View style={styles.width40}>
                    <Text style={styles.formLabel}>
                      From <Dot name="dots-two-vertical" />{' '}
                    </Text>
                  </View>
                  <View style={styles.width60}>
                    <TextInput
                      style={styles.input}
                      onChangeText={from => this.setState({from})}
                      value={this.state.from}
                    />
                  </View>
                </View>

                <View style={[styles.row, {marginTop: 10}]}>
                  <View style={styles.width40}>
                    <Text style={styles.formLabel}>
                      To <Dot name="dots-two-vertical" />{' '}
                    </Text>
                  </View>
                  <View style={styles.width60}>
                    <TextInput
                      style={styles.input}
                      editable={false}
                      selectTextOnFocus={false}
                      // onChangeText={(form)=>this.setState({form})}
                      value={this.state.info?.collection_address}
                    />
                  </View>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => {
                  const scheme = Platform.select({
                    ios: 'maps:0,0?q=',
                    android: 'geo:0,0?q=',
                  });
                  // const latLng = `${26.85535016139612},${80.94663768345126}`;
                  const label = state.info?.delivery_address;

                  const url = Platform.select({
                    ios: `${scheme}${label}`,
                    android: `${scheme}${label}`,
                  });

                  Linking.openURL(url);
                }}>
                {/* Todo: dynamic map */}
                <Image source={images.map} style={styles.mapsty} />
                <Text style={styles.maptxtsty}>tap here for go on map </Text>
              </TouchableOpacity>

              <View>
                <View style={styles.cardsty}>
                  <View style={styles.topribben}>
                    <Text style={styles.text}>{this.state.info?.reg}</Text>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.card40}>
                      <Text style={styles.text}>
                        Post code
                        <Dot name="dots-two-vertical" />{' '}
                      </Text>
                    </View>
                    <View style={styles.card60}>
                      <Text style={styles.label}>
                        {state.data[0]?.post_code}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.row}>
                    <View style={styles.card40}>
                      <Text style={styles.text}>
                        Collection Address
                        <Dot name="dots-two-vertical" />{' '}
                      </Text>
                    </View>
                    <View style={styles.card60}>
                      <Text style={styles.label}>
                        {state.data[0]?.collectionaddress}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.row}>
                    <View style={styles.card40}>
                      <Text style={styles.text}>
                        Delivery Address
                        <Dot name="dots-two-vertical" />{' '}
                      </Text>
                    </View>
                    <View style={styles.card60}>
                      <Text style={styles.label}>
                        {state.info?.delivery_address}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.row}>
                    <View style={styles.card40}>
                      <Text style={styles.text}>
                        Contact
                        <Dot name="dots-two-vertical" />{' '}
                      </Text>
                    </View>
                    <View style={styles.card60}>
                      <Text style={styles.label}>{state.data[0]?.mobile}</Text>
                    </View>
                  </View>

                  <View>
                    <Textarea
                      style={styles.textarea}
                      disabled={true}
                      value={state.data[0]?.additional_comment}
                      onChangeText={messege => this.setState({messege})}
                    />
                  </View>
                </View>
                <View style={styles.bottomRibben} />
              </View>

              <View style={styles.cardjob}>
                <Text style={styles.heading}>Job Status</Text>

                <View style={styles.row}>
                  <View style={{width: '50%'}}>
                    <TouchableOpacity
                      style={
                        this.state.btnclr == true
                          ? [styles.btnsty, {backgroundColor: colors.success}]
                          : styles.btnsty
                      }
                      onPress={() => {
                        this.setState({btnclr: true});
                        this.setModalVisible(!this.state.modalVisible_alert);
                      }}>
                      <Text style={styles.text}>Collected</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{width: '50%'}}>
                    <TouchableOpacity
                      style={styles.btnsty}
                      onPress={() => {
                        // Todo: handle `Not collected`
                        alert('hii');
                      }}>
                      <Text style={styles.text}>Not Collected</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            {this.state.loading == true && <Loader />}
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
              <Success
                name="exclamation"
                color={colors.warninglight}
                size={56}
              />
              <Text style={styles.successtxt}>Are you sure?</Text>

              <Text style={styles.mytxt}>You want to collect!</Text>

              <View style={styles.row}>
                <View style={{width: '50%'}}>
                  <TouchableOpacity
                    style={styles.cancelbtn}
                    onPress={() =>
                      this.setModalVisible(!this.state.modalVisible_alert)
                    }>
                    <Text style={styles.btntxt}>Cancel</Text>
                  </TouchableOpacity>
                </View>
                <View style={{width: '50%'}}>
                  <TouchableOpacity
                    style={styles.yesbtn}
                    onPress={() => {
                      this.handleCollectYes();
                    }}>
                    <Text style={styles.btntxt}>Yes</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </Container>
    );
  }
}
