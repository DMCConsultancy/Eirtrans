import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Image,
} from 'react-native';
import {Container, Left, Right} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dot from 'react-native-vector-icons/Entypo';
import RNPickerSelect from 'react-native-picker-select';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';

import CustomStatusBar from '../../components/StatusBar';
import Header from '../../components/Header';

import {colors, images, size, fontfamily} from '../../global/globalStyle';

import styles from './Styles';
export default class Truckdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      showChecked: '',
      showYes: false,
      selectedItem: '',
      tableHead: ['Description', 'Present'],
      tableData: [
        ['V5', ''],
        ['Service book', ''],
        ['handbook', ''],
        ['sealed envelope', ''],
        ['sd card', ''],
        ['spare wheel', ''],
        ['parcel shelf', ''],
        ['spare wheel tool kit', ''],
        ['charging cable', ''],
      ],
    };
  }

  _alertIndex(index, cellIndex) {
    //  alert(`This is row ${index + 1}`);
    this.setState({showChecked: true, showYes: !this.state.showYes});
  }

  element(cellIndex, data, index) {
    if (cellIndex == 1) {
      return (
        <TouchableOpacity
          style={[styles.center]}
          onPress={() => {
            this._alertIndex(index, cellIndex);
            this.setState({selectedItem: index});
            console.log({cellIndex, index});
            const {tableData} = this.state;
            const newCompanies = [...tableData];
            this.state.showYes == true
              ? (newCompanies[index][cellIndex] = 'N')
              : (newCompanies[index][cellIndex] = 'Y');
            console.log({newCompanies});
            this.setState({tableData: newCompanies});
          }}>
          {this.state.showChecked != '' ? (
            this.state.showYes == true ? (
              <View style={styles.yesbtn}>
                <Text style={styles.btnText}>Y</Text>
              </View>
            ) : (
              <View style={styles.nobtn}>
                <Text style={styles.btnText}>N</Text>
              </View>
            )
          ) : null}
        </TouchableOpacity>
      );
    } else {
      return (
        <View style={{padding: 5}}>
          <Text style={styles.text} numberOfLines={1} adjustsFontSizeToFit>
            {data}
          </Text>
        </View>
      );
    }
  }

  render() {
    const state = this.state;
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
                <Text style={styles.mytext}>HOME</Text>
              </TouchableOpacity>
            </Right>
          </Header>

          <ScrollView>
            <View style={styles.content}>
              <View style={[styles.row, {marginTop: -10}]}>
                <Text style={styles.text}>
                  Number of keys <Dot name="dots-two-vertical" />
                </Text>
                <RNPickerSelect
                  placeholder={{
                    label: '',
                    value: null,
                  }}
                  items={items}
                  onValueChange={value => {
                    this.setState({value});
                    console.log(value);
                  }}
                  useNativeAndroidPickerStyle={false}
                  style={pickerStyle}
                  Icon={() => {
                    return <Icon name="chevron-down" size={13} color="#000" />;
                  }}
                />
              </View>

              <View style={{marginTop: 10}}>
                <Table borderStyle={styles.borderStyle}>
                  <Row
                    data={state.tableHead}
                    style={styles.head}
                    textStyle={[styles.text, {textTransform: 'capitalize'}]}
                  />
                  {state.tableData.map((rowData, index) => (
                    <TableWrapper
                      key={index}
                      style={[styles.row, {backgroundColor: '#fff'}]}>
                      {rowData.map((cellData, cellIndex) => (
                        <Cell
                          key={cellIndex}
                          data={this.element(cellIndex, cellData, index)}
                          textStyle={styles.textCell}
                        />
                      ))}
                    </TableWrapper>
                  ))}
                </Table>
              </View>

              <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('Customerdetail')
                  }
                  style={styles.btnsty}>
                  <Text style={styles.mytext}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </Container>
    );
  }
}

const items = [
  {label: '0', value: 'football'},
  {label: '1', value: 'baseball'},
  {label: '2', value: 'hockey'},
];

const pickerStyle = {
  inputIOS: {
    color: '#000',
    fontSize: size.subtitle,
    fontFamily: fontfamily.medium,
  },
  inputAndroid: {
    color: '#000',
    fontSize: size.subtitle,
    fontFamily: fontfamily.medium,
    paddingHorizontal: 10,
    marginTop: -5,
  },
  iconContainer: {
    top: 13,
    right: 0,
  },
  placeholder: {
    color: '#000',
  },
};
