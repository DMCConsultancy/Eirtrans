import {type} from '../types';

const initialState = {
    data: [],
    error: "",
    loading: false
};

const truckDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.GET_TRUCKDETAIL:
            return {
                data: [],
                loading: true,
                error: "",
            };

        case type.SET_TRUCKDETAIL:
            return {
                data: action.payload,
                error: "",
                loading: false,
            };

        case type.ERROR_TRUCKDETAIL:
            return {
                data: [],
                error: action.payload,
                loading: false,
            };
        default:
            return state;
    }
}

export default truckDetailReducer;