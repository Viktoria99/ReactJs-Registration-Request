import {
    GET_DOCUMENT_REQUEST_DETAILS,
    UPDATE_DOCUMENT_REQUEST_DETAILS,
    GET_DOCUMENT_REQUEST_DETAILS_SUCCESS,
    GET_DOCUMENT_REQUEST_DETAILS_REJECT,
    RESTART_DOCUMENT_REQUEST,
    RESTART_DOCUMENT_REQUEST_SUCCESS,
    RESTART_DOCUMENT_REQUEST_REJECT,
    UPDATE_DOCUMENT_REQUEST_DETAILS_SUCCESS,
    UPDATE_DOCUMENT_REQUEST_DETAILS_REJECT
} from '../../actions/types';

const initialState = {
    isFetching: false,
    isError: false,
    error: null,
    documentDetails: null,
    requested: false,
    updateTime: 0,
    isUpdating: false
};

const documentRequestDetails = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_DOCUMENT_REQUEST_DETAILS:
            return {
                ...state,
                isFetching: true,
                requested: false,
                error: null,
                isError: false
            };
        case GET_DOCUMENT_REQUEST_DETAILS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                documentRequestDetails: payload,
                requested: true,
                error: null,
                isError: false
            };
        case GET_DOCUMENT_REQUEST_DETAILS_REJECT:
            return {
                ...state,
                isFetching: false,
                requested: false,
                error: payload,
                isError: true
            };
        case UPDATE_DOCUMENT_REQUEST_DETAILS:
            return {
                ...state,
                requested: false,
                error: null,
                isError: false
            };
        case UPDATE_DOCUMENT_REQUEST_DETAILS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                documentRequestDetails: payload,
                error: null,
                isError: false
            };
        case UPDATE_DOCUMENT_REQUEST_DETAILS_REJECT:
            return {
                ...state,
                isFetching: false,
                error: payload,
                isError: true
            };
        case RESTART_DOCUMENT_REQUEST:
            return {
                ...state,
                isFetchingRestart: true,
                errorRestart: null,
                isErrorRestart: false
            };
        case RESTART_DOCUMENT_REQUEST_SUCCESS:
            return {
                ...state,
                isFetchingRestart: false,
                requestRestartDetails: payload,
                errorRestart: null,
                isErrorRestart: false
            };
        case RESTART_DOCUMENT_REQUEST_REJECT:
            return {
                ...state,
                isFetchingRestart: false,
                errorRestart: payload,
                isErrorRestart: true
            };
        default:
            return state;
    }
};

export default documentRequestDetails;
