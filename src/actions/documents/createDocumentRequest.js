import axios from 'axios/index';
import {
    CREATE_DOCUMENT_REQUEST,
    CREATE_DOCUMENT_REQUEST_REJECT,
    CREATE_DOCUMENT_REQUEST_SUCCESS,
    HIDE_DOCUMENT_REQUEST_ERROR
} from '../types';

const uuid = require('uuid/v1');

export const createDocumentRequest = request => (dispatch, getState) => {
    dispatch({ type: CREATE_DOCUMENT_REQUEST });
    const { settings } = getState();
    return axios({
        method: 'post',
        url: `${settings.contextRoot}/api/createDocumentRequest`,
        headers: {
            'request-id': uuid(),
            'content-type': 'application/json'
        },
        data: request
    }).then(
        (result) => {
            dispatch({
                type: CREATE_DOCUMENT_REQUEST_SUCCESS,
                payload: result.data
            });
        }
    ).catch(
        (error) => {
            dispatch({
                type: CREATE_DOCUMENT_REQUEST_REJECT,
                payload: error.config.headers['request-id']
            });
        }
    );
};

export const hideDocumentRequestError = () => (dispatch) => {
    dispatch({ type: HIDE_DOCUMENT_REQUEST_ERROR });
};

export default createDocumentRequest;
