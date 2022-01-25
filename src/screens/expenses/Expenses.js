import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Container, Left, Right} from 'native-base';

import CustomStatusBar from '../../components/StatusBar';
import Header from '../../components/Header';

import {URL, UPLOADS} from '../../../config.json';

import {colors, images} from '../../global/globalStyle';

import styles from './Styles';
import {connect} from 'react-redux';

class Expenses extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      total: 0,
      loading: true,
    };
  }

  componentDidMount = () => {
    this.getMyExpenses();
  };

  getMyExpenses = async () => {
    const {driverDetails} = this.props;

    const apiUrl = `${URL}getAllMyExpence`;

    var apiData = new FormData();

    apiData.append('driver_id', driverDetails?.data.id);

    const requestOptions = {
      method: 'POST',
      body: apiData,
    };

    try {
      let apiCall = await fetch(apiUrl, requestOptions);
      let responseData = await apiCall.json();

      console.log(JSON.stringify({responseData, apiUrl}, null, 4));

      if (responseData.response == 1) {
        const {filtered, total} = this.filterInvalidExpenseData(
          responseData.data,
        );

        console.log(JSON.stringify({filtered, total}, null, 4));
        this.setState({
          loading: false,
          data: filtered,
          total,
        });
      } else {
        console.log(responseData.message);
      }
    } catch (error) {
      console.log(error);
      this.setState({loading: false});
    }
  };

  filterInvalidExpenseData = rawData => {
    let total = 0;

    const filtered = rawData.filter(ele => {
      if (ele.expence_type_id && ele.expence_type) {
        if (ele.amount) {
          total += parseInt(ele.amount);
        }
        return true;
      }
    });

    return {
      filtered,
      total,
    };
  };

  renderItem = ({item}) => {
    return (
      <View>
        <View style={[styles.row, {marginTop: 15}]}>
          <View style={styles.width33}>
            <Text style={styles.subtitle}>{item.expence_type}</Text>
          </View>
          <View style={[styles.width33, {alignItems: 'center'}]}>
            <Text style={styles.subtitle}>{item.amount}</Text>
          </View>
          <View style={[styles.width33, {alignItems: 'flex-end'}]}>
            <Text style={styles.subtitle}>{item.datatime}</Text>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('ViewImage', {
                  src: `${UPLOADS}${item.image}`,
                })
              }>
              <Text style={styles.view}>View Image</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  FlatListHeader = ({}) => {
    return (
      <View>
        <View style={styles.row}>
          <View style={styles.width33}>
            <Text style={styles.title}>Type</Text>
          </View>
          <View style={[styles.width33, {alignItems: 'center'}]}>
            <Text style={styles.title}>Expenses</Text>
          </View>
          <View style={[styles.width33, {alignItems: 'flex-end'}]}>
            <Text style={styles.title}>Date</Text>
          </View>
        </View>
        <View style={styles.border} />
      </View>
    );
  };

  render() {
    const {loading, total} = this.state;

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
            <ActivityIndicator size={'large'} color={colors.primary} />
          ) : (
            <FlatList
              data={this.state.data}
              renderItem={this.renderItem}
              keyExtractor={item => item._id}
              ListEmptyComponent={this.EmptyListMessage}
              ListHeaderComponent={this.FlatListHeader}
            />
          )}

          <View style={styles.border} />

          <View style={styles.row}>
            <View style={styles.btnsty}>
              <Text style={styles.btntxt}>Total Expenses</Text>
            </View>
            <Text style={styles.total}>{total}</Text>
          </View>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  driverDetails: state.login,
});

export default connect(mapStateToProps)(Expenses);
