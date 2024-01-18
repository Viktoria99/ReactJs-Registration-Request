import axios from 'axios/index';
import { saveAs } from 'file-saver';
import { Base64 } from 'js-base64';

import {
    GET_DOCUMENT_FILE_STARTED,
    GET_DOCUMENT_FILE_SUCCESS,
    GET_DOCUMENT_FILE_FAILED
} from '../types';

const uuid = require('uuid/v1');

export const getDocumentFileNew = (productType, docType, idDealState, format) => (dispatch, getState) => {
    dispatch({ type: GET_DOCUMENT_FILE_STARTED });

    const { settings } = getState();

    return axios({
        url: `${settings.contextRoot}/api/getDocumentFileNew/${productType}/${idDealState}/${docType}/${format}`,
        headers: { 'request-id': uuid() },
        responseType: 'blob'
    }).then(
        (result) => {
            let name = result.headers['content-disposition'].slice(28);
            name = Base64.decode(name.slice(0, -3));
            const blob = new Blob([result.data]);
            saveAs(blob, name);
            dispatch({ type: GET_DOCUMENT_FILE_SUCCESS });
        }
    ).catch(
        (error) => {
            dispatch({
                type: GET_DOCUMENT_FILE_FAILED,
                payload: error.config.headers['request-id']
            });
        }
    );
};

export const setFileError = () => (dispatch) => {
    dispatch({ type: GET_DOCUMENT_FILE_SUCCESS });
};

export default getDocumentFileNew;
