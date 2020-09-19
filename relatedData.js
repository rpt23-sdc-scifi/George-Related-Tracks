const mongoose = require('mongoose');
const chalk = require('chalk');

mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;
db.on('error', function() {
  console.log(chalk.red('mongoose connection error'));
});
db.once('open', function() {
  console.log(chalk.green('mongoose connected'));
});

const relatedSchema = new mongoose.Schema({
  song_id: {type: Number, unique: true},
  plays: Number,
  likes: Number,
  reposts: Number
});

const Track = mongoose.model('Track', relatedSchema);