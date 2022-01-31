import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Container, Left, Right, Card, CardItem} from 'native-base';

import CustomStatusBar from '../../components/StatusBar';
import Header from '../../components/Header';

import {URL} from '../../../config.json'

import {colors, images} from '../../global/globalStyle';

import styles from './Styles';
import {connect} from 'react-redux';
import { PrettyPrintJSON } from '../../utils/helperFunctions';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
      loading: true,
    };
  }

  componentDidMount = () => {
    this.getNotifications();
  };

  async getNotifications() {
    let url = URL + 'getNotification';

    const apiData = new FormData();

    apiData.append('driver_id', this.props.driverDetails.id);

    PrettyPrintJSON(apiData)

    const requestOptions = {
      method: 'POST',
      body: apiData,
    };

    try {
      let apiCall = await fetch(url, requestOptions);
      let responseData = await apiCall.json();
      if (responseData.response == 1) {
        const data = responseData.data;
        PrettyPrintJSON({notif: data});

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

  renderItem = ({item}) => {
    return (
      <Card>
        <CardItem>
          <Left>
            <Text style={styles.title}>{item.type}</Text>
          </Left>
          <Right>
            <Text style={styles.date}>{item.datetime}</Text>
          </Right>
        </CardItem>
        <CardItem>
          <Left></Left>
          <Right>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('NotificationDetail', {
                  notif: item,
                })
              }>
              <Text style={styles.moretxt}>View More</Text>
            </TouchableOpacity>
          </Right>
        </CardItem>
      </Card>
    );
  };

  render() {
    const {loading} = this.state;

    return (
      <Container style={styles.container}>
        <CustomStatusBar />
        <Header>
          <Left>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Home')}>
              <Image
                source={images.arrow}
                style={styles.arrow}
                tintColor={colors.textDark}
              />
            </TouchableOpacity>
          </Left>
          <Right />
        </Header>

        <View style={styles.content}>
          {loading ? (
            <ActivityIndicator color={colors.primary} size={'large'} />
          ) : (
            <FlatList
              data={this.state.data}
              renderItem={this.renderItem}
              keyExtractor={item => item._id}
              ListEmptyComponent={this.EmptyListMessage}
              ListHeaderComponent={this.FlatListHeader}
            />
          )}
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  driverDetails: state.login.data,
});

export default connect(mapStateToProps)(Notification);

const data = [
  {text: 'New Load assign successfully.', date: '2021-07-22 08:04:41'},
  {text: 'New Load assign successfully.', date: '2021-07-22 08:04:41'},
];
