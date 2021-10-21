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
    text:{
        fontSize: size.subtitle,
        fontFamily: fontfamily.medium,
        color:"#000"
    },
    imgsty:{
        height:250,
        width:"100%",
        borderColor:"#000",
        borderWidth:2,
        borderRadius:3
    },
    btnsty:{
        borderRadius:3,
        borderColor:"#000",
        borderWidth:2,
        padding:10,
        justifyContent:"center",
        alignItems:"center",
        marginHorizontal:5
    },
    row:{
        flex: 1,
        justifyContent: "space-around"
    },
    center:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 0,
        padding:20,
        //  alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: Platform.OS=="android"?1:0.2,
        shadowRadius: 4,
        elevation: Platform.OS=="android"?5:0,
       width:350,
        borderRadius:10
      },
      modalViewscreen:{
        margin: 10,
        backgroundColor: "white",
        borderRadius: 0,
        padding:20,
        //  alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: Platform.OS=="android"?1:0.2,
        shadowRadius: 4,
        elevation: Platform.OS=="android"?5:0,
        width:width-20,
        height: height-40,
        borderRadius:10
      },
      input:{
          padding:10,
          borderColor:'#000',
          borderWidth:2,
          fontFamily: fontfamily.regular,
          fontSize: size.subtitle,
          color:"#000",
          marginTop:15,
          borderRadius:5
      },
      damagetxt:{
        fontFamily: fontfamily.medium,
        fontSize: size.title,
        color:colors.blue
      },
      bordersty:{
          height:2,
          backgroundColor:colors.blue,
          marginVertical:15,

      },
      mybtnsty:{
        width:"50%",
        justifyContent:"center",
        alignItems:"center"
      },
      successtxt:{
        fontFamily: fontfamily.light,
        fontSize:26,
        color:"#000",
        marginTop:10
    },
    mytxt:{
        fontFamily: fontfamily.light,
        fontSize:size.title,
        color:"#777",
        marginTop:10,
        textAlign:"center",
        lineHeight:20
      },
      okbtn:{
        backgroundColor:colors.primarylight,
        borderRadius:5,
        paddingHorizontal:30,
        paddingVertical:10,
        justifyContent:"center",
        alignItems:"center",
        marginTop:10
    },
    formLabal:{
        fontSize: size.title,
        fontFamily: fontfamily.regular,
        color:"#fff"
    },
    imageShot:{
        width: "100%",
        height: "90%",
        resizeMode: 'contain'
    },
    sendScreenbtn:{
        padding:20,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: colors.success,
        borderWidth:2,
        borderColor:"#000",
        borderRadius:5,
        marginTop:10
    }
})

export default styles;