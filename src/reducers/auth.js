import {
    USER_LOGIN,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_REJECT
} from '../actions/types';

const initialState = {
    user: {},
    isError: false,
    error: null,
    isLoadingUser: true
};

export default (state = initialState, { type, user, error }) => {
    switch (type) {
        case USER_LOGIN:
            return {
                ...state,
                user: {},
                isLoadingUser: true,
                isError: false,
                error: null
            };
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoadingUser: false,
                isError: false,
                error: null,
                user
            };
        case USER_LOGIN_REJECT:

            return {
                ...state,
                isLoadingUser: true,
                isError: true,
                user: {},
                error
            };
        default:
            return state;
    }
};
