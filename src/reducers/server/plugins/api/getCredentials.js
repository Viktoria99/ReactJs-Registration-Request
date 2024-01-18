export const register = (server, options, next) => {
    const {
        method,
        path,
        url,
        environment
    } = options;
    let resultUrl = null;
    if (environment !== 'localhost') {
        resultUrl = `${url}/${environment}`;
    } else { resultUrl = `${url}/development`; }
    const handler = (request, reply) => {
        reply.proxy({
            uri: resultUrl,
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
    name: 'getCredentials'
};

export default register;
