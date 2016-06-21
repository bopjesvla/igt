import merge from 'webpack-merge'
import baseWebpackConfig from './base.webpack.js'
import config from '../config'
import StartServerPlugin from 'start-server-webpack-plugin'
import externals from 'webpack-node-externals'
import webpack from 'webpack'
import {rm} from 'shelljs'

let poll = 'webpack/hot/poll?1000'

rm('-rf', 'dist')

let babelLoader = baseWebpackConfig.module.loaders[1]
delete babelLoader.loader
babelLoader.loaders = ['monkey-hot', 'babel']

export default merge(baseWebpackConfig, {
  entry: {
    app: [
      poll,
      './build/dev-server.js' 
    ]
  },
  output: {
    path: config.build.serverRoot,
    filename: '[name].js'
  },
  externals: [externals({
    whitelist: [poll]
  })],
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new StartServerPlugin(),
    // new webpack.BannerPlugin('require("source-map-support").install();',
      // { raw: true, entryOnly: false }),
  ],
  target: 'async-node',
})
