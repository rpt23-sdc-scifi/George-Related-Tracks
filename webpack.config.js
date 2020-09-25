const path = require('path');

module.exports = {
  entry: './client/relatedTracks.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
};