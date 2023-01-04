import axios from 'axios';

export const getApi = async api => {
  return new Promise((resolve, reject) => {
    axios(api)
      .then(resolve)
      .catch(err => {
        reject(err.response);
        handleAuthorization(err.response?.status);
      });
  });
};

export const postApi = async (api, data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(api, data)
      .then(resolve)
      .catch(err => {
        reject(err.response);
        handleAuthorization(err.response?.status);
      });
  });
};

export const uploadApi = async (api, data) => {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };
     console.log({api, data})
    return new Promise((resolve, reject) => {
      axios
        .post(api, data, config)
        .then(resolve)
        .catch(err => {
          reject(err.response);
          handleAuthorization(err.response?.status);
        });
    });
  };


  const handleAuthorization = status => {
    if (status !== 401) return;
  };