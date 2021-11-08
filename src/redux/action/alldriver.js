import {type} from '../types';

export const getDriver = () => {
    return {
      type: type.GET_DRIVER
    }
  }
  
  export const setDriver = (data) => {
    return {
      type: type.SET_DRIVER,
      payload: data
    }
  }

  export const driverError = (error) => {
    return {
      type: type.ERROR_DRIVER,
      payload: error
    }
  }