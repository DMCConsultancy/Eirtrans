import cloneDeep from 'lodash.clonedeep';
import {type} from '../types';

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
 * 1 => load collected
 *
 * 1.5 => shipping address
 *
 * 2 => delivered
 *
 * 3 => screenshot sent
 *
 * 4 => all delivered
 *
 * 5 => signature
 *
 * 6 => load delivered
 */

const INITIAL_STATE = [];

const jobStaus = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case type.JOB_COMPLETED:
      const clonedState_JOB_COMPLETED = cloneDeep(state);

      clonedState_JOB_COMPLETED.push(action.payload);

      return clonedState_JOB_COMPLETED;

    // ==============================

    case type.JOB_FOUND_SHIPPING_ADDRESS:
      const clonedState_JOB_FOUND_SHIPPING_ADDRESS = cloneDeep(state);

      const updatedState_JOB_FOUND_SHIPPING_ADDRESS =
        clonedState_JOB_FOUND_SHIPPING_ADDRESS.map(ele => {
          const clonedEle = {...ele};

          // console.log({inReducer: action.loadId});

          // complete loads of only current load
          if (clonedEle.load_id === action.loadId) {
            clonedEle.status = 1.5;
          }

          return clonedEle;
        });

      return updatedState_JOB_FOUND_SHIPPING_ADDRESS;

    // ===================================

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
          const clonedEle = {...ele};

          console.log({inReducer: action.loadId});

          // complete loads of only current load
          if (clonedEle.load_id === action.loadId) {
            clonedEle.status = 1;
          }

          return clonedEle;
        });

      return updatedState_JOB_LOAD_COMPLETED;

    // ==============================

    case type.JOB_ALL_DELIVERED:
      const clonedState_JOB_ALL_DELIVERED = cloneDeep(state);

      const updatedState_JOB_ALL_DELIVERED = clonedState_JOB_ALL_DELIVERED.map(
        ele => {
          const clonedEle = {...ele};

          // console.log({inReducer: action.loadId});

          // complete loads of only current load
          if (clonedEle.load_id === action.loadId) {
            clonedEle.status = 4;
          }

          return clonedEle;
        },
      );

      return updatedState_JOB_ALL_DELIVERED;

    // ==============================

    case type.JOB_SIGNATURE:
      const clonedState_JOB_SIGNATURE = cloneDeep(state);

      const updatedState_JOB_SIGNATURE = clonedState_JOB_SIGNATURE.map(ele => {
        const clonedEle = {...ele};

        // console.log({inReducer: action.loadId});

        // complete loads of only current load
        if (clonedEle.load_id === action.loadId) {
          clonedEle.status = 5;
        }

        return clonedEle;
      });

      return updatedState_JOB_SIGNATURE;

    // ============================

    case type.JOB_LOAD_DELIVERED:
      const clonedState_JOB_LOAD_DELIVERED = cloneDeep(state);

      const updatedState_JOB_LOAD_DELIVERED =
        clonedState_JOB_LOAD_DELIVERED.map(ele => {
          const clonedEle = {...ele};

          // console.log({inReducer: action.loadId});

          // complete loads of only current load
          if (clonedEle.load_id === action.loadId) {
            clonedEle.status = 6;
          }

          return clonedEle;
        });

      return updatedState_JOB_LOAD_DELIVERED;

    // ============================

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
