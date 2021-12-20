import React, {Component} from 'react';
import {Container, Left, Right, Textarea} from 'native-base';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';

import CustomStatusBar from '../../components/StatusBar';
import Header from '../../components/Header';

import {colors, images} from '../../global/globalStyle';

import styles from './Styles';
export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }
  render() {
    return (
      <Container style={styles.conatainer}>
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
          <Right></Right>
        </Header>
        <ScrollView>
          <View style={styles.content}>
            <View>
              <Text style={styles.text}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text{'\n'}
                {'\n'}
                ever since the 1500s,{'\n'}
                when an unknown printer{'\n'}
                took{'\n'}a galley of type{'\n'}
                {'\n'}
                and scrambled it to make a type specimen book.{'\n'}
                {'\n'}
                It has survived not only five centuries, but also{'\n'}
                {'\n'}
                the leap into electronic typesetting, remaining essentially
                unchanged. It was popularised in{'\n'}
                {'\n'}
                the 1960s with the release of Letraset sheets{'\n'}
                {'\n'}
                containing Lorem Ipsum passages, and more{'\n'}
                {'\n'}
              </Text>
            </View>

            <Image source={images.map} style={styles.imgsty} />

            <View style={styles.crdsty}>
              <Text style={styles.heading}>Contact Eirtrans</Text>

              <View>
                <View style={styles.mt20}>
                  <Text style={styles.title}>Name</Text>
                  <TextInput
                    style={styles.inputs}
                    placeholder="Enter Name"
                    value={this.state.name}
                    onChangeText={name => this.setState({name})}
                  />
                </View>

                <View style={styles.mt20}>
                  <Text style={styles.title}>Email</Text>
                  <TextInput
                    style={styles.inputs}
                    placeholder="Enter Email"
                    value={this.state.email}
                    onChangeText={email => this.setState({email})}
                  />
                </View>

                <View style={styles.mt20}>
                  <Text style={styles.title}>Phone</Text>
                  <TextInput
                    style={styles.inputs}
                    placeholder="Enter Phone"
                    value={this.state.phone}
                    onChangeText={phone => this.setState({phone})}
                  />
                </View>

                <View style={styles.mt20}>
                  <Text style={styles.title}>Message</Text>
                  <Textarea
                    style={[styles.inputs, {height: 100}]}
                    placeholder="hi how are you"
                    placeholderTextColor="#ccc"
                    value={this.state.message}
                    onChangeText={message => this.setState({message})}
                  />
                </View>

                <View style={styles.mt20}>
                  <TouchableOpacity style={styles.btnsty}>
                    <Text style={styles.text}>Send Message</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </Container>
    );
  }
}
