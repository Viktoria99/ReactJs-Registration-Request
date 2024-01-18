import axios from 'axios/index';
import {
    GET_DOCUMENT_REQUEST_DETAILS,
    GET_DOCUMENT_REQUEST_DETAILS_SUCCESS,
    GET_DOCUMENT_REQUEST_DETAILS_REJECT,
    UPDATE_DOCUMENT_REQUEST_DETAILS,
    UPDATE_DOCUMENT_REQUEST_DETAILS_SUCCESS,
    UPDATE_DOCUMENT_REQUEST_DETAILS_REJECT
} from '../types';

const uuid = require('uuid/v1');

export const getDocumentRequestDetails = documentRequestId => (dispatch, getState) => {
    const { settings } = getState();
    dispatch({ type: GET_DOCUMENT_REQUEST_DETAILS });
    return axios({
        url: `${settings.contextRoot}/api/documentRequestDetails/${documentRequestId}`,
        headers: { 'request-id': uuid() }
    }).then(
        (result) => {
            dispatch({
                type: GET_DOCUMENT_REQUEST_DETAILS_SUCCESS,
                payload: result.data
            });
        }
    ).catch(
        (error) => {
            dispatch({
                type: GET_DOCUMENT_REQUEST_DETAILS_REJECT,
                payload: error.config.headers['request-id']
            });
        }
    );
};

export const updateDocumentRequestDetails = (documentRequestId, time) => (dispatch, getState) => {
    const { settings } = getState();
    dispatch({ type: UPDATE_DOCUMENT_REQUEST_DETAILS, payload: time });
    return axios({
        url: `${settings.contextRoot}/api/documentRequestDetails/${documentRequestId}`,
        headers: { 'request-id': uuid() }
    }).then(
        (result) => {
            dispatch({
                type: UPDATE_DOCUMENT_REQUEST_DETAILS_SUCCESS,
                payload: result.data
            });
        }
    ).catch(
        (error) => {
            dispatch({
                type: UPDATE_DOCUMENT_REQUEST_DETAILS_REJECT,
                payload: error.config.headers['request-id']
            });
        }
    );
};

export default getDocumentRequestDetails;

