import React from "react";
import {  StyleSheet, TouchableOpacity, Text, Image , View} from "react-native";
import {colors, size,fontfamily} from "../../global/globalStyle";

// TouchableOpacity.defaultProps = { activeOpacity: 0.8 };

const MyButton = ({ onPress, title, backgroundColor,disabled, color, textTransform }) => (
 
  <TouchableOpacity onPress={onPress} 
  style={[
    styles.appButtonContainer,
    backgroundColor && { backgroundColor }
  ]}
  disabled = {disabled}
  >
    <Text style={[styles.appButtonText, color && {color}, textTransform && {textTransform}]}>{title}</Text>
  </TouchableOpacity>
 
);

const styles = StyleSheet.create({
    img:{
         position:'absolute',
         left:25
    },
    appButtonContainer: {
      backgroundColor: colors.danger,
      paddingVertical: 12,
      paddingHorizontal: 12,
      justifyContent:'center',
      alignItems:"center",
      marginTop:20,
    borderRadius:5,

    },
    appButtonText: {
      fontSize: size.subtitle,
      color: "#fff",
       fontFamily: fontfamily.regular,
      alignSelf: "center",
      textTransform: "uppercase",
     
    }
  });

export default MyButton;