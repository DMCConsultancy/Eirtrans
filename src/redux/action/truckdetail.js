import {type} from '../types';

export const getTruckDetail = () => {
    return {
      type: type.GET_TRUCKDETAIL
    }
  }
  
  export const setTruckDetail = (data) => {
    return {
      type: type.SET_TRUCKDETAIL,
      payload: data
    }
  }

  export const TruckDetailError = (error) => {
    return {
      type: type.ERROR_TRUCKDETAIL,
      payload: error
    }
  }