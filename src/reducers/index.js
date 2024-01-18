import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as form } from 'redux-form';

import appReducer from './app-reducer';
import settingsReducer from './settings-reducer';
import auth from './auth';
import popup from './ui/popup';


import productRequest from './documents/productRequest';
import documentFile from './documents/documentFile';
import documentRequestDetails from './documents/documentRequestDetails';

export default combineReducers({
    form,
    routing: routerReducer,
    settings: settingsReducer,
    app: appReducer,
    auth,
    productRequest,
    documentFile,
    documentRequestDetails,
    popup
});
