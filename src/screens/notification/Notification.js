import React,{Component} from "react";
import { Text,View,Button,TouchableOpacity, FlatList, Image } from "react-native";
import { Container, Header,Left,Right, Card, CardItem } from "native-base";
import  Icon  from "react-native-vector-icons/Feather";
import styles from "./Styles";
import { images } from "../../global/globalStyle";

export default class Notification extends Component{
    constructor(props){
        super(props);
        this.state={
           data:data
        }
    }

    renderItem = ({ item }) => {
        return (
            <Card>
                <CardItem>
                    <Left>
                        <Text style={styles.title}>{item.text}</Text>
                    </Left>
                    <Right>
                            <Text style={styles.date}>{item.date}</Text>
                    </Right>
                </CardItem>
                <CardItem>
                    <Left>
                      
                    </Left>
                    <Right>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('NotificationDetail')} >
                            <Text style={styles.moretxt}>View More</Text>
                        </TouchableOpacity>
                    </Right>
                </CardItem>
            </Card>
        )
    }

    render(){
        return(
          <Container style={styles.container}>
              <Header style={styles.headersty}>
                    <Left>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")} >
                        <Image source={images.arrow} style={styles.arrow} tintColor={'grey'}/>
                        </TouchableOpacity>
                    </Left>
                  <Right/>
              </Header>

              <View style={styles.content}>
                 
                  <FlatList  
                   data={this.state.data}
                   renderItem={this.renderItem}
                   keyExtractor={item => item._id}
                   ListEmptyComponent={this.EmptyListMessage}
                   ListHeaderComponent={this.FlatListHeader} />
              </View>
          </Container>

        )
    }
}

const data=[
    {text:"New Load assign successfully.", date:"2021-07-22 08:04:41"},
    {text:"New Load assign successfully.", date:"2021-07-22 08:04:41"}
]