import React, { Component } from "react";
import { Text, View, Button, TouchableOpacity, Image, StatusBar, TextInput, Modal, ImageBackground, ScrollView } from "react-native";
import { Body, Container, Header, Left, Right } from "native-base";
import styles from "./Styles";
import { images, size, fontfamily, colors } from "../../global/globalStyle";
import Icon from "react-native-vector-icons/Feather";
import Success from "react-native-vector-icons/SimpleLineIcons";
import { Table, TableWrapper, Row, Cell, Col, Rows } from 'react-native-table-component';


export default class Morning extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible_alert:false,
            tableHead: ['customar name', 'model', 'reg', 'collection address', 'lane'],
            tableData: [
                ['karl hughes', 'test', 'test', "court", "1"],
               
            ]
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
                        <Image source={images.arrow} style={styles.arrow} tintColor={'grey'} />
                        </TouchableOpacity>
                    </Left>
                    <Body style={{alignItems:"center"}}>
                    <Text style={styles.text}>212345344</Text>
                        </Body>
                    <Right>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Home')}
                        style={styles.rightbox} >
                            <Text style={styles.text}>Home</Text>
                        </TouchableOpacity>
                    </Right>
                </Header>

                <View style={styles.content}>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('Truckdetail')}>
                <Table borderStyle={styles.borderStyle} >
                                <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
                                {
                                    state.tableData.map((rowData, index) => (
                                        <TableWrapper key={index} style={styles.row}>
                                            {
                                                rowData.map((cellData, cellIndex) => (
                                                    <Cell key={cellIndex}
                                                        data={cellData}
                                                        textStyle={styles.textCell} />
                                                ))
                                            }
                                        </TableWrapper>
                                    ))
                                }
                 </Table>
                 </TouchableOpacity>

               <View style={{alignItems:"center"}}>
                 <TouchableOpacity onPress={()=>this.setModalVisible(!this.state.modalVisible_alert)}
                 style={styles.btnsty}>
                     <Text style={styles.mybtnText}>Load Collected</Text>
                 </TouchableOpacity>
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
          <View style={[styles.center,{flex:1}]}>
            <View style={styles.modalView}>
                <Success name="check" color="green" size={56} />
            <Text style={styles.successtxt}>Success!</Text>


            <TouchableOpacity style={styles.okbtn} 
            onPress={()=> {this.setModalVisible(!this.state.modalVisible_alert)
            }} >
                <Text style={[styles.mybtnText,{color:"#fff"}]}>Ok</Text>
            </TouchableOpacity>
             
            </View>
          </View>
        </Modal>
            </Container>

        )
    }
}
