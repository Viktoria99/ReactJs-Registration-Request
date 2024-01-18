import { GET_DOCUMENT_FILE_SUCCESS } from '../types';

export const setFileError = () => (dispatch) => {
    dispatch({ type: GET_DOCUMENT_FILE_SUCCESS });
};

export default setFileError;
