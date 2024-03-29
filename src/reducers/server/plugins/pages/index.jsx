/* eslint no-console: ["error", { allow: ["log", "error"] }] */

import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import Boom from 'boom';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import config from 'config';
import AppHtml from 'react/app-html';
import path from 'path';

import configureStore from '../../../configure-store';
import routes from '../../../routes';
import readAssetsManifest from '../read-assets-manifest';

const appSettings = config.get('client');
const services = config.get('services');
const externalSystems = config.get('externalSystems');


const defaultState = {
    app: {
        error: false
    },
    settings: {
        ...appSettings,
        externalSystems,      
        services: Object.keys(services).reduce((res, service) => {
            res[service] = `${appSettings.contextRoot}${services[service].path}`;
            return res;
        }, {})
    }
};

const CSP = config.get('csp');
const CSP_HEADER_VALUE =
    Object.keys(CSP).map(optionName => `${optionName} ${CSP[optionName]}`).join('; ');

export const register = (server, options, next) => {
    let assets;

    let handler = async (request, reply) => {
        if (!assets) {
            assets = readAssetsManifest();
        }

        const contextRoot = config.get('client.contextRoot');
        const url = request.url.path;
        const store = configureStore(false)(defaultState);
        const context = {};

        const appCode = (
            <Provider store={ store }>
                <StaticRouter location={ url } basename={ contextRoot } context={ context }>
                    { routes }
                </StaticRouter>
            </Provider>
        );

        let page;

        try {
            const appHtml = renderToString(appCode);
            /* eslint-disable react/no-danger */
            const layoutCode = (
                <AppHtml
                    contextRoot={ contextRoot ? path.normalize(`${contextRoot}/`) : '/' }
                    pageTitle={ appSettings.pageTitle }
                    appName={ appSettings.projectName }
                    appVersion={ appSettings.version }                    
                    hasError={ false }
                    cssFiles={ assets.css }
                    jsFiles={ assets.js }
                    appState={ store.getState() }
                >
                    <div id='react-app' dangerouslySetInnerHTML={ { __html: appHtml } } />
                </AppHtml>
            );
            /* eslint-enable react/no-danger */

            page = renderToStaticMarkup(layoutCode);
        } catch (error) {
            console.error('error during render process', error);
            return reply(Boom.badImplementation());
        }

        if (context.url) {
            return reply().redirect(context.url);
        }

        return reply(page)
            .header('X-FRAME-OPTIONS', 'DENY')
            .header('Content-Security-Policy', CSP_HEADER_VALUE);
    };

    server.route({ method: 'GET', path: '/{whateverPath?}', handler }); // root route
    server.route({ method: 'GET', path: '/{whateverPath*}', handler }); // hack to support several slashes in path
    next();
};

register.attributes = {
    name: 'pages/index'
};

export default register;
