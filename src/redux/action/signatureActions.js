import {type} from '../types';

export const addLoadSignature = payload => {
  return {
    type: type.SIGNATURE_ADD,
    payload,
  };
};

export const removeLoadSignature = loadId => {
  return {
    type: type.SIGNATURE_REMOVE,
    loadId,
  };
};