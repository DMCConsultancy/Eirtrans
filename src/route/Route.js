import {Dimensions} from "react-native";
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import Home from "../screens/home/Home";
import Login from "../screens/login/Login";
import Notification from "../screens/notification/Notification";
import Expenses from "../screens/expenses/Expenses";
import About from "../screens/about/About";
import Terms from "../screens/t&c/Terms";
import Contact from "../screens/contact/Contact";
import Morning from "../screens/morning/Morning";
import Job from "../screens/job/Job";
import HomeExpenses from "../screens/homeEx/HomeExpenses";
import CustomSidebarMenu from "./CustomSidebarMenu";
import Testdetails from "../screens/testdetail/Testdetails";

const HomeStack = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions:{
            headerShown:false
        }
    },
    Morning: {
        screen: Morning,
        navigationOptions:{
          headerShown:false
      }
    },
    Job: {
        screen: Job,
        navigationOptions:{
          headerShown:false
      }
    },
    Testdetails:{
    screen:Testdetails,
    navigationOptions:{
      headerShown:false
  }
    },

    HomeExpenses: {
        screen: HomeExpenses,
    },
   
})

const DrawerNavigator = createDrawerNavigator({
    Home: {
        screen: HomeStack,
      },
      Notification: {
        screen: Notification,
      },
      Expenses: {
        screen: Expenses,
      },
      Contact: {
        screen: Contact,
      },
      About: {
        screen: About,
      },
      Terms: {
        screen: Terms,
      },

      Logout: {
        screen: Login,
      },
      
},
{
      contentComponent: CustomSidebarMenu,
    drawerWidth: Dimensions.get('window').width - 100,
  })


const SwitchNavigator = createSwitchNavigator({
    Login: {
        screen: Login,
      },

    Dashboard :{ 
        screen: DrawerNavigator,
    },  
})

export default createAppContainer(SwitchNavigator);