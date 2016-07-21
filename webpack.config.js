var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

var config = {
    devtool: 'source-map',

    debug: true,
    entry: {
        '@angular': [
            'rxjs',
            'reflect-metadata',
            'zone.js',
            '@angular/core',
            '@angular/router',
            '@angular/http'
        ],
        'common': ['es6-shim'],
        'app': './src/app/main.ts',
    },

    output: {
        path: __dirname + '/build/',
        publicPath: 'build/',
        filename: '[name].js',
        sourceMapFilename: '[name].js.map',
        chunkFilename: '[id].chunk.js'
    },

    resolve: {
        extensions: ['','.ts','.js','.json', '.css', '.html']
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts',
                exclude: [ /node_modules/, /releases/ ]
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.(css|html)$/,
                loader: 'raw'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=10000'
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            }
        ]
    },

    plugins: [
        new CommonsChunkPlugin({ names: ['@angular', 'common'], minChunks: Infinity }),
        new webpack.ProvidePlugin({
            "window.jQuery": "jquery",
            $: "jquery",
            jQuery: "jquery",
            io: "socket.io-client",
            "window.io": "socket.io-client"
        }),
        new CopyWebpackPlugin([
            { from: "./node_modules/easyrtc/api/easyrtc.js", to: "./vendor/"},
            { from: "./node_modules/socket.io-client/socket.io.js", to: "./vendor/socket.io-client.js"}
        ]),
        new webpack.ContextReplacementPlugin(/bindings$/, /^$/)
    ],
    target:'electron-renderer',
    externals: ["bindings"]
};

if (process.env.NODE_ENV === 'production') {
    config.devtool = ''

    config.plugins.push(
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    )
}

module.exports = config;