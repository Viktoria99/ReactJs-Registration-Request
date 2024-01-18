const register = (server, options, next) => {
    server.route({
        method: 'GET',
        path: '/healthmonitor',
        config: {
            auth: false
        },
        handler(request, reply) {
            reply('ok');
        }
    });

    next();
};

register.attributes = {
    name: 'healthmonitor'
};

export default register;
