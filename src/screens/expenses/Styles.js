import { StyleSheet } from "react-native";
import { colors, fontfamily, size } from "../../global/globalStyle";

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    content:{
        padding:20
    },
    headersty:{
        backgroundColor:"transparent",
        elevation:0
    },
    row:{
        flexDirection:"row"
    },
    arrow:{
     width:20,
     height:20
    },
    width33:{
         width: "33.3%" 
    },
    title:{
        fontSize: size.label,
        fontFamily : fontfamily.regular,
        color:"#000"
    },
    subtitle:{
        fontSize: 13,
        fontFamily : fontfamily.light,
        color:"#000"
    },
    view:{
        fontFamily: fontfamily.light,
        fontSize: 13,
        color:colors.danger,
        textDecorationColor:colors.danger,
        textDecorationLine:"underline",
        marginTop:3
    },
    border:{height:2,backgroundColor:"#000", marginTop:10},
    btnsty:{
        backgroundColor:"#666",
        padding:15,
        justifyContent:"center",
        alignItems:"center",
        width:170,
        marginTop:10
    },
    btntxt:{
        fontSize: size.label,
        fontFamily: fontfamily.regular,
        color:"#000",
        textTransform:"uppercase"
    },
    total:{
        fontSize: size.heading,
        fontFamily: fontfamily.regular,
        color:"#000",
        marginTop:"5%"
    }
})

export default styles