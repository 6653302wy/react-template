const DotenvWebpackPlugin = require('dotenv-webpack');
const { WebpackConfiguration } = require('webpack-dev-server');
const { resolve } = require('./utils/resolve');
const { generate } = require('./webpack.base');

const base = generate(false);
const basePlugins = base.plugins;

/**
 * @type {WebpackConfiguration}
 */
const config = {
    ...base,
    devServer: {
        static: {
            directory: resolve('dist'),
        },
        compress: true,
        open: true,
        hot: true,
        historyApiFallback: true,
        port: 'auto',
        // host: 'local-ipv4', //关闭此选项，则是使用localhost
        proxy: {
            '/client-web-api': {
                target: 'https://dev-api.villaland.cn/client-web-api',
                pathRewrite: { '^/client-web-api': '' },
                changeOrigin: true,
            },
            '/business-web-api': {
                target: 'https://dev-api.villaland.cn/business-web-api',
                // target: 'http://192.168.28.155:8060/',
                pathRewrite: { '^/business-web-api': '' },
                changeOrigin: true,
            },
            '/track-web-api': {
                target: 'https://dev-api.villaland.cn/track-web-api',
                pathRewrite: { '^/track-web-api': '' },
                changeOrigin: true,
            },
            '/user-server-api': {
                target: 'https://dev-api.villaland.cn/user-server-api',
                pathRewrite: { '^/user-server-api': '' },
                changeOrigin: true,
            },
        },
    },
    plugins: [...basePlugins, new DotenvWebpackPlugin({ path: resolve('.env') })],
};

module.exports = config;
