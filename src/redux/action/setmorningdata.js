import {type} from '../types';

export const getMorningData = () => {
    return {
      type: type.GET_MORNINGDATA
    }
  }
  
  export const setMorningData = (data) => {
      // console.log("action",data)
    return {
      type: type.UPDATE_MORNINGDATA,
      payload: data
    }
  }

  export const MorningDataError = (error) => {
    return {
      type: type.ERROR_MORNINGDATA,
      payload: error
    }
  }

  export const MorningDataclear = () => {
    return {
      type: type.CLEAR_MORNINGDATA,
      payload: {}
    }
  }