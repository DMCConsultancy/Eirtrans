import {type} from '../types';

const initialState = {
    data: [],
    error: "",
    loading: false
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.GET_LOGIN:
            return {
                data: [],
                loading: true,
                error: "",
            };

        case type.SET_LOGIN:
            
            return {
                data: action.payload,
                error: "",
                loading: false,
            };

        case type.ERROR_LOGIN:
            return {
                data: [],
                error: action.payload,
                loading: false,
            };
        default:
            return state;
    }
}

export default loginReducer;