import React, { Component } from "react";
import { Text, View, Button, TouchableOpacity, Image, StatusBar, Modal, ImageBackground, ScrollView } from "react-native";
import { Container, Header, Left, Right } from "native-base";
import styles from "./Styles";
import { images} from "../../global/globalStyle";
import Icon from "react-native-vector-icons/Feather";
import Success from "react-native-vector-icons/SimpleLineIcons";
import MyButton from "../../components/button/Mybutton";


export default class Morning extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible_alert:false
        }
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible_alert: visible });
        }

    render() {
        return (
            <Container style={styles.container}>
                <StatusBar hidden />
                <ImageBackground source={images.bg} style={styles.container}>
                <Header style={styles.headersty}>
                    <Left>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                        <Image source={images.arrow} style={styles.arrow} tintColor={'grey'}/>
                        </TouchableOpacity>
                    </Left>
                    <Right>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Home')}
                        style={styles.rightbox} >
                            <Text style={styles.text}>Home</Text>
                        </TouchableOpacity>
                    </Right>
                </Header>

                <View style={styles.content}>
                <View style={styles.center}>
              <Image style={styles.logo}
                source={images.logo} />
            </View>

            <View  style={{marginTop:"20%"}}>
            <MyButton title="Test"
                onPress={() => this.props.navigation.navigate('Testdetails')}
                backgroundColor="#fff" color="#000" textTransform="uppercase" />
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
          <View style={styles.center}>
            <View style={styles.modalView}>
                <Success name="check" color="green" size={56} />
            <Text style={styles.successtxt}>Success!</Text>

            <Text style={styles.mytxt}>New morning Successfully.</Text>

            <TouchableOpacity style={styles.okbtn} 
            onPress={()=> {this.setModalVisible(!this.state.modalVisible_alert)
            this.props.navigation.goBack()
            }} >
                <Text style={[styles.formLabal,{color:"#fff"}]}>Ok</Text>
            </TouchableOpacity>
             
            </View>
          </View>
        </Modal>
            </Container>

        )
    }
}
