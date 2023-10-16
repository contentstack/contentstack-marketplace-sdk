'use strict'

const path = require('path')
const webpackMerge = require('webpack-merge')

const commonConfig = require('./webpack.common.js')

module.exports = function (options) {
  return webpackMerge(commonConfig(), {
    output: {
      libraryTarget: 'umd',
      path: path.join(__dirname, '../dist/web'),
      filename: 'contentstack-marketplace.js'
    },
    resolve: {
      fallback: {
        os: require.resolve('os-browserify/browser')
      }
    },
    module: {
      rules: [{
        test: /\.js?$/,
        exclude: ['/node_modules'],
        use: [{
          loader: 'string-replace-loader',
          options: {
            search: '{{PLATFORM}}',
            replace: 'web'
          }
        }]
      }]
    }
  })
}
