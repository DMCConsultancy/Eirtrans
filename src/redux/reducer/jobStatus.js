import cloneDeep from 'lodash.clonedeep';
import {type} from '../types';

cloneDeep;

/**
 * jobStatus will track status of jobs as the job collection progress jobStatus
 * is changed to some partuclar status explain below:
 *
 * each element will contain :
 *
 * {
 *    job_id: number,
 *    load_id: number,
 *    status: code:number,
 * }
 *
 * codes :
 *
 * 0 => collected
 *
 * 1 => delivered
 *
 * 2 => load collected
 *
 * 3 => screenshot sent
 *
 */

const INITIAL_STATE = [];

const jobStaus = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case type.JOB_COMPLETED:
      const clonedState_JOB_COMPLETED = cloneDeep(state);

      clonedState_JOB_COMPLETED.push(action.payload);

      return clonedState_JOB_COMPLETED;

    // ==============================

    case type.JOB_DELIVERED:
      const clonedState_JOB_DELIVERED = cloneDeep(state);

      const {payload} = action;

      const updatedState = clonedState_JOB_DELIVERED.map(ele => {
        if (ele.job_id === payload.job_id && ele.load_id === payload.load_id) {
          const clonedEle = {...ele};

          clonedEle.status = 2;

          return clonedEle;
        }

        return ele;
      });

      return updatedState;

    // ============================

    case type.JOB_LOAD_COMPLETED:
      const clonedState_JOB_LOAD_COMPLETED = cloneDeep(state);

      const updatedState_JOB_LOAD_COMPLETED =
        clonedState_JOB_LOAD_COMPLETED.map(ele => {
          if (
            ele.job_id === action.payload.job_id &&
            ele.load_id === action.payload.load_id
          ) {
            const clonedEle = {...ele};

            clonedEle.status = 1;

            return clonedEle;
          }

          return ele;
        });

      return updatedState_JOB_LOAD_COMPLETED;

    case type.JOB_FINAL_TRUCK_SCREENSHOT:
      const clonedState_JOB_FINAL_TRUCK_SCREENSHOT = cloneDeep(state);

      const updatedState_JOB_FINAL_TRUCK_SCREENSHOT =
        clonedState_JOB_FINAL_TRUCK_SCREENSHOT.map(ele => {
          const clonedEle = {...ele};

          clonedEle.status = 3;

          return clonedEle;
        });

      return updatedState_JOB_FINAL_TRUCK_SCREENSHOT;

    default:
      return state;
  }
};

export default jobStaus;
