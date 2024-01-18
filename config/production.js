module.exports = {
    devtools: false,
    csp: {
        'default-src': '\'self\' sv-cb:*',
        'connect-src': '\'self\' sv-cb:*',
        'script-src': '\'',
        'frame-src': '\'self\' sv-cb:*',
        'img-src': '\'',
        'font-src': '\'self\' data:',
        'object-src': '\'none\'',
        'style-src': '\'self\' \'unsafe-inline\''
    }
};
