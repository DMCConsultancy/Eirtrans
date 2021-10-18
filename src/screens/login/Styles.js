import { StyleSheet, Dimensions } from "react-native";
var { width } = Dimensions.get('window');

import { colors, size, fontfamily } from "../../global/globalStyle";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        padding: 20,
    },
    logo: {
        width: width * 0.8,
        height: width * 0.4, 
        resizeMode: "contain"
    },
    center: {
        justifyContent: "center",
        alignItems: "center"
    },
    pickersty: {
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 4,
        marginTop: 40,
        height: 45
    },
    input: {
        backgroundColor: "#666",
        height: 45,
        color: "#ffff",
        fontSize: size.subtitle,
        fontFamily: fontfamily.regular,
        paddingHorizontal: 10,
        marginTop: 40,
        borderRadius: 4,
    },
    overlay: {
        // ...StyleSheet.absoluteFillObject,
        // backgroundColor: 'rgba(69,85,117,0.7)',
        //  backgroundColor: 'rgba(255,255,255,0.2)'
    },
    mt: {
        marginTop: 90
    }
})

export default styles;