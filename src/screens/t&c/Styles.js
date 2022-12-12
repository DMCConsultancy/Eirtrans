import { StyleSheet,Dimensions } from "react-native";
import { colors, fontfamily, size } from "../../global/globalStyle";
var { width,height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#CED9EB",
    },
    content:{
        padding:20
    },
    arrow:{
    width:20,
    height:20
    },
    headersty:{
        backgroundColor:"transparent",
        elevation:0
    },
    logo: {
        width: width * 0.8,
        height: width * 0.4,
        resizeMode: "contain",
    },
    txtsty:{
        fontSize:size.subtitle,
        fontFamily: fontfamily.light,
        color:"#000",
        lineHeight:20
    },
    row:{
        flexDirection:"row"
    },
    wd5:{
        width:'5%',
        marginTop:5
    },
    wd9:{
        width:'95%'
    },
    click:{
        fontFamily: fontfamily.light,
        fontSize: size.subtitle,
        color: colors.danger,
        textAlign:"center"
    }
})

export default styles;