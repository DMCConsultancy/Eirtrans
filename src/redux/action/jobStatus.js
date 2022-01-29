import {type} from '../types';

export const setJobStatusCompleted = payload => {
  return {
    type: type.JOB_COMPLETED,
    payload,
  };
};

export const setJobStatusLoadCompleted = payload => {
  return {
    type: type.JOB_LOAD_COMPLETED,
    payload,
  };
};

export const setJobStatusDelivered = payload => {
  return {
    type: type.JOB_DELIVERED,
    payload,
  };
};

export const setJobStatusFinalTruckScreenshot = () => {
  return {
    type: type.JOB_FINAL_TRUCK_SCREENSHOT,
  };
};
