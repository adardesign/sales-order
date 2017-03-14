
module.exports = {
  context: __dirname,
  entry: './src/scripts/main.js',
  output: {
    path: __dirname + '/build',
    publicPath: 'build/',
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.(svg|jpg)$/,
        loaders: [
          'url?limit=10000'
        ]
      },
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css'
        ]
      }
    ]
  }
}