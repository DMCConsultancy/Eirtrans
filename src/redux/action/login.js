import {type} from '../types';

export const getLogin = () => {
    return {
      type: type.GET_LOGIN
    }
  }
  
  export const setLogin = (data) => {
    return {
      type: type.SET_LOGIN,
      payload: data
    }
  }

  export const loginError = (error) => {
    return {
      type: type.ERROR_LOGIN,
      payload: error
    }
  }