import {type} from '../types';
import { Platform } from 'react-native';
import NetInfo from "@react-native-community/netinfo";

export const getConnection = () => {
    return {
      type: type.GET_CONNECTION
    }
  }
  
  export const setConnection = (data) => {
    return {
      type: type.SET_CONNECTION,
      payload: data
    }
  }

  export const connectionError = (error) => {
    return {
      type: type.ERROR_CONNECTION,
      payload: error
    }
  }

  export const checkConnectivity = () => {
    return async (dispatch) => {
      if (Platform.OS == 'android') {
        dispatch(getConnection())
          NetInfo.fetch().then(state => {
              console.log("Connection type", state.type);
              console.log("Is connected?", state.isConnected);
              if (state.isConnected == true) {
                //   alert(state.isConnected)
                  dispatch(setConnection(state.isConnected))
              } else {
                  // alert("You are offline!");
                  dispatch(connectionError(state.isConnected))
              }
          });
      }
    }
  }