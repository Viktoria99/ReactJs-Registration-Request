import axios from 'axios/index';
import {
    GET_DOCUMENTS,
    GET_DOCUMENTS_SUCCESS,
    GET_DOCUMENTS_REJECT,
    GET_DOCUMENT_FILE_SUCCESS,
    GET_DOCUMENTS_UNSUCCESS
} from '../types';

const uuid = require('uuid/v1');

export const getDocuments = (productRequestId, type) => (dispatch, getState) => {
    const { settings } = getState();

    dispatch({ type: GET_DOCUMENTS });
    dispatch({ type: GET_DOCUMENT_FILE_SUCCESS });

    return axios({
        url: `${settings.contextRoot}/api/getDocumentsInfo/${type}/${productRequestId}`,
        headers: { 'request-id': uuid(), AuthorizationOnDoc: settings.authHeader }
    }).then(
        (result) => {
            dispatch({
                type: GET_DOCUMENTS_SUCCESS,
                payload: result.data
            });
        }
    ).catch(
        (error) => {
            if (error.response.status === 400) {
                dispatch({
                    type: GET_DOCUMENTS_UNSUCCESS,
                    payload: error.response.data
                });
            } else {
                dispatch({
                    type: GET_DOCUMENTS_REJECT,
                    payload: error.config.headers['request-id']
                });
            }
        }
    );
};

export default getDocuments;
