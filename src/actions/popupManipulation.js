import { CLOSE_POPUP, OPEN_POPUP } from './types';

export const closePopup = () => (dispatch) => {
    dispatch({ type: CLOSE_POPUP });
};

export const openPopup = () => (dispatch) => {
    dispatch({ type: OPEN_POPUP });
};

export default openPopup;

