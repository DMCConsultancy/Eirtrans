import {type} from '../types';

const initialState = {
    data: undefined,
    error: "",
    loading: false
};

const SelectedTruckDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.GET_SELECTEDTRUCKDETAIL:
            return {
                data: undefined,
                loading: true,
                error: "",
            };

        case type.SET_SELECTEDTRUCKDETAIL:
            
            return {
                data: action.payload,
                error: "",
                loading: false,
            };

        case type.ERROR_SELECTEDTRUCKDETAIL:
            return {
                data: undefined,
                error: action.payload,
                loading: false,
            };
        default:
            return state;
    }
}

export default SelectedTruckDetailReducer;