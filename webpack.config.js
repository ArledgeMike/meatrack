const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');

var ExtractTextPlugin = require('extract-text-webpack-plugin');


//const webpack = require('webpack');

const PATHS = {
    app: path.join(__dirname, 'app'),
    dist: path.join(__dirname, 'dist')
};

const common =merge({
    devtool: 'inline-source-map',
    entry:{
        app: PATHS.app,
        //TODO this has to be removed
        hmr: [
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/dev-server'
        ]
    },
    output:{
        path: PATHS.dist,
        filename: '[name].js'
    }
    /*,
    plugins:[
        new HtmlWebpackPlugin({
            title: 'Meat Rack',
            inject: 'body',
            template: './app/index.html',
        })
    ]
    */
});

module.exports = function(env){

    if(env === 'production'){
        return merge([
            parts.prodEntryPath,
            common,
           
            parts.lintJavaScript({ paths: PATHS.app })
        ]);
    }
    
    return merge([
        common,
        parts.loadCss(PATHS.app),
        parts.devServer,
        parts.loadPlugins(),
        parts.lintJavaScript({
            paths: PATHS.app,
            options: {
                emitWarnings: true
            }
        })
    ]);
};