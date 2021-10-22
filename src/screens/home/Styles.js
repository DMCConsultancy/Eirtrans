import { StyleSheet, Dimensions,Platform } from "react-native";
var { width,height } = Dimensions.get('window');

import { colors, size, fontfamily } from "../../global/globalStyle";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        padding: 20,
    },
    logo: {
        width: width * 0.8,
        height: width * 0.4,
        resizeMode: "contain",
        marginTop: 20
    },
    center: {
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: "center",
        marginTop: 20,
        borderRadius: 10,
        elevation: 2
    },
    buttontxt: {
        fontSize: size.subtitle,
        color: "#000",
        fontFamily: fontfamily.bold,
        alignSelf: "center",
        textTransform: "uppercase",
    },
    menu: { width: 20, height: 20, tintColor: "#000" },
    mt20: {
        marginTop: 20
    },
    centeredView:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 0,
        paddingHorizontal: 15,
        paddingBottom:10,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: Platform.OS=="android"?1:0.2,
        shadowRadius: 4,
        elevation: Platform.OS=="android"?5:0,
          width:width-40,
          height:height-60,
        borderRadius:10
      },
      close_btn:{
        position:"absolute",
        top:10, right:15
    },
    labelStyle:{
        fontFamily:fontfamily.bold,
        fontSize: size.subtitle,
        color:"#000"
    }
})

export default styles;