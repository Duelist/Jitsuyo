var webpack = require('webpack');
module.exports = {
  entry: [
    './dist/js/app.js'
  ],
  output: {
    path: __dirname + '/dist/build',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ]
}
