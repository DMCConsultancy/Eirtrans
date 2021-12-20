import React, {Component} from 'react';
import {Container, Left, Right, Card} from 'native-base';
import {Text, View, TouchableOpacity, Image, FlatList} from 'react-native';
import styles from './Styles';
import Icon from 'react-native-vector-icons/Feather';

import CustomStatusBar from '../../components/StatusBar';
import Header from '../../components/Header';

import {colors, images} from '../../global/globalStyle';
export default class About extends Component {
  constructor() {
    super();
    this.state = {
      data: data,
    };
  }

  renderItem = ({item}) => {
    return (
      <Card style={styles.crdsty}>
        <Image source={images.owners} style={styles.imgsty} />
        <View style={styles.txtcontainer}>
          <Text style={styles.txtsty}>{item.text}</Text>
        </View>
      </Card>
    );
  };

  render() {
    return (
      <Container style={styles.container}>
        <CustomStatusBar />
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
          <Right />
        </Header>

        <FlatList
          style={[styles.content]}
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={item => item._id}
          ListEmptyComponent={this.EmptyListMessage}
          ListHeaderComponent={this.FlatListHeader}
        />
      </Container>
    );
  }
}

const data = [
  {
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum has been the industry standard dummy text ever since the 1500s when an unknown printer took a galley of type.',
  },
  {
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum has been the industry standard dummy text ever since the 1500s when an unknown printer took a galley of type.',
  },
  {
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum has been the industry standard dummy text ever since the 1500s when an unknown printer took a galley of type.',
  },
  {
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum has been the industry standard dummy text ever since the 1500s when an unknown printer took a galley of type.',
  },
];
