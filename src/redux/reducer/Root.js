import { combineReducers } from "redux";
import allDriverReducer from './alldriver';
import connectivityReducer from './connectivity';
import truckDetailReducer from './truckdetail';
import allItemsReducer from "./allItem";
import loginReducer from "./login";
import createMorningReducer from "./createmorningaccepted";
import SelectedTruckDetailReducer from "./selectedtruckdetail";
import getMorningReducer from "./setmorningdata";

export default combineReducers({
    allDriver : allDriverReducer,
    netConnection : connectivityReducer,
    truckDetail : truckDetailReducer,
    allItems : allItemsReducer,
    login : loginReducer,
    createMorning : createMorningReducer,
    SelectedTruckDetail : SelectedTruckDetailReducer,
    getMorning : getMorningReducer
})