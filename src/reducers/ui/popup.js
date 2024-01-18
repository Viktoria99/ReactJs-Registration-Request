import { CLOSE_POPUP, OPEN_POPUP } from '../../actions/types';

const initialState = {
    opened: false
};

const popupState = (state = initialState, action) => {
    switch (action.type) {
        case CLOSE_POPUP:
            return {
                ...state, opened: false
            };
        case OPEN_POPUP:
            return {
                ...state, opened: true
            };
        default:
            return state;
    }
};

export default popupState;
