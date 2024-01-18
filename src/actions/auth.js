import axios from 'axios';
import {
    USER_LOGIN,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_REJECT
} from './types';

import deleteCookie from '../utils/deleteCookie';

const uuid = require('uuid/v1');

export const getUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOGIN });

    const { settings } = getState();
    const uid = uuid();

    return axios({
        url: `${settings.contextRoot}/api/login`,
        headers: { 'request-id': uid },
        method: 'get'
    }).then(
        result => axios({
            url: `${settings.contextRoot}/api/getUserInfo`,
            headers: {
                'request-id': uid,
                authorization: result.data.token
            },
            withCredentials: true
        }).then(
            (res) => {
                res.data.permissions.push('express__execute');
                dispatch({
                    type: USER_LOGIN_SUCCESS,
                    user: res.data
                });
            }
        )
    ).catch(
        (error) => {
            if (error.response.status === 409) {
                deleteCookie();
                window.location.reload();
            } else {
                dispatch({ type: USER_LOGIN_REJECT, error });
            }
        }
    );
};

export default getUser;
