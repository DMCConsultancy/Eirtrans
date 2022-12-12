import cloneDeep from 'lodash.clonedeep';
import {type} from '../types';

/**
 * signature will save signatures of the delivery
 *
 * each element will contain :
 *
 * {
 *    load_id: number,
 *    image: string<url>,
 *    name: string,
 * }

 */

const INITIAL_STATE = [];

const signature = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case type.SIGNATURE_ADD:
      const clonedState_SIGNATURE_ADD = cloneDeep(state);

      clonedState_SIGNATURE_ADD.push(action.payload);

      return clonedState_SIGNATURE_ADD;

    // ==============================

    case type.SIGNATURE_REMOVE:
      const clonedState_SIGNATURE_REMOVE = cloneDeep(state);

      const updatedState_SIGNATURE_REMOVE = clonedState_SIGNATURE_REMOVE.filter(
        ele => ele.load_id !== action.loadId,
      );

      return updatedState_SIGNATURE_REMOVE;

    default:
      return state;
  }
};

export default signature;
