import {combineReducers} from 'redux';
import allDriverReducer from './alldriver';
import connectivityReducer from './connectivity';
import truckDetailReducer from './truckdetail';
import allItemsReducer from './allItem';
import loginReducer from './login';
import createMorningReducer from './createmorningaccepted';
import SelectedTruckDetailReducer from './selectedtruckdetail';
import getMorningReducer from './setmorningdata';
import jobStatus from './jobStatus';
import signature from './signature';
import notCollected from './notCollected';

export default combineReducers({
  allDriver: allDriverReducer,
  netConnection: connectivityReducer,
  truckDetail: truckDetailReducer,
  allItems: allItemsReducer,
  login: loginReducer,
  createMorning: createMorningReducer,
  SelectedTruckDetail: SelectedTruckDetailReducer,
  getMorning: getMorningReducer,
  jobStatus,
  signature,
  notCollected,
});
