/**
 * @format
 */

import {AppRegistry,LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from "react-redux";
import React from "react";
import {store,persistor} from './src/redux/store/Store';
import {PersistGate} from 'redux-persist/integration/react';

LogBox.ignoreAllLogs(true);

class MyApp extends React.Component{
    render(){
        return(
          <Provider store={store}>
             <PersistGate loading={null} persistor={persistor}>
          <App />
          </PersistGate>
        </Provider>
        )
      }
}    

AppRegistry.registerComponent(appName, () => MyApp);
