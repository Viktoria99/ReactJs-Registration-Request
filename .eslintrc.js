module.exports = {
    extends: [
        require.resolve('ui-presets/eslint')
    ],
    root: true,
    settings: {
        'import/resolver': {
            'node': {
                'extensions': [
                    '.js',
                    '.jsx'
                ]
            },
        }
    },
    rules: {
        'import/extensions': ['error', 'always', {
            js: 'never',
            jsx: 'never',
            ts: 'never',
            tsx: 'never'
        }],
    }
};
