import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {images, colors, size, fontfamily} from "../global/globalStyle";

var { width,height } = Dimensions.get('window');
export default class CustomSidebarMenu extends Component {

    constructor() {
        super();
        this.niv = [
            {
                navOptionThumb: 'home',
                navOptionName: 'Home',
                screenToNavigate: 'Home',
            },
            {
                navOptionThumb: 'bell',
                navOptionName: 'Notification',
                screenToNavigate: 'Notification',
            },
            {
                navOptionThumb: 'dollar',
                navOptionName: 'Expenses',
                screenToNavigate: 'Expenses',
            },
            {
                navOptionThumb: 'mobile',
                navOptionName: 'Contact Us',
                screenToNavigate: 'Contact',
            },
            {
                navOptionThumb: 'user',
                navOptionName: 'About us',
                screenToNavigate: 'About',
            },
            {
                navOptionThumb: 'user',
                navOptionName: 'Terms & conditions',
                screenToNavigate: 'Terms',
            },
            {
                navOptionThumb: 'user',
                navOptionName: 'Logout',
                screenToNavigate: 'Login',
            },
        ];
    }

    render() {
        return (
            <View>

                <Image style={styles.logo}
                source={images.logo} />
                <View style={{ width: '100%', marginTop: 10 }}>

                    {this.niv.map((niv, key) => (
                        <TouchableOpacity 
                            onPress={() => {
                                global.currentScreenIndex = key;
                                this.props.navigation.navigate(niv.screenToNavigate);
                            }}>
                            <View style={styles.border}>
                                <View style={{ marginLeft: 30, width: "20%" }}>
                                    <Icon name={niv.navOptionThumb} size={22} color="#9564f1" />
                                </View>
                                <View style={{ width: "80%" }}>
                                    <Text
                                        style={styles.title}>
                                        {niv.navOptionName}
                                    </Text>
                                </View>
                            </View>
                            <View style={{height:1, backgroundColor:"#ccc"}} />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    logo: {
        width: width * 0.8,
        height: width * 0.4,
        resizeMode: "contain",
        marginTop: 20
    },
    border:{
       
         flexDirection: 'row', alignItems: 'center', paddingVertical:20
    },
    title:{
        fontSize: size.label, color: colors.danger,
        fontFamily: fontfamily.regular
    }
})