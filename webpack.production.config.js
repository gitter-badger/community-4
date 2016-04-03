var path = require('path');
var webpack = require('webpack');

module.exports = {

  devtool: 'cheap-module-source-map',

  entry: [
    './src/index.jsx',
  ],

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/',
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false,
      },
    }),
  ],

  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      config: path.join(__dirname, 'config', 'config'),
    },
  },

  module: {
    loaders: [
      // Javascript & React JSX files
      {
        test: /\.jsx$/,
        loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015'],
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
      },
      // Auth0-Lock Build
      {
        test: /node_modules[\\\/]auth0-lock[\\\/].*\.js$/,
        loaders: ['transform-loader/cacheable?brfs',
          'transform-loader/cacheable?packageify',
        ],
      }, {
        test: /node_modules[\\\/]auth0-lock[\\\/].*\.ejs$/,
        loader: 'transform-loader/cacheable?ejsify',
      }, {
        test: /\.json$/,
        loader: 'json',
      },
      // Bootstrap CSS
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      }, {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff',
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream',
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file',
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml',
      },
    ],
  },
};
