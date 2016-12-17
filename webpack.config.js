const path = require('path')
const validate = require('webpack-validator')
const webpack = require('webpack')
const BabiliPlugin = require('babili-webpack-plugin')
const ClosureCompiler = require('google-closure-compiler-js').webpack

module.exports = validate({
  entry: {
    'index': './app/app'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ].concat(process.env.NODE_ENV === 'production'
    ? [
      new ClosureCompiler({
        options: {
          languageIn: 'ECMASCRIPT6_STRICT',
          languageOut: 'ECMASCRIPT5_STRICT',
          compilationLevel: 'ADVANCED',
          processCommonJsModules: false
        }
      }),
      new BabiliPlugin()
    ] : [])
})
