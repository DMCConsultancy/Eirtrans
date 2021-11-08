import {Modal,StyleSheet,Platform, TouchableOpacity, View,Text, Dimensions, ActivityIndicator} from 'react-native';
import React from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors, fontfamily, size} from "../../global/globalStyle";
const {width} = Dimensions.get('window')

const Loader = ({visible,onBackdropPress,onRequestClose}) =>(
    <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onBackdropPress={onBackdropPress}
    onRequestClose={onRequestClose}>
    <View style={styles.center}>
      <View style={styles.modalView}>
         <ActivityIndicator color={colors.primary} size="large" />
      </View>
    </View>
  </Modal>
)

export default Loader;

const styles = StyleSheet.create({
    center:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    modalView: {
        margin: 20,
        backgroundColor: '#fff',
        padding: 15,
        alignItems: "center",
        justifyContent:"center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: Platform.OS == "android" ? 1 : 0.2,
        shadowRadius: 4,
        elevation: Platform.OS == "android" ? 5 : 0,
        width: width-40,
        borderRadius: 15
      },
      title:{
          fontFamily: fontfamily.bold,
          fontSize: size.heading,
          color: colors.danger,
          textAlign:'center'
      },
      btnsty:{
          borderRadius:5,
          borderWidth:1.5,
          borderColor:'#000',
          justifyContent:'center',
          alignItems:"center",
          paddingHorizontal:30,
          paddingVertical:5,
          marginTop:15
      },
      subtitle:{
        fontFamily: fontfamily.bold,
        fontSize: 26,
        color: '#000'
      }
  });
