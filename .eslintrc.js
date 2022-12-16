module.exports = {
    parser: '@babel/eslint-parser',
    extends: ['eslint-config-airbnb', 'eslint-config-airbnb/hooks', 'prettier'],
    plugins: ['prettier'],
    globals: {
        __DEV__: true,
        window: true,
        __non_webpack_require__: 'readonly',
    },
    env: {
        browser: true,
    },
    rules: {
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/no-unresolved': 'off',
        'import/no-webpack-loader-syntax': 'off',
        'import/prefer-default-export': 'off',

        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],

        'prettier/prettier': 2,
        indent: 'off',

        // Good idea, but very challenging to use in the real world - too many false positives / boilerplate
        'react/destructuring-assignment': 'off',

        // Should be enabled by projects using babel-plugin-transform-react-remove-prop-types
        'react/forbid-foreign-prop-types': 'off',

        // These rules support custom components ('a' is always checked) and 'Link' is
        // added by default. However, this conflicts with @splunk/react-icons/Link and with
        // @splunk/react-ui/Link (which doesn't always render 'a' elements).
        'jsx-a11y/anchor-is-valid': ['error', { components: [] }],
        'jsx-a11y/anchor-has-content': ['error', { components: [] }],

        // Disabled for historic reasons - should be revisited
        'react/forbid-prop-types': 'off',
        'react/require-default-props': 'off',

        // Disabled while eslint-config-airbnb's configuration of it isn't finalized
        // (they have a TODO to switch this from "property assignment" to "static public field"
        'react/static-property-placement': 'off',

        // This rule is incompatible with our ...otherProps recommendation
        'react/jsx-props-no-spreading': 'off',
    },
};
