import React, {Component} from 'react';
import {Text, TouchableOpacity, View, FlatList, Image} from 'react-native';
import {Container, Left, Right} from 'native-base';

import CustomStatusBar from '../../components/StatusBar';
import Header from '../../components/Header';

import {colors, images} from '../../global/globalStyle';

import styles from './Styles';

export default class Expenses extends Component {
  constructor() {
    super();
    this.state = {
      data: data,
    };
  }

  renderItem = ({item}) => {
    return (
      <View>
        <View style={[styles.row, {marginTop: 15}]}>
          <View style={styles.width33}>
            <Text style={styles.subtitle}>{item.type}</Text>
          </View>
          <View style={[styles.width33, {alignItems: 'center'}]}>
            <Text style={styles.subtitle}>{item.expenses}</Text>
          </View>
          <View style={[styles.width33, {alignItems: 'flex-end'}]}>
            <Text style={styles.subtitle}>{item.date}</Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('ViewImage')}>
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
          <FlatList
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={item => item._id}
            ListEmptyComponent={this.EmptyListMessage}
            ListHeaderComponent={this.FlatListHeader}
          />
          <View style={styles.border} />

          <View style={styles.row}>
            <View style={styles.btnsty}>
              <Text style={styles.btntxt}>Total Expenses</Text>
            </View>
            <Text style={styles.total}>{'    '}132</Text>
          </View>
        </View>
      </Container>
    );
  }
}

const data = [
  {type: 'MISC', expenses: '66', date: '2021-10-26'},
  {type: 'TOLL', expenses: '66', date: '2021-10-21'},
];
