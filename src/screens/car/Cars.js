import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image,Button, StatusBar, FlatList, Modal, TextInput, Dimensions, ScrollView } from "react-native";
import { Container, Header, Left, Right } from "native-base";
import styles from "./Styles";
import { colors, images } from "../../global/globalStyle";
import Icon from "react-native-vector-icons/Feather";
import Success from "react-native-vector-icons/SimpleLineIcons";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'; 
import { captureScreen } from "react-native-view-shot";

const numColumns = 3;
const Item_wdh = Dimensions.get('window').width

export default class Truckdetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible_alert: false,showtxt:false,
            messege: "",selectedItem: null,
            data: data,modalVisible_alert1:false,
            data1:data1, imageURI:"",screenShotmodal_alert:false
        }
    }

    formatData = (data, numColumns) => {
        if (data != undefined) {
            const numberOfFullRows = Math.floor(data.length / numColumns);

            let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
            while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
                data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
                numberOfElementsLastRow++;
            }
            return data;
        }
    };

    captureScreenFunction=()=>{
 
        captureScreen({
          format: "jpg",
          quality: 0.8
        })
        .then(
          uri => {this.setState({ imageURI : uri })},
          error => console.error("Oops, Something Went Wrong", error)
        );
     
      }

    onPress(index){
        this.setState({selectedItem: index});
         if(index=="11"){
           this.captureScreenFunction()
           this.screenShotModal(true)
           console.log({index})
         }else{
            this.chooseFile()
         }
    }

     chooseFile = () => {
        let options = {
          title: 'Select Image',
          customButtons: [
            {
              name: 'customOptionKey',
              title: 'Choose Photo from Custom Option'
            },
          ],
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        launchImageLibrary(options, (response) => {
          console.log('Response = ', response);    
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log(
              'User tapped custom button: ',
              response.customButton
            );
            alert(response.customButton);
          } else {
            let source = response;
           console.log('source',source)
           this.setModalVisible(!this.state.modalVisible_alert);
          }
        });
      };

    ItemView = ({ item, index }) => {
        return (
            <View style={[styles.container, { marginTop: 10 }]}>
                <TouchableOpacity onPress={()=>this.onPress(item.id)}>
                    <View style={styles.btnsty}>
                        <Text style={this.state.selectedItem === item.id?[styles.text,{color:colors.danger}]: styles.text}>{item.labal}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    setModalVisible = (visible) => {
        this.setState({ modalVisible_alert: visible });
    }

    setModal = (visible) => {
        this.setState({ modalVisible_alert1: visible });
    }

    screenShotModal = (visible) => {
        this.setState({ screenShotmodal_alert: visible });
    }

    render() {
        const state = this.state;
        return (
            <Container style={styles.container}>
                <StatusBar hidden />
                <View style={[styles.container, { backgroundColor: "skyblue" }]}>
                    <Header style={styles.headersty}>
                        <Left>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                                <Icon name="arrow-left" size={22} color="#000" />
                            </TouchableOpacity>
                        </Left>

                        <Right>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}
                                style={styles.rightbox} >
                                <Text style={styles.text}>Home</Text>
                            </TouchableOpacity>
                        </Right>
                    </Header>

                    <ScrollView>
                        <View style={styles.content}>
                            <Image source={images.car} style={styles.imgsty} />
                        </View>
                        <FlatList columnWrapperStyle={styles.row}
                            style={{ paddingHorizontal: 15 }}
                            data={this.formatData(this.state.data, numColumns)}
                            renderItem={this.ItemView}
                            keyExtractor={(item, index) => index.toString()}
                            numColumns={numColumns}
                            extraData={this.state.data}
                        />

                       <FlatList columnWrapperStyle={styles.row}
                            style={{ paddingHorizontal: 15, marginTop:20 }}
                            data={this.formatData(this.state.data1, numColumns)}
                            renderItem={this.ItemView}
                            keyExtractor={(item, index) => index.toString()}
                            numColumns={numColumns}
                        />

                    </ScrollView>
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible_alert}
                    onBackdropPress={() => this.setModalVisible(!this.state.modalVisible_alert)}
                    onRequestClose={() => {
                        this.setModalVisible(!this.state.modalVisible_alert);
                    }}>
                    <View style={styles.center}>
                        <View style={styles.modalView}>
                            <Text style={styles.damagetxt}>Damage Detail</Text>
                            <View style={styles.bordersty} />
                            <Text style={styles.text}>Enter additional notes if required</Text>
                             
                            <TextInput style={styles.input}
                            value={this.state.messege} 
                              onChangeText={(messege)=>this.setState({messege})} />

                            <View style={[styles.bordersty,{backgroundColor:'#ccc'}]} />

                            <View style={{flexDirection:"row"}}>
                                 <TouchableOpacity onPress={()=>this.setModalVisible(!this.state.modalVisible_alert)}
                                 style={styles.mybtnsty}>
                                     <Text style={styles.damagetxt}>Cancel</Text>
                                 </TouchableOpacity>
                                 <TouchableOpacity onPress={()=>{this.setModalVisible(!this.state.modalVisible_alert)
                                 this.setModal(!this.state.modalVisible_alert1)}}
                                 style={[styles.mybtnsty,{borderLeftWidth:2,borderLeftColor:"#ccc"}]}>
                                     <Text style={styles.damagetxt}>Ok</Text>
                                 </TouchableOpacity>
                             </View>
                        </View>
                    </View>
                </Modal>
           
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible_alert1}
                    onBackdropPress={() => this.setModal(!this.state.modalVisible_alert1)}
                    onRequestClose={() => {
                        this.setModal(!this.state.modalVisible_alert1);
                    }}>
                    <View style={styles.center}>
                        <View style={[styles.modalView,{alignItems:"center"}]}>
                        <Success name="check" color={colors.primarylight} size={56} />
            <Text style={styles.successtxt}>Success!</Text>
               {this.state.showtxt==true?(
            <Text style={styles.mytxt}>Damage details recorded successfully</Text>
            ):<Text style={styles.mytxt}></Text>}

            <TouchableOpacity style={styles.okbtn} 
            onPress={()=> {this.setModal(!this.state.modalVisible_alert1)
                if(this.state.showtxt==true){
             this.props.navigation.navigate('Description')
            }
            }} >
                <Text style={styles.formLabal}>Ok</Text>
            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.screenShotmodal_alert}
                    onBackdropPress={() => this.screenShotModal(!this.state.screenShotmodal_alert)}
                    onRequestClose={() => {
                        this.screenShotModal(!this.state.screenShotmodal_alert);
                    }}>
                    <View style={styles.center}>
                        <View style={styles.modalViewscreen}>
                            <Image source={{ uri: this.state.imageURI }}
                                style={styles.imageShot} />
                            <TouchableOpacity style={styles.sendScreenbtn}
                                onPress={() => {
                                    this.setState({showtxt:true})
                                    this.screenShotModal(!this.state.screenShotmodal_alert)
                                    this.setModal(!this.state.modalVisible_alert1)
                                }} >
                                <Text style={[styles.formLabal,{color:"#000"}]}>Send Screenshot</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
           
            </Container>

        )
    }
}

const data = [
    { labal: "Dent", id:"1" }, { labal: "Broken" , id:"2" }, { labal: "Cracked",id:"3"  },
     { labal: "Chipped",id:"4"  },{ labal: "Scratched",id:"5" }, { labal: "Holed",id:"6"  },
      { labal: "Missing",id:"7"  }, { labal: "Other",id:"8"  },{ labal: "Torn",id:"9"  },
]

const data1 = [
    { labal: "Reset",id:"10" }, { labal: "Record & Continue",id:"11" }, { labal: "View Photos",id:"12" } ]
