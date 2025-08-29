const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require("node:path");

module.exports = {
    entry: 'dist/tsc/index.js',
    output: {
        filename: 'index.js',
        path: path.join(process.cwd(), 'dist/webpack/scripts'),
    },
    target: 'es2020',
    mode: 'production',
    experiments: {
        outputModule: true
    },
    externalsType: 'module',
    externals: {
        '@minecraft/server': 'module @minecraft/server',
        '@minecraft/server-ui': 'module @minecraft/server-ui'
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
}