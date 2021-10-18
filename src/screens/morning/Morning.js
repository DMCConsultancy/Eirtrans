import React, { Component } from "react";
import { Text, View, Button, TouchableOpacity, Image, StatusBar, TextInput, Modal, ImageBackground, ScrollView } from "react-native";
import { Container, Header, Left, Right } from "native-base";
import styles from "./Styles";
import { images, size, fontfamily, colors } from "../../global/globalStyle";
import Icon from "react-native-vector-icons/Feather";
import Check from "react-native-vector-icons/Fontisto";
import Error from "react-native-vector-icons/MaterialIcons";
import Success from "react-native-vector-icons/SimpleLineIcons";
import { Table, TableWrapper, Row, Cell, Col, Rows } from 'react-native-table-component';


export default class Morning extends Component {

    constructor(props) {
        super(props);
        this.state = {
            truck: "", showChecked: "", showYes: false,Trailar:"",
            remark: "",generalRemark:"",nilStatus:false,Mileage:"", modalVisible_alert:false,
            tableHead: ['Item', 'Checked', 'Remark'],
            tableData: [
                ['no fuel/oil leaks', '', ''],
                ['coolant', '', ''],
                ['battery security\n(condition)', '', ''],
                ['tyres & wheel fixing', '', ''],
                ['spery supperssion', '', ''],
                ['steering', '', ''],
                ['security of load', '', ''],
                ['garage', '', '']
            ]
        }
    }

    _alertIndex(index, cellIndex) {
        // Alert.alert(`This is row ${index + 1}`);
        this.setState({ showChecked: true, showYes: !this.state.showYes })
    }

    UNSAFE_componentWillMount() {
        const truck = this.props.navigation.getParam('truck', truck)
        this.setState({ truck })
    }

    NilStatus(){
        if(this.state.nilStatus==false){
            this.setState({nilStatus:true, showChecked:true, showYes:true})
           
        }else{
            this.setState({nilStatus:false,showChecked:""})
        }
    }

    validation(){
        if(this.state.Trailar!=""){
            this.setState({errorTrailar: false})
        }else{
            this.setState({errorTrailar: true})
        }

        if(this.state.Mileage!=""){
            this.setState({errorMileage:false})
        }else{
            this.setState({errorMileage:true})
        }
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible_alert: visible });
        }

    onPress(){
        const  {Mileage, Trailar } = this.state
        if(Trailar!="" && Mileage!=""){
             this.validation()
             this.setModalVisible(!this.state.modalVisible_alert)
        }else{
            this.validation()
        }
    }

    element(cellIndex, data, index) {
        if (cellIndex == 2) {
            return <View style={{ alignItems: "center" }}>
                <TextInput style={styles.input}
                    onChangeText={(remark) => {
                        const { tableData } = this.state;
                        const newCompanies = [...tableData];
                        newCompanies[index][cellIndex] = remark;
                        console.log({ newCompanies })
                        this.setState({ tableData: newCompanies })
                    }} />
            </View>
        }
        if (cellIndex == 1) {
            return <TouchableOpacity style={[styles.center]}
                onPress={() => {
                    this._alertIndex(index, cellIndex)
                    console.log({ cellIndex, index })
                    const { tableData } = this.state;
                    const newCompanies = [...tableData];
                    this.state.showYes == true ?
                        newCompanies[index][cellIndex] = "N"
                        : newCompanies[index][cellIndex] = "Y"
                    //  console.log({newCompanies})
                    this.setState({ tableData: newCompanies })
                }}>
                {this.state.showChecked != "" ? (
                    this.state.showYes == true ?
                        <View style={styles.yesbtn}>
                            <Text style={styles.btnText}>Y</Text>
                        </View>
                        :
                        <View style={styles.nobtn}>
                            <Text style={styles.btnText}>N</Text>
                        </View>
                ) : null}
            </TouchableOpacity>

        } else {
            return <View>
                <Text style={styles.title}>{data}</Text>
            </View>
        }
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
                        <View style={styles.rightbox} >
                            <Text style={styles.text}>{this.state.truck}</Text>
                        </View>
                    </Right>
                </Header>
                <ScrollView>
                    <View style={styles.content}>
                        <View >
                            {/* <ScrollView>  */}
                            <Table borderStyle={styles.borderStyle} >
                                <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
                                {
                                    state.tableData.map((rowData, index) => (
                                        <TableWrapper key={index} style={styles.row}>
                                            {
                                                rowData.map((cellData, cellIndex) => (
                                                    <Cell key={cellIndex}
                                                        data={this.element(cellIndex, cellData, index)}
                                                        textStyle={styles.text} />
                                                ))
                                            }
                                        </TableWrapper>
                                    ))
                                }
                            </Table>
                            {/* </ScrollView> */}
                        </View>
                     
                            <View style={styles.mt20}>
                                <View style={{flexDirection:"row"}}>
                                <View style={{width:"25%"}}>
                                 <Text style={styles.formLabal}>General Remarks</Text>
                               </View>

                               <View style={{width:"75%"}}>
                                <TextInput placeholder="Enter General Remark"
                                style={styles.textinput}
                                value={this.state.generalRemark}
                                onChangeText={(value)=>this.setState({generalRemark:value})}
                                 />
                                 
                               </View>
                                </View>
                                </View>
                              
                                <View style={styles.mt20}>
                                <View style={{flexDirection:"row"}}>
                                <View style={{width:"25%"}}>
                                 <Text style={styles.formLabal}>Trailar Id</Text>
                               </View>

                               <View style={{width:"35%"}}>
                                <TextInput placeholder="Enter Trailar Id"
                                style={styles.textinput}
                                value={this.state.Trailar}
                                onChangeText={(value)=>this.setState({Trailar:value})}
                                 />
                                 {this.state.errorTrailar==true?(
                                  <Error name="error" color="red" size={20} style={styles.iconsty} />
                                 ):null}
                               </View > 

                               <View style={{width:"40%",alignItems:"center",justifyContent:"center"}}>
                                   {this.state.nilStatus==false?(
                                       <TouchableOpacity onPress={()=>this.NilStatus()}>
                               <Text style={[styles.formLabal,{marginLeft:20}]}>
                                   <Check name="checkbox-passive" color={colors.danger} size={15} />
                                   {"    "}Nil Defects</Text>
                                   </TouchableOpacity>
                                   ):
                                   <TouchableOpacity onPress={()=>this.NilStatus()}>
                                   <Text style={[styles.formLabal,{marginLeft:20}]}>
                                   <Check name="checkbox-active" color={colors.danger} size={15}  />
                                   {"    "}Nil Defects</Text>
                                   </TouchableOpacity>}
                                </View>
                                </View>
                            
                            
                            </View>

                            <View style={styles.mt20}>
                                <View style={{flexDirection:"row"}}>
                                <View style={{width:"25%"}}>
                                 <Text style={styles.formLabal}>Mileage</Text>
                               </View>

                               <View style={{width:"35%"}}>
                                <TextInput placeholder="0"
                                keyboardType="numeric"
                                style={styles.textinput}
                                value={this.state.Mileage}
                                onChangeText={(value)=>this.setState({Mileage:value})}
                                 />
                                  {this.state.errorMileage==true?(
                                  <Error name="error" color="red" size={20} style={styles.iconsty} />
                                 ):null}
                               </View > 

                               <View style={{width:"40%"}}>
                                  <TouchableOpacity style={styles.accptbtn} onPress={()=>this.onPress()} >
                                      <Text style={styles.accptbtntxt}>Accept & Finalise</Text>
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
