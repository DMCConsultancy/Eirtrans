import React,{Component} from "react";
import { Text,View, TouchableOpacity, Image, ScrollView } from "react-native";
import { Container, Header, Left, Right } from "native-base";
import styles from "./Styles";
import Icon from "react-native-vector-icons/Feather";
import { images } from "../../global/globalStyle";
import Astro from "react-native-vector-icons/FontAwesome5";

export default class Terms extends Component{
    render(){
        return(
           <Container style={styles.container}>
               <Header style={styles.headersty}>
                   <Left>
                       <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                       <Image source={images.arrow} style={styles.arrow} tintColor={'grey'} />
                       </TouchableOpacity>
                   </Left>
                   <Right/>
               </Header>
               <ScrollView>
               <View style={styles.content}>
                   <View style={{alignItems:"center"}}>
                   <Image source={images.logo} style={styles.logo} />
                   </View>
                  
                
                        <View>

                            <View style={styles.row}>
                                <View style={styles.wd5}>
                                    <Astro name="asterisk" />
                                </View>
                                <View style={styles.wd9}>
                                    <Text style={styles.txtsty}>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.{'\n'}</Text>
                                </View>
                            </View>

                            <View style={styles.row}>
                                <View style={styles.wd5}>
                                    <Astro name="asterisk" />
                                </View>
                                <View style={styles.wd9}>
                                    <Text style={styles.txtsty}>
                                        Lorem Ipsum is simply dummy text.{'\n'}</Text>
                                </View>
                            </View>

                            <View style={styles.row}>
                                <View style={styles.wd5}>
                                    <Astro name="asterisk" />
                                </View>
                                <View style={styles.wd9}>
                                    <Text style={styles.txtsty}>
                                        Lorem Ipsum is simply dummy text of the printing.{'\n'}</Text>
                                </View>
                            </View>

                            <View style={styles.row}>
                                <View style={styles.wd5}>
                                    <Astro name="asterisk" />
                                </View>
                                <View style={styles.wd9}>
                                    <Text style={styles.txtsty}>
                                        Lorem Ipsum is simply dummy text.{'\n'}</Text>
                                </View>
                            </View>

                            <View style={styles.row}>
                                <View style={styles.wd5}>
                                    <Astro name="asterisk" />
                                </View>
                                <View style={styles.wd9}>
                                    <Text style={styles.txtsty}>
                                        Lorem Ipsum is simply dummy text of the printing.{'\n'}</Text>
                                </View>
                            </View>

                            <View style={styles.row}>
                                <View style={styles.wd5}>
                                    <Astro name="asterisk" />
                                </View>
                                <View style={styles.wd9}>
                                    <Text style={styles.txtsty}>
                                        Lorem Ipsum is simply dummy text.{'\n'}</Text>
                                </View>
                            </View>

                            <View style={styles.row}>
                                <View style={styles.wd5}>
                                    <Astro name="asterisk" />
                                </View>
                                <View style={styles.wd9}>
                                    <Text style={styles.txtsty}>
                                        Lorem Ipsum is simply dummy text of the printing.{'\n'}</Text>
                                </View>
                            </View>

                            <View>
                                <Text style={[styles.txtsty, { textAlign: "center" }]}>
                                    We are members of the irish Road Haulage Association{'\n'}
                                    - Please see their conditions of carriage{'\n'}
                                </Text>
                                    
                                    <TouchableOpacity>
                                <Text style={styles.click}>Click here</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                </View>
                </ScrollView>
           </Container>

        )
    }
}