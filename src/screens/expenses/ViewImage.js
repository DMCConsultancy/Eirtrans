import React, {Component} from 'react';
import {Header, Left, Right, Container} from 'native-base';
import {
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
} from 'react-native';
import styles from './Styles';
import Icon from 'react-native-vector-icons/Feather';
import {colors, images} from '../../global/globalStyle';

export default class ViewImage extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Header style={styles.headersty}>
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
        <View style={[styles.content, styles.container]}>
          <ImageBackground
            source={{
              uri: 'https://i.pinimg.com/originals/da/6c/c6/da6cc6213d6926d317cf523e43937056.jpg',
            }}
            style={styles.container}
          />
        </View>
      </Container>
    );
  }
}
