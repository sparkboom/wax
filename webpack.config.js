const path = require('path');
const webpack = require('webpack');
const config = require('./gulp/config/gulp.conf');

const plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'common',
    minChunks: 3
  }),
];

if (config.optimise) {
  plugins.push.apply(plugins, [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true
      }
    })
  ]);
}

module.exports = {
  entry: {
    common: ['react'],
    client: path.resolve(__dirname, 'app/index.js')
  },
  output: {
    path: path.resolve(__dirname, config.dirs.dist.bundles),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.json5$/,
        loader: 'json5-loader'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },
  devtool: config.optimise ? 'source-map' : 'eval',
  plugins,
};
