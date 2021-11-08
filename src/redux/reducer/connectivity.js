import {type} from '../types';

const initialState = {
    data: null,
    error: "",
    loading: false
};

const connectivityReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.GET_CONNECTION:
            return {
                data: null,
                loading: true,
                error: "",
            };

        case type.SET_CONNECTION:
            return {
                data: action.payload,
                error: "",
                loading: false,
            };

        case type.ERROR_CONNECTION:
            return {
                data: action.payload,
                error: action.payload,
                loading: false,
            };
        default:
            return state;
    }
}

export default connectivityReducer;