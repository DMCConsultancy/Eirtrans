import {StyleSheet} from "react-native";
import { fontfamily, size, colors } from "../../global/globalStyle";

const styles = StyleSheet.create({
    conatainer:{
        flex:1,
        backgroundColor:"#CED9EB"
    },
    content:{
        padding:20
    },
    arrow:{
      height:20,
      width:20
    },
    headersty:{
        backgroundColor:"transparent",
        elevation:0
    },
    text:{
        fontFamily: fontfamily.regular,
        fontSize: size.subtitle,
        color:"#000",
        lineHeight:25
    },
    imgsty:{
        height:150,
        width:"100%",
        // resizeMode:"contain"
    },
    crdsty:{
        backgroundColor:"#fff",
        borderRadius:10,
        padding:15,
        marginTop:20
    },
    heading:{
        fontSize: 26,
        fontFamily :fontfamily.light,
        color:"#000",
        textAlign:"center"
    },
    inputs:{
        borderWidth:2,
        borderColor:"#000",
        paddingHorizontal:10,
        fontSize: size.subtitle,
        fontFamily: fontfamily.regular,
        color:"#000",
        backgroundColor:"#fff",
        // height:45,
        marginTop:15
    },
    mt20:{
        marginTop:20
    },
    title:{
        fontSize: size.title,
        fontFamily :fontfamily.light,
        color:"#000",
    },
    btnsty:{
        backgroundColor: colors.danger,
        justifyContent:"center",
        alignItems:"center",
        padding:10
    }
})

export default styles;