/* eslint no-undef: "error" */
/* eslint-env node */
module.exports = {
<<<<<<< HEAD
<<<<<<< HEAD
    parser: '@babel/eslint-parser',
=======
    /* eslint no-undef: "error" */ parser: '@babel/eslint-parser',
>>>>>>> f9bbe7e (test(UI): ADDON-58762 Jest setup)
=======
    parser: '@babel/eslint-parser',
>>>>>>> cfb61c9 (test(UI): ADDON-58762 Update eslintrc file)
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
