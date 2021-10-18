import React, { Component } from "react";
import { Text, View, Button, Image, StatusBar, TextInput,ImageBackground } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { Container } from "native-base";
import styles from "./Styles";
import { colors, images, size, fontfamily } from "../../global/globalStyle";
import Icon from "react-native-vector-icons/FontAwesome"
import MyButton from "../../components/button/Mybutton";

export default class Login extends Component {
    render() {
        return (
            <Container style={styles.container}>
                <StatusBar hidden />    

                <ImageBackground source={images.bg} style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.center}>
                    <Image style={styles.logo}
                        source={images.logo} />
                      </View>

                       <View style={styles.pickersty}>
                    <RNPickerSelect
                        placeholder={{
                            label: 'Select Driver',
                            value: null,
                        }}
                        items={items}
                        onValueChange={(value) => console.log(value)}
                        useNativeAndroidPickerStyle={false}
                        style={pickerStyle}
                        Icon={() => {
                            return <Icon name="chevron-down" size={13} color="#000" />;
                          }}
                    />
                  
                    </View>
                
                     <View>
                         <TextInput placeholder="Enter Pin" 
                         style={styles.input}
                         selectionColor="#fff"
                         placeholderTextColor="#fff"
                         />
                    </View>
                      
                      <View style={styles.mt}>
                    <MyButton title="Login" onPress={()=>this.props.navigation.navigate('Home')} />
                       </View>
                </View>
                </ImageBackground>
                <View style={styles.overlay} />
           
           
           
            </Container>
        )
    }
}

const items=[
    { label: 'Football', value: 'football' },
    { label: 'Baseball', value: 'baseball' },
    { label: 'Hockey', value: 'hockey' },
]

const pickerStyle = {
    inputIOS: {
        color: '#000',
           fontSize: size.title,
        //   fontFamily: fontfamily.roboto
    },
    inputAndroid: {
        color: '#000',
           fontSize: size.title,
           fontFamily: fontfamily.regular,
        // borderWidth: 2
        paddingHorizontal:10,
        backgroundColor:colors.warning
    },
    iconContainer: {
        top: 12,
        right: 10,
      },
    placeholder: {
        color: '#000',
    },
  
};