const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpackMerge = require('webpack-merge');
const baseConfig = require('@splunk/webpack-configs/base.config').default;
const { LicenseWebpackPlugin } = require('license-webpack-plugin');

module.exports = webpackMerge(baseConfig, {
    entry: {
        entry_page: path.join(__dirname, 'src/main/webapp/pages/entry_page'),
    },
    output: {
        path: path.join(__dirname, 'dist/package/appserver/static/js/build'),
        filename: '[name].js',
        chunkFilename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.(s*)css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new LicenseWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, 'src/main/resources/splunk'),
                to: path.join(__dirname, 'dist/package'),
            },
            {
                from: path.join(__dirname, 'src/main/webapp/schema/schema.json'),
                to: path.join(__dirname, 'dist/schema'),
            },
            {
                from: path.join(__dirname, 'THIRDPARTY.npm'),
                to: path.join(__dirname, 'dist'),
            },
        ]),
    ],
    devtool: 'inline-source-map',
});
