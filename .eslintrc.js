module.exports = {
    extends: '@splunk/eslint-config/browser-prettier',
    env: {
        'browser': true,
        'amd': true,
        'node': true,
    },
    globals: {
        __non_webpack_require__: true,
    },
};
