import cloneDeep from 'lodash.clonedeep';
import {type} from '../types';

/**
 * notCollected will track not collected jobs
 *
 *
 * each element will contain :
 *
 * {
 *    job_id: number,
 *    load_id: number,
 *    name: string,
 *    reason: string,
 *    imgUri: string
 * }
 *
 */

const INITIAL_STATE = [];

const notCollected = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case type.NOT_COLLECTED_ADD_JOB:
      const clonedState_NOT_COLLECTED_ADD_JOB = cloneDeep(state);

      clonedState_NOT_COLLECTED_ADD_JOB.push(action.payload);

      return clonedState_NOT_COLLECTED_ADD_JOB;

    default:
      return state;
  }
};

export default notCollected;
