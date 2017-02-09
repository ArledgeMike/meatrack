const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

exports.devServer = (options) =>{
    return {
        devServer: {
            historyApiFallback: true,
            hotOnly: true,
            stats: 'errors-only',
            host: options.host, 
            port: options.port
        }
    };
};

exports.lintJavaScript = ({ paths, options }) =>{
    return {
        module: {
            rules: [
                {
                    test: /\.js$/,
                    include: paths,
                    enforce: 'pre',
                    loader: 'eslint-loader',
                    options: options
                }
            ]
        }
    };
};

exports.loadCss = (paths) =>{
    return {
        module: {
            rules:[
                {
                    test: /\.scss$/,
                    include: paths,
                    exclude: /node_modules/,
                    use: ExtractTextPlugin.extract(['css-loader','sass-loader'])
                }
            ]
        }
    };
};


exports.loadPlugins = (paths) =>{
    return{
        plugins:[
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
            new ExtractTextPlugin({
                filename: 'style.css',
                allChunks:true
            }),
            new HtmlWebpackPlugin({
                title: 'Meat Rack',
                inject: 'body',
                template: './app/index.html',
            })
        ]
    };
};

exports.loadHMR = (paths) =>{
    return {
        entry:{
            app: paths,
            hmr: [
                'webpack-dev-server/client?http://localhost:8080',
                'webpack/hot/dev-server'
            ]
        }
    };
};