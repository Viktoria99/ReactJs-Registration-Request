/* eslint no-console: ["error", { allow: ["log", "error"] }] */
import 'babel-polyfill';

import config from 'config';
import Hapi from 'hapi';
import h2o2 from 'h2o2';
import crumb from 'crumb';

import pluginLogger from './plugins/logger';
import pluginPageIndex from './plugins/pages/index';
import healthmonitor from './plugins/api/healthmonitor';

import pluginLogin from './plugins/api/login';
import pluginUserInfo from './plugins/api/userInfo';

import pluginSearchDocuments from './plugins/api/documents/getDocuments';
import pluginCreateDocumentNew from './plugins/api/documents/createDocumentNew';
import pluginRestartDocumentNew from './plugins/api/documents/restartDocumentNew';
import pluginCreateDocumentCancellation from './plugins/api/documents/createDocumentCancellation';
import pluginDocumentsCancellationInfo from './plugins/api/documents/getDocumentsCancellation';
import pluginRestartDocumentRequest from './plugins/api/documents/restartDocumentRequest';
import pluginDocumentRequest from './plugins/api/documents/createDocumentRequest';
import pluginDocumentRequestDetailsHistory from './plugins/api/documents/documentRequestDetails';
import pluginGetCredentials from './plugins/api/getCredentials';

const startMessage = `░░░░░░░░░░░░░░░░░░░░
░░░░░ЗАПУСКАЕМ░░░░░░░
░ГУСЯ░▄▀▀▀▄░РАБОТЯГИ░░
▄███▀░◐░░░▌░░░░░░░░░
░░░░▌░░░░░▐░░░░░░░░░
░░░░▐░░░░░▐░░░░░░░░░
░░░░▌░░░░░▐▄▄░░░░░░░
░░░░▌░░░░▄▀▒▒▀▀▀▀▄
░░░▐░░░░▐▒▒▒▒▒▒▒▒▀▀▄
░░░▐░░░░▐▄▒▒▒kek▒▒▒▒▀▄
░░░░▀▄░░░░▀▄▒▒▒▒▒▒▒▒▒▒▀▄
░░░░░░▀▄▄▄▄▄█▄▄▄▄▄▄▄▄▄▄▄▀▄
░░░░░░░░░░░▌▌░▌▌░░░░░
░░░░░░░░░░░▌▌░▌▌░░░░░
░░░░░░░░░▄▄▌▌▄▌▌░░░░░`;


let plugins = [
    h2o2,
    { register: healthmonitor },
    {
        register: crumb,
        options: {
            key: 'react-csrf',
            restful: true,
            cookieOptions: {
                isSecure: false,
                isHttpOnly: false
            }
        }
    }, // productClientInfo
    { register: pluginLogin, options: config.get('services.login') },
    { register: pluginUserInfo, options: config.get('services.userInfo') },
    { register: pluginSearchDocuments, options: config.get('services.getDocuments') },
    { register: pluginCreateDocumentNew, options: config.get('services.createDocumentNew') },
    { register: pluginDocumentRequest, options: config.get('services.documentRequest') },
    { register: pluginDocumentRequestDetailsHistory, options: config.get('services.documentRequestDetails') },
    { register: pluginRestartDocumentNew, options: config.get('services.restartDocumentNew') },
    { register: pluginRestartDocumentRequest, options: config.get('services.restartDocumentRequest') },
    { register: pluginGetCredentials, options: config.get('services.getCredentials') },
    { register: pluginPageIndex },
    { register: pluginLogger }
];

const server = new Hapi.Server();
server.connection({
    port: config.get('server.port'),
    state: {
        strictHeader: false
    }
});

server.ext('onPostStart', (_, done) => {
    console.log(`Server is running: ${server.info.uri}`);
    console.log(startMessage);
    done();
});

server.register(plugins, (error) => {
    if (error) {
        throw error;
    }
});

export default server;
