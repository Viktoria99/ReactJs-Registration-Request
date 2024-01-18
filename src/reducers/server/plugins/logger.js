import log from '../lib/logger';

const register = (server, options, next) => {
    server.ext('onRequest', (request, reply) => {
        if (request.path.startsWith('/api')) {
            const info = {
                method: request.method,
                path: request.path,
                headers: request.headers
            };
            log.info(`request: ${JSON.stringify(info)}`);
        }

        reply.continue();
    });

    server.ext('onPreResponse', (request, reply) => {
        if (request.path.startsWith('/api')) {
            const info = {
                method: request.method,
                path: request.path,
                headers: request.headers,
                statusCode: request.response.statusCode,
                payload: request.response.output
            };

            log.info(`response: ${JSON.stringify(info)}`);
        }

        reply.continue();
    });

    next();
};

register.attributes = {
    name: 'logger'
};

export default register;
