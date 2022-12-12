import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Container, Header, Left, Right, Card, CardItem} from 'native-base';
import styles from './Styles';
import {colors, images} from '../../global/globalStyle';
import {URL} from '../../../config.json';
import {PrettyPrintJSON} from '../../utils/helperFunctions';

import Text from '../../components/Text';

export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
      loading: true,
    };
  }

  componentDidMount = () => {
    this.setReadNotifications();
  };

  async setReadNotifications() {
    let url = URL + 'readNotification';

    const notif = this.props.navigation.getParam('notif', null);

    const apiData = new FormData();

    apiData.append('notification_id', notif.id);

    PrettyPrintJSON(apiData);

    const requestOptions = {
      method: 'POST',
      body: apiData,
    };

    try {
      let apiCall = await fetch(url, requestOptions);
      let responseData = await apiCall.json();

      PrettyPrintJSON({responseData: responseData.data});

      if (responseData.response == 1) {
        // const data = responseData.data;

        this.setState({loading: false});
      } else {
        console.log(responseData.message);
        this.setState({loading: false});
      }
    } catch (error) {
      console.log(error);
      this.setState({loading: false});
    }
  }

  render() {
    const notif = this.props.navigation.getParam('notif', null);
    const {loading} = this.state;

    return (
      <Container style={styles.container}>
        <Header style={styles.headersty}>
          <Left>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Notification')}>
              <Image
                source={images.arrow}
                style={styles.arrow}
                tintColor={colors.textDark}
              />
            </TouchableOpacity>
          </Left>
          <Right />
        </Header>

        {loading ? (
          <ActivityIndicator color={colors.primary} size={'large'} />
        ) : (
          <View style={styles.content}>
            <Card style={styles.crdsty}>
              <CardItem style={styles.crdsty}>
                <Left>
                  <Text style={styles.title}>{notif.type}</Text>
                </Left>
                <Right>
                  <Text style={styles.date}>{notif.datetime}</Text>
                </Right>
              </CardItem>
            </Card>
          </View>
        )}
      </Container>
    );
  }
}

const data = [
  {text: '', date: '2021-07-22 08:04:41'},
  {text: 'New Load assign successfully.', date: ''},
];
