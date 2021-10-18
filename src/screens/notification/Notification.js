import React,{Component} from "react";
import { Text,View,Button } from "react-native";

export default class Notification extends Component{
    render(){
        return(
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                <Text>notification screen</Text>
                <Button title="go back to home" onPress={()=>{this.props.navigation.navigate('Home')}} />
            </View>

        )
    }
}