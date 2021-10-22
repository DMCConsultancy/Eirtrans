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
        borderWidth:1.5,
        paddingHorizontal:20,
        paddingVertical:3,
        borderRadius:3
    },
    mytext:{
        fontSize: size.subtitle,
        fontFamily: fontfamily.bold,
        color:"#000"
    },
    row:{
        flexDirection:"row"
    },
    borderStyle:{ borderColor: '#000', borderWidth: 2 },
    head: {  backgroundColor: '#fff',},
    text: { padding:10,
    fontSize: size.subtitle,textTransform:"uppercase",
    fontFamily: fontfamily.bold },
    textCell:{
        padding:10,
        fontSize: size.label,textTransform:"uppercase",
        fontFamily: fontfamily.regular
    },
    center:{
        flex:1,
        // justifyContent:"center",
        // alignItems:"center"
    },
    yesbtn:{
        backgroundColor:colors.success,
        alignItems:"center",
        justifyContent:"center",
        padding:15
    },
    nobtn:{
        backgroundColor:colors.dangerlight,
        alignItems:"center",
        justifyContent:"center",
        padding:15
    },
    btnText: { textAlign: 'center', color: '#000' , fontSize: size.subtitle,
    fontFamily: fontfamily.regular,},
    btnsty:{
        padding:10,
        borderRadius:5,
        borderColor:"#000",
        borderWidth:2,
        justifyContent:"center",
        alignItems:"center",
        width:100,
        marginTop:20
    }
})

export default styles;