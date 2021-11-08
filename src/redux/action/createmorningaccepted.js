import {type} from '../types';

export const getCreateMorning = () => {
    return {
      type: type.GET_CREATEMORNINGACCEPTED
    }
  }
  
  export const setCreateMorning = (data) => {
   
    return {
      type: type.SET_CREATEMORNINGACCEPTED,
      payload: data
    }
  }

  export const createMorningError = (error) => {
    return {
      type: type.ERROR_CREATEMORNINGACCEPTED,
      payload: error
    }
  }