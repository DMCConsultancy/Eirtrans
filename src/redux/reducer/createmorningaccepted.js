import {type} from '../types';

const initialState = {
    data: [],
    error: "",
    loading: false
};

const createMorningReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.GET_CREATEMORNINGACCEPTED:
            return {
                data: [],
                loading: true,
                error: "",
            };

        case type.SET_CREATEMORNINGACCEPTED:
            return {
                data: action.payload,
                error: "",
                loading: false,
            };

        case type.ERROR_CREATEMORNINGACCEPTED:
            return {
                data: [],
                error: action.payload,
                loading: false,
            };
        default:
            return state;
    }
}

export default createMorningReducer;