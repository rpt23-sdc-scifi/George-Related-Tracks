const path = require('path');

module.exports = {
  entry: './client/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  // resolve: {
  //   extensions: ['.js', '.jsx']
  // },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          // cacheDirectory: true,
          options: {presets: ['@babel/preset-react', '@babel/preset-env']}
        }
      }
    ]
  }
};