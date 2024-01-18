import { CLEAR_GUARANTEE } from '../types';

export const clearGuarantee = () => (dispatch) => {
    dispatch({ type: CLEAR_GUARANTEE });
};

export default clearGuarantee;
