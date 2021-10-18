import { StyleSheet,Platform ,Dimensions} from "react-native";
import { fontfamily, size } from "../../global/globalStyle";
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
        fontSize: size.label,
        fontFamily: fontfamily.medium,
        color:"#000"
    },
    logo: {
        width: width * 0.8,
        height: width * 0.4,
        resizeMode: "contain",
        marginTop: 20
    },
    center: {
        justifyContent: "center",
        alignItems: "center"
    },
    borderStyle:{ borderColor: '#000', borderWidth: 2 },
    head: {  backgroundColor: '#fff',},
    text: { padding:3,
    fontSize: size.label,textTransform:"uppercase",
    fontFamily: fontfamily.bold },
    textCell:{
        padding:3,textAlign:"center",
        fontSize: size.label,textTransform:"capitalize",
        fontFamily: fontfamily.regular
    },
    row: { 
        flexDirection: 'row', 
        backgroundColor: '#FFF', 
    },
    btn: { width: 58,  backgroundColor: '#78B7BB',  borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#000' , fontSize: size.label,
    fontFamily: fontfamily.regular,},
})

export default styles;