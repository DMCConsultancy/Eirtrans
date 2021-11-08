import {type} from '../types';

export const getSelectedTruckDetail = () => {
    return {
      type: type.GET_SELECTEDTRUCKDETAIL
    }
  }
  
  export const setSelectedTruckDetail = (data) => {
    return {
      type: type.SET_SELECTEDTRUCKDETAIL,
      payload: data
    }
  }

  export const SelectedTruckDetailError = (error) => {
    return {
      type: type.ERROR_SELECTEDTRUCKDETAIL,
      payload: error
    }
  }