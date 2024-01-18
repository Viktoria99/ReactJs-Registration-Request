const PROJECT_NAME = process.env.PROJECT_NAME || 'fr-onDoc';
const SERVICE_HOST = process.env.HOST || 'frmsdev1';
const AUTH_NAME = `${PROJECT_NAME}-auth-api`;
const DOCUMENTS_NAME = `${PROJECT_NAME}-document-api`;
const SETTINGS_NAME = `${PROJECT_NAME}-settings`;
const CONTEXT_ROOT = process.env.CONTEXT_ROOT || '';
const IDENTITY_HOST = process.env.IDENTITY_HOST || 'http://localhost:7894';
const NODE_ENV = process.env.NODE_ENV || 'localhost';

module.exports = {
    appId: 'fr-onDoc-ui',
    server: {
        port: 3000
    },
    devtools: true,
    client: {
        nodeEnv: NODE_ENV,
        authPage: TEST_PART_HOST,
        contextRoot: CONTEXT_ROOT,
        identityHost: IDENTITY_HOST,
        serviceHost: SERVICE_HOST,
        authHeader: 'Basic=',
        pageTitle: 'Registration request'
    },
    csp: {},
    logger: {
        console: {
            level: 'info',
            prettyPrint: true
        }
    },
    services: {
        login: {
            url: `http://${SERVICE_HOST}/${AUTH_NAME}/auth/login`,
            method: 'GET',
            path: '/api/login'
        },
        getCredentials: {
            url: `http://${SERVICE_HOST}/${SETTINGS_NAME}/fr-onDoc-ui`,
            method: 'GET',
            path: '/api/getCredentials',
            environment: NODE_ENV
        },
        userInfo: {
            url: `http://${SERVICE_HOST}/${AUTH_NAME}/auth/getUserInfo`,
            method: 'GET',
            path: '/api/getUserInfo'
        },
        getDocuments: {
            url: `http://${SERVICE_HOST}/${DOCUMENTS_NAME}/{type}/prepare/{productRequestId}`,
            method: 'GET',
            path: '/api/getDocumentsInfo/{type}/{productRequestId}'
        },
        documentRequest: {
            url: `http://${SERVICE_HOST}/${DOCUMENTS_NAME}/main`,
            method: 'POST',
            path: '/api/createDocumentRequest'
        },
        documentRequestDetails: {
            url: `http://${SERVICE_HOST}/${DOCUMENTS_NAME}/documents/{id}`,
            method: 'GET',
            path: '/api/documentRequestDetails/{id}'
        }
    }
};
