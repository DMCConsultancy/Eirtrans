import React,{Component} from "react";
import { Text,View,Button,TouchableOpacity, FlatList } from "react-native";
import { Container, Header,Left,Right, Card, CardItem } from "native-base";
import  Icon  from "react-native-vector-icons/Feather";
import styles from "./Styles";

export default class Notification extends Component{
    constructor(props){
        super(props);
        this.state={
           data:data
        }
    }

    render(){
        return(
          <Container style={styles.container}>
              <Header style={styles.headersty}>
                    <Left>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Notification")} >
                            <Icon name="arrow-left" size={22} color="#000" />
                        </TouchableOpacity>
                    </Left>
                  <Right/>
              </Header>

              <View style={styles.content}>
              <Card style={styles.crdsty}>
                <CardItem style={styles.crdsty}>
                    <Left>
                        <Text style={styles.title}>New Load assign successfully.</Text>
                    </Left>
                    <Right>
                            <Text style={styles.date}>2021-07-22 08:04:41</Text>
                    </Right>
                </CardItem>
               
            </Card>
                 
              </View>
          </Container>

        )
    }
}

const data=[
    {text:"", date:"2021-07-22 08:04:41"},
    {text:"New Load assign successfully.", date:""}
]