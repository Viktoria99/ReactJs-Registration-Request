import {
    GET_DOCUMENTS_REJECT,
    GET_DOCUMENTS_SUCCESS,
    GET_DOCUMENTS,
    GET_DOCUMENTS_UNSUCCESS,
    SET_REQUEST_ID,
    CREATE_DOCUMENT_REQUEST,
    CREATE_DOCUMENT_REQUEST_SUCCESS,
    CREATE_DOCUMENT_REQUEST_REJECT,
    HIDE_DOCUMENT_REQUEST_ERROR
} from '../../actions/types';

const initialState = {
    isFetching: false,
    isError: false,
    error: null,
    productInfo: {},
    requestId: '',
    isFetchingCreation: false,
    isErrorCreation: false,
    errorCreation: null,
    requestResult: {}
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_REQUEST_ID:
            return {
                ...state, isFetching: false, isError: false, requestId: payload
            };

        case GET_DOCUMENTS:
            return {
                ...state,
                isFetching: true,
                isError: false,
                productInfo: {},
                isErrorCreation: null,
                errorCreation: null,
                requestResult: {},
                businessError: {}
            };

        case GET_DOCUMENTS_SUCCESS:
            return {
                ...state, productInfo: payload, isFetching: false, isError: false, businessError: null
            };

        case GET_DOCUMENTS_REJECT:
            return {
                ...state, isFetching: false, isError: true, error: payload, productInfo: {}
            };
        case GET_DOCUMENTS_UNSUCCESS:
            return {
                ...state, isFetching: false, isError: true, businessError: payload, productInfo: {}
            };
        case CREATE_DOCUMENT_REQUEST:
            return {
                ...state, isFetchingCreation: true, isErrorCreation: false, requestResult: {}
            };

        case CREATE_DOCUMENT_REQUEST_SUCCESS:
            return {
                ...state, requestResult: payload, isFetchingCreation: false, isErrorCreation: false
            };

        case CREATE_DOCUMENT_REQUEST_REJECT:
            return {
                ...state, isFetchingCreation: false, isErrorCreation: true, errorCreation: payload, requestResult: {}
            };

        case HIDE_DOCUMENT_REQUEST_ERROR:
            return {
                ...state, isFetchingCreation: false, isErrorCreation: false, requestResult: {}
            };
        default:
            return state;
    }
};
