import { StyleSheet } from "react-native";
import {images,colors,size,fontfamily} from "../../global/globalStyle";

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#CED9EB",
        paddingBottom:20
    },
    content:{
        padding:15
    },
    arrow:{
      width:20,
      height:20
    },
    headersty:{
        backgroundColor:"transparent",
        elevation:0
    },
    imgsty:{
        borderRadius:10,
        height:170,
        resizeMode:"cover",
        width:"100%"
    },
    crdsty:{
        borderRadius:10,
      
    },
    txtsty:{
        fontFamily: fontfamily.light,
        fontSize: size.label,
        color:"#000",
        lineHeight:20
    },
    txtcontainer:{
        padding:10
    }
})

export default styles;