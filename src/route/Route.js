import { Dimensions } from "react-native";
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
import Truckdetail from "../screens/truckdetail/Truckdetail";
import Cars from "../screens/car/Cars";
import Description from "../screens/description/Description";
import Customerdetail from "../screens/customerdetail/Customerdetail";
import NotificationDetail from "../screens/notification/NotificationDetail";
import ViewImage from "../screens/expenses/ViewImage";


const Notification_stack = createStackNavigator({
  Notification:{
    screen:Notification,
    navigationOptions:{
      headerShown:false
    }
  },
  NotificationDetail:{
    screen:NotificationDetail,
    navigationOptions:{
      headerShown:false
    }
  },
})

const Expenses_stack = createStackNavigator({
  Expenses:{
    screen:Expenses,
    navigationOptions:{
      headerShown:false
    }
  },
  ViewImage:{
    screen:ViewImage,
    navigationOptions:{
      headerShown:false
    }
  },
})

const HomeStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerShown: false
    }
  },
  Morning: {
    screen: Morning,
    navigationOptions: {
      headerShown: false
    }
  },
  Job: {
    screen: Job,
    navigationOptions: {
      headerShown: false
    }
  },
  Testdetails: {
    screen: Testdetails,
    navigationOptions: {
      headerShown: false
    }
  },

  Truckdetail: {
    screen: Truckdetail,
    navigationOptions: {
      headerShown: false
    }
  },

  Cars: {
    screen: Cars,
    navigationOptions: {
      headerShown: false
    }
  },

  Description:{
    screen:Description,
    navigationOptions:{
      headerShown:false
    }
  },
  Customerdetail:{
    screen:Customerdetail,
    navigationOptions:{
      headerShown:false
    }
  },

 

  HomeExpenses: {
    screen: HomeExpenses,
    navigationOptions:{
      headerShown:false
    }
  },

})

const DrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeStack,
  },
  Notification: {
    screen: Notification_stack,
  },
  Expenses: {
    screen: Expenses_stack,
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

  Dashboard: {
    screen: DrawerNavigator,
  },
})

export default createAppContainer(SwitchNavigator);