/* eslint no-undef: "error" */
/* eslint-env node */
module.exports = {
<<<<<<< HEAD
    parser: '@babel/eslint-parser',
=======
    /* eslint no-undef: "error" */ parser: '@babel/eslint-parser',
>>>>>>> f9bbe7e (test(UI): ADDON-58762 Jest setup)
    extends: ['@splunk/eslint-config/browser', 'prettier', 'plugin:jest/recommended'],
    plugins: ['prettier', 'jest'],
    env: {
        'jest/globals': true,
    },
    globals: {
        __DEV__: true,
        window: true,
        __non_webpack_require__: 'readonly',
    },
    rules: {
        'prettier/prettier': 2,
        indent: 'off',
    },
};
