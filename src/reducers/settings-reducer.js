import {
    GET_CREDENTIALS,
    GET_CREDENTIALS_REJECT,
    GET_CREDENTIALS_SUCCESS
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case GET_CREDENTIALS:
            return {
                ...state
            };
        case GET_CREDENTIALS_SUCCESS:
            return {
                ...state,
                credentials: action.payload
            };
        case GET_CREDENTIALS_REJECT:
            return {
                ...state,
                isLoadingUser: true,
                isError: true
            };
        default:
            return state;
    }
};
