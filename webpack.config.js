/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const PurifyCSSPlugin = require("purifycss-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: [
      './src/ui/styles/import.css',
      './src/index.js',
    ],
    cache: true,
    debug: true,
    devtool: 'cheap-module-source-map',
    output: {
        path: path.join(__dirname, 'src/main/resources/static/built'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
            	test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    // https://github.com/babel/babel-loader#options
                    cacheDirectory: true,
                    presets: ['es2015','react','stage-2']
                }
            },
            {
                test:   /\.css$/,
                loader: ExtractTextPlugin.extract(
                  'style-loader',
                  'css-loader?sourceMap&-minimize&-autoprefixer!postcss-loader'
                ),
                include: path.resolve(__dirname, 'src/ui/styles'),
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('production')
          }
        }),
        new ExtractTextPlugin("bundle.css"),
        // new PurifyCSSPlugin({
        //   basePath: __dirname,
        //   paths: [
        //     'src/**/*.jsx'
        //   ]
        // }),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        }),
    ]
};
