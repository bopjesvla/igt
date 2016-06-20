import merge from 'webpack-merge'
import baseWebpackConfig from './base.webpack.js'
import config from '../config'
import StartServerPlugin from 'start-server-webpack-plugin'
import externals from 'webpack-node-externals'
import webpack from 'webpack'

export default merge(baseWebpackConfig, {
  entry: {
    app: [
      './build/dev-server.js' 
    ]
  },
  output: {
    path: config.build.serverRoot,
    filename: '[name].js'
  },
  externals: [externals()],
  devtool: 'inline-sourcemap',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new StartServerPlugin()
  ],
  target: 'async-node',
})
