var path = require('path');

module.exports = {
    entry: './src/app.js',
    devtool: 'sourcemaps',
    cache: true,
    debug: true,
    output: {
        path: __dirname,
        filename: './src/main/resources/static/built/bundle.js'
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
                exclude: /node_modules/,
                loader: "style-loader!css-loader!postcss-loader"
            }
        ]
    }
};