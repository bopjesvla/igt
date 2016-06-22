import merge from 'webpack-merge'
import baseWebpackConfig from './base.webpack.js'
import config from '../config'
import ReloadServerPlugin from 'reload-server-webpack-plugin'
import externals from 'webpack-node-externals'
import webpack from 'webpack'
import {rm} from 'shelljs'

export default merge(baseWebpackConfig, {
  entry: {
    app: './server/index.js' 
  },
  output: {
    path: config.build.serverRoot,
    filename: 'index.js'
  },
  externals: [externals()],
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new ReloadServerPlugin({script: "./dist/server/index.js"}),
    new webpack.BannerPlugin('require("source-map-support").install();',
      { raw: true, entryOnly: false }),
  ],
  target: 'async-node'
})
