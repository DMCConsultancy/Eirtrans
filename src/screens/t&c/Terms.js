import React, {Component} from 'react';
import {View, TouchableOpacity, Image, ScrollView} from 'react-native';
import {Container, Left, Right} from 'native-base';
import Astro from 'react-native-vector-icons/FontAwesome5';

import CustomStatusBar from '../../components/StatusBar';
import Header from '../../components/Header';
import Text from '../../components/Text';

import {colors, images} from '../../global/globalStyle';

import styles from './Styles';
export default class Terms extends Component {
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
        <ScrollView>
          <View style={styles.content}>
            <View style={{alignItems: 'center'}}>
              <Image source={images.logo} style={styles.logo} />
            </View>

            <View>
              <View style={styles.row}>
                <View style={styles.wd5}>
                  <Astro name="asterisk" />
                </View>
                <View style={styles.wd9}>
                  <Text style={styles.txtsty}>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.{'\n'}
                  </Text>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.wd5}>
                  <Astro name="asterisk" />
                </View>
                <View style={styles.wd9}>
                  <Text style={styles.txtsty}>
                    Lorem Ipsum is simply dummy text.{'\n'}
                  </Text>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.wd5}>
                  <Astro name="asterisk" />
                </View>
                <View style={styles.wd9}>
                  <Text style={styles.txtsty}>
                    Lorem Ipsum is simply dummy text of the printing.{'\n'}
                  </Text>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.wd5}>
                  <Astro name="asterisk" />
                </View>
                <View style={styles.wd9}>
                  <Text style={styles.txtsty}>
                    Lorem Ipsum is simply dummy text.{'\n'}
                  </Text>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.wd5}>
                  <Astro name="asterisk" />
                </View>
                <View style={styles.wd9}>
                  <Text style={styles.txtsty}>
                    Lorem Ipsum is simply dummy text of the printing.{'\n'}
                  </Text>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.wd5}>
                  <Astro name="asterisk" />
                </View>
                <View style={styles.wd9}>
                  <Text style={styles.txtsty}>
                    Lorem Ipsum is simply dummy text.{'\n'}
                  </Text>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.wd5}>
                  <Astro name="asterisk" />
                </View>
                <View style={styles.wd9}>
                  <Text style={styles.txtsty}>
                    Lorem Ipsum is simply dummy text of the printing.{'\n'}
                  </Text>
                </View>
              </View>

              <View>
                <Text style={[styles.txtsty, {textAlign: 'center'}]}>
                  We are members of the irish Road Haulage Association{'\n'}-
                  Please see their conditions of carriage{'\n'}
                </Text>

                <TouchableOpacity>
                  <Text style={styles.click}>Click here</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </Container>
    );
  }
}
