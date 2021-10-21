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
    row:{
        flexDirection:"row",
        marginTop:3,
    },
    width40:{
        width:"20%"
    },
    width60:{
      width:"80%"
    },
    input:{
        borderWidth:2,
        borderColor:"#000",
        borderRadius:3,
        paddingHorizontal:10,
        fontSize: size.label,
        fontFamily: fontfamily.medium,
        color:"#000",
        height:35,
        backgroundColor:"#fff"
    },
    mapsty:{
        height:180,
        resizeMode:"cover",
        width:"100%",
        marginTop:10
    },
    maptxtsty:{
        fontSize: 26,
        fontFamily: fontfamily.light,
        color:"#000",
        position:"absolute",
        top:65,
        left:"10%",
        right:"10%",
        textAlign:"center"
    },
    cardsty:{
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        backgroundColor:"#fff",
        paddingHorizontal:20,
        marginTop:10,
        borderLeftColor:colors.dangerlight,
        borderLeftWidth:30,
       
    },
    topribben:{
        marginRight:10,
        height:25,
        backgroundColor:colors.warninglight,
        alignItems:"center",
        justifyContent:"center"
    },
    card40:{
         width:"50%"
    },
    card60:{
        width:"50%"
    },
    label:{
        fontFamily: fontfamily.regular,
        fontSize: size.label,
        color:"#000"
    },
    textarea:{
        height:80,
        backgroundColor:"#fff",
        borderRadius:4,
        borderColor:"#000",
        borderWidth:2,
        marginTop:10,
        fontFamily: fontfamily.light,
        fontSize: size.label,
        color:"#000"
    },
    bottomRibben:{
        backgroundColor:"#fff",
        height:10,
        width:"100%",
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10
    },
    cardjob:{
        borderRadius:5,
        backgroundColor:"#fff",
        padding:20,
        marginTop:10
    },
    heading:{
        fontSize:28,
        fontFamily: fontfamily.medium,
        color:"#000",textAlign:"center"
    },
    btnsty:{
        backgroundColor:"#ffff",
        borderRadius:5,
        borderWidth:2,
        borderColor:"#000",
        justifyContent:"center",
        alignItems:"center",
        paddingHorizontal:20,
        paddingVertical:10,
        marginHorizontal:5,
        marginTop:20
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
      cancelbtn:{
          backgroundColor:colors.dangerlight,
          borderRadius:5,
          paddingHorizontal:20,
          paddingVertical:10,
          justifyContent:"center",
          alignItems:"center",
         marginRight:5,
         marginTop:10,
         width:120
      },
      yesbtn:{
        backgroundColor:colors.primarylight,
        borderRadius:5,
        paddingHorizontal:20,
        paddingVertical:10,
        justifyContent:"center",
        alignItems:"center",
        marginLeft:5,
        marginTop:10,
        width:120
      },
      btntxt:{
          color:"#fff",
          fontFamily: fontfamily.medium,
          fontSize: size.title
      },
      successtxt:{
          fontSize: 24,
          fontFamily: fontfamily.light,
          color:"#000",
          marginTop:10
      },
      mytxt:{
        fontSize: size.subtitle,
        fontFamily: fontfamily.light,
        color:"#777",
        marginTop:20
      }
})

export default styles;