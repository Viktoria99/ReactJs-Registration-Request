export const register = (server, options, next) => {
    const { method, path, url } = options;
    const handler = (request, reply) => {
        reply.proxy({
            uri: url,
            passThrough: true,
            onResponse: (error, res, req, reply) => {
                reply(res);
            }
        });
    };
    server.route({
        method,
        path,
        config: {
            plugins: {
                crumb: false
            },
            payload: {
                output: 'data',
                parse: false
            }
        },
        handler
    });
    next();
};

register.attributes = {
    name: 'restartDocumentRequest'
};

export default register;
