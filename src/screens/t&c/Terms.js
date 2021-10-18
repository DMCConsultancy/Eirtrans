import React,{Component} from "react";
import { Text,View } from "native-base";

export default class Route extends Component{
    render(){
        return(
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                <Text>T&C screen</Text>
            </View>

        )
    }
}