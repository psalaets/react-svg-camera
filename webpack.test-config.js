// This is the webpack config for tests.
// See webpack.config.js for the webpack config for bundling.

module.exports = {
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/
      }
    ]
  },
  node: {
    fs: 'empty'
  }
};
