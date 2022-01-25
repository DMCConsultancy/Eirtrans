import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
  Modal,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {Container, Item, Left, Right} from 'native-base';
import styles from './Styles';
import {colors, images} from '../../global/globalStyle';
import Icon from 'react-native-vector-icons/Feather';
import Success from 'react-native-vector-icons/SimpleLineIcons';
import MyButton from '../../components/button/Mybutton';
import {URL} from '../../../config.json';
import Loader from '../../components/button/Loader';
import CustomStatusBar from '../../components/StatusBar';
import Header from '../../components/Header';

import {PrettyPrintJSON} from '../../utils/helperFunctions';

class Job extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible_alert: false,
      data: [],
      currentDate: '',
      loading: true,
    };
  }

  renderItem = ({item, index}) => {
    // PrettyPrintJSON({item});

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
        const data = responseData.data.map(loadObj => loadObj.loads[0]);
        PrettyPrintJSON({jobs: data});

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

  componentDidMount() {
    this.getDriverAssignToLoader();
  }

  UNSAFE_componentWillMount() {
    this.getCurrentDate();
  }

  render() {
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

          <View style={styles.content}>
            <View style={styles.center}>
              <Image style={styles.logo} source={images.logo} />
            </View>

            <View style={{marginTop: '20%'}}>
              <FlatList data={this.state.data} renderItem={this.renderItem} />
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
          <View style={styles.center}>
            <View style={styles.modalView}>
              <Success name="check" color="green" size={56} />
              <Text style={styles.successtxt}>Success!</Text>

              <Text style={styles.mytxt}>New morning Successfully.</Text>

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
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  driverDetails: state.login.data,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Job);
