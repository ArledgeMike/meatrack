const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


//ENTRY PATHS MIGHT NOT WORK
exports.devEntryPath = function(){
    return{
        entry:{
            app: PATHS.app,
            hmr: [
                'webpack-dev-server/client?http://localhost:8080',
                'webpack/hot/dev-server'
            ]
        }
    };
};

exports.prodEntryPath = function(){
    return{
        entry:{
            app: PATHS.app
        }
    };
};

exports.devServer = function(options) {
    return {
        devServer: {
            historyApiFallback: true,
            hotOnly: true,
            stats: 'errors-only',
            host: options.host, 
            port: options.port, 
        },
       /* plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
            new ExtractTextPlugin('stylesheets/[name].css')
            
        ],*/
    };
};

exports.lintJavaScript = function({ paths, options }) {
    return {
        module: {
            rules: [
                {
                    test: /\.js$/,
                    include: paths,
                    enforce: 'pre',
                    loader: 'eslint-loader',
                    options: options,
                },
            ],
        },
    };
};

exports.loadCss = function(paths){
    return {
        module: {
            rules:[
                {
                    test: /\.scss$/,
                    include: paths,
                    exclude: /node_modules/,
                    use: ExtractTextPlugin.extract(['css-loader','sass-loader']),
                    //loaders: ['style-loader', 'css-loader', 'sass-loader']

                }
            ]
        }
    };
};


exports.loadPlugins = function(paths){
    return{
        plugins:[
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
            new ExtractTextPlugin({filename: 'style.css',
            allChunks:true
            }),
            new HtmlWebpackPlugin({
                title: 'Meat Rack',
                inject: 'body',
                template: './app/index.html',
            }),

        ]
    };
};