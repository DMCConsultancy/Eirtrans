import { StyleSheet } from "react-native";
import { paddingTop } from "styled-system";
import { colors, fontfamily, size } from "../../global/globalStyle";

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"skyblue"
    },
    content:{
        padding:10
    },
    arrow:{
      width:20,
      height:20
    },
    headersty:{
        backgroundColor:"transparent",
        elevation:0,
        paddingTop: 50
    },
    title:{
        fontFamily: fontfamily.regular,
        fontSize: size.subtitle,
        color: colors.danger
    },
    date:{
        fontFamily: fontfamily.regular,
        fontSize: size.subtitle,
        color: colors.success
    },
    moretxt:{
        fontFamily: fontfamily.regular,
        fontSize: size.label,
        color: colors.danger,
        textDecorationLine: "underline",
        textDecorationColor: colors.danger,
        
    },
    crdsty:{
        backgroundColor:"transparent",
        elevation:0
    }
})

export default styles