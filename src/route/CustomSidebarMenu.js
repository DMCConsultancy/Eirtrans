import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

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
                navOptionThumb: 'user',
                navOptionName: 'Notification',
                screenToNavigate: 'Notification',
            },
            {
                navOptionThumb: 'user',
                navOptionName: 'Expenses',
                screenToNavigate: 'Expenses',
            },
            {
                navOptionThumb: 'user',
                navOptionName: 'Contact',
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
                <View style={{ width: '100%', marginTop: 10 }}>

                    {this.niv.map((niv, key) => (
                        <TouchableOpacity
                            onPress={() => {
                                global.currentScreenIndex = key;
                                this.props.navigation.navigate(niv.screenToNavigate);
                            }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 6, paddingBottom: 6 }}>
                                <View style={{ marginRight: 10, marginLeft: 30, width: "20%" }}>
                                    <Icon name={niv.navOptionThumb} size={22} color="#9564f1" />
                                </View>
                                <View style={{ width: "80%" }}>
                                    <Text
                                        style={{
                                            fontSize: 13, color: '#777'
                                        }}>
                                        {niv.navOptionName}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        )
    }
}