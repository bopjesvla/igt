import config from '../config'
import webpack from 'webpack'
import merge from 'webpack-merge'
import utils from './utils'
import baseWebpackConfig from './base.webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

export default merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders()
  },
  // eval-source-map is faster for development
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ],
  devServer: {
    host: '0.0.0.0',
    hot: true,
    inline: true,
    stats: {
      chunks: false,
    },
    proxy: {
      '/api/*': {
        target: 'http://localhost:' + config.dev.serverPort,
      }
    }
  }
})
