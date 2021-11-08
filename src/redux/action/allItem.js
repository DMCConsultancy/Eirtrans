import {type} from '../types';

export const getAllItems = () => {
    return {
      type: type.GET_ALLITEMS
    }
  }
  
  export const setAllItems = (data) => {
   
    return {
      type: type.SET_ALLITEMS,
      payload: data
    }
  }

  export const AllItemsError = (error) => {
    return {
      type: type.ERROR_ALLITEMS,
      payload: error
    }
  }