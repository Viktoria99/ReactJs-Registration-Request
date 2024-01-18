import {
    GET_DOCUMENT_FILE_STARTED,
    GET_DOCUMENT_FILE_SUCCESS,
    GET_DOCUMENT_FILE_FAILED
} from '../../actions/types';

const initialState = {
    isFetching: false,
    isError: false,
    error: null
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_DOCUMENT_FILE_STARTED:
            return {
                ...state, isFetching: true, isError: false, error: null
            };

        case GET_DOCUMENT_FILE_SUCCESS:
            return {
                ...state, isFetching: false, isError: false, error: null
            };

        case GET_DOCUMENT_FILE_FAILED:
            return {
                ...state, isFetching: false, isError: true, error: payload
            };
        default:
            return state;
    }
};
