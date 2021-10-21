import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image, StatusBar, TextInput, Modal, ImageBackground, ScrollView } from "react-native";
import { Container, Header, Left, Right, Textarea } from "native-base";
import styles from "./Styles";
import { colors, images } from "../../global/globalStyle";
import Icon from "react-native-vector-icons/Feather";
import Dot from "react-native-vector-icons/Entypo";
import Success from "react-native-vector-icons/SimpleLineIcons";
import MyButton from "../../components/button/Mybutton";

export default class Truckdetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible_alert:false,
            form:"",
            to:"",btnclr:false,
            messege:"NA"
        }
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible_alert: visible });
   }

    render() {
        const state = this.state;
        return (
            <Container style={styles.container}>
                <StatusBar hidden />
                <ImageBackground source={images.bg} style={styles.container}>
                <Header style={styles.headersty}>
                    <Left>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                            <Icon name="arrow-left" size={22} color="#000" />
                        </TouchableOpacity>
                    </Left>
                   
                    <Right>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Home')}
                        style={styles.rightbox} >
                            <Text style={styles.text}>Home</Text>
                        </TouchableOpacity>
                    </Right>
                </Header>

                <ScrollView>

                <View style={styles.content}>
                 
                 <View>
                     <View style={styles.row}>
                     <View style={styles.width40}>
                          <Text style={styles.text}>Form <Dot name="dots-two-vertical" /> </Text>
                       </View>
                       <View style={styles.width60}>
                        <TextInput style={styles.input}
                        onChangeText={(form)=>this.setState({form})}
                        value={this.state.form}
                         />
                       </View>
                    </View>

                    <View style={[styles.row,{marginTop:10}]}>
                     <View style={styles.width40}>
                          <Text style={styles.text}>To <Dot name="dots-two-vertical" /> </Text>
                       </View>
                       <View style={styles.width60}>
                        <TextInput style={styles.input}
                        onChangeText={(form)=>this.setState({form})}
                        value={this.state.form}
                         />
                       </View>
                    </View>
                 </View>

               <View>
                   <Image source={images.map} style={styles.mapsty} />
                   <Text style={styles.maptxtsty}>tap here for go on map </Text>
               </View>

               <View>
                   <View style={styles.cardsty}>
                       <View style={styles.topribben}>
                           <Text style={styles.text}>TEST</Text>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.card40}>
                            <Text style={styles.text}>Post code<Dot name="dots-two-vertical" /> </Text>
                            </View>
                            <View style={styles.card60}>
                                <Text style={styles.label}>D15 FA30</Text>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.card40}>
                            <Text style={styles.text}>Collection Address<Dot name="dots-two-vertical" /> </Text>
                            </View>
                            <View style={styles.card60}>
                                <Text style={styles.label}>Curit, Nua Cruit</Text>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.card40}>
                            <Text style={styles.text}>Delivery Address<Dot name="dots-two-vertical" /> </Text>
                            </View>
                            <View style={styles.card60}>
                                <Text style={styles.label}>Hollywoodrath</Text>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.card40}>
                            <Text style={styles.text}>Contact<Dot name="dots-two-vertical" /> </Text>
                            </View>
                            <View style={styles.card60}>
                                <Text style={styles.label}>+353857622738</Text>
                            </View>
                        </View>

                        <View>
                            <Textarea style={styles.textarea}
                            value={this.state.messege}
                            onChangeText={(messege)=>this.setState({messege})} />
                        </View>
                    </View>
                    <View style={styles.bottomRibben} />
                </View>

                <View style={styles.cardjob}>
                   <Text style={styles.heading}>Job Status</Text>

                   <View style={styles.row}>
                       <View style={{width:"50%"}}>
                      <TouchableOpacity style={this.state.btnclr==true?[styles.btnsty,{backgroundColor:colors.success}]: styles.btnsty}
                      onPress={()=>{ this.setState({btnclr:true})
                          this.setModalVisible(!this.state.modalVisible_alert)}}>
                          <Text style={styles.text}>Collected</Text>
                      </TouchableOpacity>
                        </View>

                        <View style={{width:"50%"}}>
                        <TouchableOpacity style={styles.btnsty}
                      onPress={()=>alert('hii')}>
                          <Text style={styles.text}>Not Collected</Text>
                      </TouchableOpacity>
                        </View>
                    </View>
                 </View>   

              </View>
              </ScrollView>
                </ImageBackground>

                <Modal
          animationType="slide"
          transparent={true}
          
          visible={this.state.modalVisible_alert}
          onBackdropPress={() =>  this.setModalVisible(!this.state.modalVisible_alert)}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible_alert);
          }}>
          <View style={styles.center}>
            <View style={styles.modalView}>
                <Success name="exclamation" color={colors.warninglight} size={56} />
            <Text style={styles.successtxt}>Are you sure?</Text>

            <Text style={styles.mytxt}>You want to collect!</Text>
             
             <View style={styles.row}>
              <View style={{width:"50%"}}>
                  <TouchableOpacity style={styles.cancelbtn}
                  onPress={()=> this.setModalVisible(!this.state.modalVisible_alert)} >
                         <Text style={styles.btntxt}>Cancel</Text>
                  </TouchableOpacity>
            </View>
            <View style={{width:"50%"}}>
            <TouchableOpacity style={styles.yesbtn}
               onPress={()=> {this.setModalVisible(!this.state.modalVisible_alert)
               this.props.navigation.navigate('Cars')}} >
                         <Text style={styles.btntxt}>Yes</Text>
                  </TouchableOpacity>
            </View>
            </View>
             
            </View>
          </View>
             </Modal>
            </Container>

        )
    }
}
