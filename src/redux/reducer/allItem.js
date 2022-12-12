import {type} from '../types';

const initialState = {
    data: [],
    error: "",
    loading: false
};

const allItemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.GET_ALLITEMS:
            return {
                data: [],
                loading: true,
                error: "",
            };

        case type.SET_ALLITEMS:
          
            return {
                data: action.payload,
                error: "",
                loading: false,
            };

        case type.ERROR_ALLITEMS:
            return {
                data: [],
                error: action.payload,
                loading: false,
            };
        default:
            return state;
    }
}

export default allItemsReducer;