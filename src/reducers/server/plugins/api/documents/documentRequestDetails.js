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
        handler
    });
    next();
};

register.attributes = {
    name: 'documentRequestDetails'
};

export default register;
