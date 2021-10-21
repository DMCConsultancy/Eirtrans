import { StyleSheet } from "react-native";
import { fontfamily, size,colors } from "../../global/globalStyle";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        padding: 20
    },
    headersty:{
        backgroundColor:"transparent",
        elevation:0
    },
    title:{
        fontFamily: fontfamily.regular,
        fontSize: size.title,
        color:"#000"
    },
    mt20:{
        marginTop:20
    },
    input:{
        borderRadius:5,
        borderWidth:1.5,
        borderColor:"#000",
        height:45,
        padding:10,
        fontSize:size.subtitle,
        fontFamily:fontfamily.regular,
        color:"#000",
        marginTop:15,
        backgroundColor:"#fff"
    },
    row:{
        flexDirection:"row"
    },
    datePicker:{
        borderRadius:5,
        borderWidth:1.5,
        borderColor:"#000",
        height:45,
        padding:10,
        marginTop:15,
        justifyContent:"center",
        alignItems:"center",
        width:"95%",
        backgroundColor:"#fff"
    },
    box:{
        borderRadius:5,
        borderColor:"#000",
        borderWidth:1.5,
        padding:20,
        justifyContent:"center",
        alignItems:"center",
        marginTop:30
    },
    boxcontainer:{width:"31%",marginRight:'3%'},
    boxtxt:{
      fontFamily: fontfamily.regular,
      fontSize: size.subtitle,
      color:"#000",
      marginTop:10
    },
    center:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        
        padding:20,
        //   alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: Platform.OS=="android"?1:0.2,
        shadowRadius: 4,
        elevation: Platform.OS=="android"?5:0,
       width:350,
        borderRadius:5
      },
      successtxt:{
        fontFamily: fontfamily.light,
        fontSize:26,
        color:"#000",
        marginTop:10
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
})

export default styles