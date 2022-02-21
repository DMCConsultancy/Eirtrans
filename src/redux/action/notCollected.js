import {type} from '../types';

export const setNotCollected = payload => {
  return {
    type: type.NOT_COLLECTED_ADD_JOB,
    payload,
  };
};
