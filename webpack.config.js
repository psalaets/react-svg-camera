// This is the webpack config for bundling.
// See webpack.test-config.js for the webpack config for tests.

module.exports = {
  entry: './src/svg-camera.js',
  output: {
    filename: 'svg-camera.js',
    path: './dist',
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel']
      }
    ]
  },
  externals: [
    // list peer deps here
    {
      react: 'commonjs react'
    }
  ]
};