export const register = (server, options, next) => {
    const { method, path, url } = options;
    const handler = (request, reply) => {
        reply.proxy({
            uri: url,
            passThrough: true,
            xforward: true,
            redirects: false,
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
    name: 'login'
};

export default register;
