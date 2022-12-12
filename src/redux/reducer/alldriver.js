import {type} from '../types';

const initialState = {
    data: [],
    error: "",
    loading: false
};

const allDriverReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.GET_DRIVER:
            return {
                data: [],
                loading: true,
                error: "",
            };

        case type.SET_DRIVER:
            
            return {
                data: action.payload,
                error: "",
                loading: false,
            };

        case type.ERROR_DRIVER:
            return {
                data: [],
                error: action.payload,
                loading: false,
            };
        default:
            return state;
    }
}

export default allDriverReducer;