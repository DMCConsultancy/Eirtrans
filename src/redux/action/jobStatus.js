import {type} from '../types';

export const setJobStatusCompleted = payload => {
  return {
    type: type.JOB_COMPLETED,
    payload,
  };
};

export const setJobFoundShipping = loadId => {
  return {
    type: type.JOB_FOUND_SHIPPING_ADDRESS,
    loadId,
  };
};

export const setJobStatusLoadCompleted = loadId => {
  return {
    type: type.JOB_LOAD_COMPLETED,
    loadId,
  };
};

export const setJobStatusAllDelivered = loadId => {
  return {
    type: type.JOB_ALL_DELIVERED,
    loadId,
  };
};

export const setJobStatusSignature = loadId => {
  return {
    type: type.JOB_SIGNATURE,
    loadId,
  };
};

export const setJobStatusLoadDelivered = loadId => {
  return {
    type: type.JOB_LOAD_DELIVERED,
    loadId,
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

export const setJobStatusNotCollected = payload => {
  return {
    type: type.JOB_NOT_COLLECTED,
    payload,
  };
};
