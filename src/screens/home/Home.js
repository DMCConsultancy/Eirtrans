import React, { Component } from "react";
import { Text, View, Button, TouchableOpacity, Image, StatusBar, ImageBackground, Modal, TouchableWithoutFeedback, ScrollView } from "react-native";
import { Container } from "native-base";
import { DrawerActions } from 'react-navigation-drawer';
import styles from "./Styles";
import { images, size, fontfamily, colors } from "../../global/globalStyle";
import MyButton from "../../components/button/Mybutton";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { URL } from "../../../config.json";
import {getTruckDetail, setTruckDetail, TruckDetailError} from "../../redux/action/truckdetail";
import { connect } from "react-redux";
import Loader from "../../components/button/Loader";
import {getSelectedTruckDetail, setSelectedTruckDetail, SelectedTruckDetailError} from "../../redux/action/selectedTruckDetail";
import Icon  from "react-native-vector-icons/Feather";

class Home extends Component {

 constructor(props){
       super(props);
       this.state={
         modalVisible_alert:false,
         value3Index:"",
         value2:""
       }
 }

  toggleDrawer = () => {
    this.props.navigation.dispatch(DrawerActions.toggleDrawer())
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible_alert: visible });
    }

    async truckdetails() {
      let url = URL + 'alltruckdetails'
      const requestOptions = {
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
      };
      this.props.getTruckDetail()
      try {
          let apiCall = await fetch(url, requestOptions);
          let responseData = await apiCall.json();
          if (responseData.response == 1) {
              const data = responseData.data
              // console.log({ data })
              const driver = []
              for (let i = 0; i < data.length; i++) {
                  let obj = {
                    "id": data[i].id,
                    "label": data[i].truck_number,
                    "value": data[i].truck_number,
                    "truck_status": data[i].truck_status,
                    "date_time": data[i].date_time,
                    "truck_pickstatus": data[i].truck_pickstatus
                  }
                  driver.push(obj)
              }
              this.props.setTruckDetail(driver)
          } else {
              this.props.TruckDetailError(responseData.message)
          }
      }
      catch (error) {
          console.log(error)
          this.props.TruckDetailError(error)
      }
  } 

  componentDidMount(){
    this.truckdetails();
    // console.log('login', this.props.createMorning);
  }

  morningCheck() {
    if (this.props.createMorning.data.response !== 1) {
      this.setModalVisible(!this.state.modalVisible_alert);
    } else {
      this.props.navigation.navigate('Morning')
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <StatusBar hidden />
        <ImageBackground source={images.bg} style={styles.container}>
          <View style={styles.content}>
            <TouchableOpacity onPress={() => this.toggleDrawer()} >
              <Image source={images.menu}
                style={styles.menu} />
            </TouchableOpacity>

            <View style={styles.center}>
              <Image style={styles.logo}
                source={images.logo} />
            </View>
            <View style={styles.mt20}>
              
              {this.props.createMorning.data.response === 1 ? (
                <View style={styles.row}>
                  <View style={styles.wdh90}>
                    <MyButton title="Morning Checks"
                      onPress={() => this.morningCheck()}
                      backgroundColor="#fff" color="#000" textTransform="capitalize" />
                  </View>
                  <View style={styles.wdh10}>
                    <View style={styles.iconContainer}>
                    <Icon name="check" size={20} color={colors.success} />
                    </View>
                  </View>
                </View>
              ) : <MyButton title="Morning Checks"
                onPress={() => this.morningCheck()}
                backgroundColor="#fff" color="#000" textTransform="capitalize" />
              }

              <MyButton title="Jobs" 
                 disabled = {this.props.createMorning.data.response !== 1?true:false}
                onPress={() => {
                  if(this.props.createMorning.data.response === 1){
                  this.props.navigation.navigate('Job')
                }
                }}
                backgroundColor="#fff" textTransform="capitalize"
                color={this.props.createMorning.data.response !== 1?"#ccc":"#000"}  />

                <MyButton title="Expenses" 
                 disabled = {this.props.createMorning.data.response !== 1?true:false}
                onPress={() => {
                  if(this.props.createMorning.data.response === 1){
                  this.props.navigation.navigate('HomeExpenses')
                }
                }}
                backgroundColor="#fff" textTransform="capitalize"
                color={this.props.createMorning.data.response !== 1?"#ccc":"#000"}  />

            </View>

          </View>
        </ImageBackground>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible_alert}
          onBackdropPress={() =>  this.setModalVisible(!this.state.modalVisible_alert)}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible_alert);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {this.props.truckDetail.loading==false?(
            <ScrollView style={styles.container} keyboardShouldPersistTaps="handled" >
              <MyButton title="Select truck"
                backgroundColor={colors.warning} color="#000" textTransform="capitalize" />
                 <View style={styles.mt20}>
                  <RadioForm
                    formHorizontal={false}
                    animation={true}>
                    {
                      this.props.truckDetail.data.map((obj, i) => (
                        <RadioButton labelHorizontal={true} key={i} >
                          <RadioButtonInput
                            obj={obj}
                            index={i}
                            isSelected={this.state.value3Index === i}
                            onPress={(value,index)=>{
                              this.props.setSelectedTruckDetail(value);
                              this.setState({value2:value, value3Index:index});
                              this.props.navigation.navigate('Morning');
                              this.setModalVisible(!this.state.modalVisible_alert);
                            }}
                            borderWidth={2}
                            buttonInnerColor={colors.danger}
                            buttonOuterColor={colors.danger}
                            buttonSize={10}
                            buttonOuterSize={20}
                            buttonStyle={{}}
                            buttonWrapStyle={{ marginLeft: 10, marginTop:5 }}
                          />
                          <RadioButtonLabel
                            obj={obj}
                            index={i}
                            labelHorizontal={true}
                            onPress={(value,index)=>{
                              this.props.setSelectedTruckDetail(value);
                              this.setState({value2:value, value3Index:index});
                              this.props.navigation.navigate('Morning');
                              this.setModalVisible(!this.state.modalVisible_alert);
                            }}
                            labelStyle={styles.labelStyle}
                            labelWrapStyle={{marginTop:5}}
                          />
                        </RadioButton>
                      ))
                    }
                  </RadioForm>
             
               </View>
               </ScrollView>
             ): <Loader />}
            </View>
          </View>
        </Modal>
      </Container>

    )
  }
}

const mapStateToProps = state => ({
  truckDetail: state.truckDetail,
  createMorning : state.createMorning
})

const mapDispatchToProps = dispatch => ({
  setTruckDetail: (data) => dispatch(setTruckDetail(data)),
  TruckDetailError: (error) => dispatch(TruckDetailError(error)),
  getTruckDetail: () => dispatch(getTruckDetail()),

  setSelectedTruckDetail: (data) => dispatch(setSelectedTruckDetail(data)),
  SelectedTruckDetailError: (error) => dispatch(SelectedTruckDetailError(error)),
  getSelectedTruckDetail: () => dispatch(getSelectedTruckDetail()),
  
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)

