import { StyleSheet,Platform ,Dimensions} from "react-native";
import { colors, fontfamily, size } from "../../global/globalStyle";
var { width,height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        padding: 20
    },
    arrow:{
     width:20,
     height:20
    },
    headersty:{
        backgroundColor:'transparent',
        elevation:0
    },
    rightbox:{
        borderColor:"#000",
        borderWidth:1,
        paddingHorizontal:20,
        paddingVertical:3,
        borderRadius:5
    },
    mytext:{
        fontSize: size.subtitle,
        fontFamily: fontfamily.medium,
        color:"#000"
    },
    inputs:{
        borderWidth:2,
        borderColor:"#000",
        paddingHorizontal:10,
        fontSize: size.subtitle,
        fontFamily: fontfamily.regular,
        color:"#000",
        backgroundColor:"#fff",
        height:45,
        marginTop:20
    },
    mt20:{
        marginTop:20
    },
    btnsty:{
        padding:10,
        borderRadius:5,
        borderColor:"#000",
        borderWidth:2,
        justifyContent:"center",
        alignItems:"center",
        width:100,
        marginTop:20
    },
    signature: {
        flex: 1,
        borderColor: '#000',
        borderWidth: 1,
    },
    buttonStyle: {
        flex: 1, justifyContent: "center", alignItems: "center",
        padding:10,
        backgroundColor: colors.primarylight,
        margin: 10,
        borderRadius:5,
        borderColor:"#000",
        borderWidth:2
    },
    center:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    modalView: {
        margin: 20,
        backgroundColor: "#fff",
        borderRadius: 0,
        // paddingHorizontal: 15,
        // padding:20,
        //  alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: Platform.OS=="android"?1:0.2,
        shadowRadius: 4,
        elevation: Platform.OS=="android"?5:0,
          width:width-40,
          height:height-50,
        borderRadius:10
      },
      modalViewsucess:{
        margin: 20,
        backgroundColor: "#fff",
        borderRadius: 0,
        // paddingHorizontal: 15,
         padding:20,
          alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: Platform.OS=="android"?1:0.2,
        shadowRadius: 4,
        elevation: Platform.OS=="android"?5:0,
          width:300,
        borderRadius:10
      },
      closeicon:{
        alignItems:"flex-end",
        marginRight:20,
        marginTop:20
      },
      btntext:{
        fontSize: size.title,
        fontFamily: fontfamily.regular,
        color:"#fff",
      },
      okbtn:{
        backgroundColor:colors.primarylight,
        borderRadius:5,
        paddingHorizontal:30,
        paddingVertical:10,
        justifyContent:"center",
        alignItems:"center",
        marginTop:30
    },
    successtxt:{
        fontFamily: fontfamily.light,
        fontSize:26,
        color:"#000",
        marginTop:10
    },
})

export default styles;