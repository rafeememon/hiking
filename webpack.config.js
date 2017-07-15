var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var NODE_ENV = process.env.NODE_ENV;

var plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(NODE_ENV)
    },
  }),
  new HtmlWebpackPlugin({
    inject: false,
    template: require('html-webpack-template'),
    title: 'Hiking',
    hash: true,
    mobile: true,
    appMountId: 'fixture'
  })
];

if (NODE_ENV === 'production') {
  console.log('** WEBPACK PRODUCTION MODE ENABLED **');
  plugins.push(new webpack.LoaderOptionsPlugin({
    minimize: true
  }));
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    output: {
      comments: false
    },
    sourceMap: true
  }));
}

module.exports = {
  entry: {
    main: './src/main.tsx'
  },
  output: {
    path: __dirname + '/build',
    filename: '[name].js'
  },
  devtool: 'source-map',

  plugins: plugins,

  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },

  module: {
    rules: [
      { test: /\.tsx?$/, use: 'tslint-loader', enforce: 'pre' },
      { test: /\.js$/, use: 'source-map-loader', enforce: 'pre' },
      { test: /\.tsx?$/, use: 'ts-loader' }
    ]
  }
}
