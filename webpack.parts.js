const webpack = require('webpack');

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
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin()
        ],
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
                    loaders: ['style-loader', 'css-loader', 'sass-loader']
                }
            ]

        }
    };
};