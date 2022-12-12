import { type } from '../types';

const initialState = {
    data: null,
    error: "",
    loading: false
};

const getMorningReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.GET_MORNINGDATA:
            return {
                data: null,
                loading: true,
                error: "",
            };


        case type.ERROR_MORNINGDATA:
            return {
                error: action.payload,
                loading: false,
                data: null
            };

        case type.UPDATE_MORNINGDATA:
            // console.log("action", action.payload)
            return {
                data: action.payload ,
                error: "",
                loading: false,
            };

        case type.CLEAR_MORNINGDATA:
            return {
                data:null,
                error: "",
                loading: false,
            }

        default:
            return state;
    }
}

export default getMorningReducer;
