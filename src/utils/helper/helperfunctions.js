export const getPickerImageResp = (res) => {
    const respArr = res?.assets;
    const imgResp = respArr?.length ? respArr[0] : null;
  
    if (imgResp) {
      return {
        name: imgResp.fileName,
        type: imgResp.type,
        uri: imgResp.uri,
      };
    }
  
    return false;
  };

  export const errorRes = (response) => {
    const {status, data} = response;
    console.log({errordata: data});
  
    if (status === 400) {
      throw `Bad request`;
    }
  
    if (status === 404) {
      throw `NOT FOUND`;
    }
  
    if (status === 403) {
      throw `FORBIDDEN`;
    }
  
    if (status === 500) {
      throw `Internal server error`;
    }
  
    if (status === 204) {
      throw `NO CONTENT`;
    }
  
    if (status === 401) {
      throw `unauthorise`;
    }
  
    if (status === 0) {
      throw `Network Error`;
    }
  };
  