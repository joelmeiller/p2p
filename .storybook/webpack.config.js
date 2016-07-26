const path = require('path');


module.exports = {
  module: {
    loaders: [
      {
        test: /\.css?$/,
        loader: 'style-loader!css-loader!postcss-loader',
        include: path.resolve(__dirname, '../'),
      },
    ],
  },
  postcss: (webpack) => [
    require('postcss-import')({
      addDependencyTo: webpack,
    }),
    require('postcss-cssnext'),
  ],
};
