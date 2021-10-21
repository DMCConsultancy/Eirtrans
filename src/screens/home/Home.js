import React, { Component } from "react";
import { Text, View, Button, TouchableOpacity, Image, StatusBar, ImageBackground, Modal, TouchableWithoutFeedback, ScrollView } from "react-native";
import { Container } from "native-base";
import { DrawerActions } from 'react-navigation-drawer';
import styles from "./Styles";
import { images, size, fontfamily, colors } from "../../global/globalStyle";
import MyButton from "../../components/button/Mybutton";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

export default class Home extends Component {

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

              <MyButton title="Morning Checks"
              onPress={() => this.setModalVisible(!this.state.modalVisible_alert)}
                // onPress={() => this.props.navigation.navigate('Morning')}
                backgroundColor="#fff" color="#000" textTransform="capitalize" />

              <MyButton title="Jobs"
                onPress={() => this.props.navigation.navigate('Job')}
                backgroundColor="#fff" color="#000" textTransform="capitalize" />

              <MyButton title="Expenses"
                onPress={() => this.props.navigation.navigate('HomeExpenses')}
                backgroundColor="#fff" color="#000" textTransform="capitalize" />

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
              {/* <TouchableWithoutFeedback onPress={()=>this.setModalVisible(!this.state.modalVisible_alert)}> */}
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <ScrollView style={styles.container} keyboardShouldPersistTaps="handled" >
              <MyButton title="Select truck"
                backgroundColor={colors.warning} color="#000" textTransform="capitalize" />
                 <View style={styles.mt20}>
                  <RadioForm
                    formHorizontal={false}
                    animation={true}>
                    {
                      radio_props.map((obj, i) => (
                        <RadioButton labelHorizontal={true} key={i} >
                          <RadioButtonInput
                            obj={obj}
                            index={i}
                            isSelected={this.state.value3Index === i}
                            onPress={(value,index)=>{
                              this.setState({value2:value, value3Index:index})
                              this.props.navigation.navigate('Morning',{truck:value})
                              this.setModalVisible(!this.state.modalVisible_alert);
                            }}
                            borderWidth={2}
                            buttonInnerColor={'red'}
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
                              this.setState({value2:value, value3Index:index})
                              this.props.navigation.navigate('Morning',{truck:value})
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
             
            </View>
          </View>
          {/* </TouchableWithoutFeedback> */}
        </Modal>
      </Container>

    )
  }
}

var radio_props = [
  {label: 'param1', value: "param1" },
  {label: 'param2', value: "param2" },
  {label: 'param3', value: 'param3' },
  {label: 'param4', value: 'param4' },
  {label: 'param5', value: 'param5' },
  {label: 'param6', value: 'param6' },
  {label: 'param7', value: 'param7' },
  {label: 'param8', value: 'param8' },
  {label: 'param9', value: 'param9' },
  {label: 'param10', value: 'param10' },
  {label: 'param11', value: 'param11' },
  {label: 'param12', value: 'param12' },
  {label: 'param13', value: 'param13' },
  {label: 'param14', value: 'param14' },
  {label: 'param15', value: 'param15' },
  {label: 'param16', value: 'param16' },
];