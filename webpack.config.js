const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpack = require('webpack');

const PATHS = {
    app: path.join(__dirname, 'app'),
    dist: path.join(__dirname, 'dist')
};

const common ={
    
    entry:{
        app: PATHS.app
    },
    output:{
        path: PATHS.dist,
        filename: '[name].js'
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: 'Meat Rack',
            inject: 'body',
            template: './app/index.html',
        })
    ]
};

const devConfig = {
    entry:{
        hmr: [
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/dev-server',
        ]
    },
    devServer:{
        historyApiFallback: true,
        stats: 'errors-only',
        host: process.env.HOST,
        port: process.env.PORT
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
};

module.exports = function(env){

    if(env === 'production'){
        return common;
    }

    return Object.assign(
        {},
        common,
        devConfig,
        {
            plugins: common.plugins.concat(devConfig.plugins)
        }
    );
};