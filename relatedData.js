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

let saveTrack = function(trackData) {
  let track = new Track(trackData);
  track.save((err, track) => {
    if (err) {
      console.log(chalk.red('Problem saving track', err));
    } else {
      console.log(chalk.blue(`Track ${track.song_id} saved`));
    }
  })
};

let findTrack = function(id, cb) {
  Track.findOne({song_id: id}, (err, track) => {
    if (err) {
      cb(err);
    } else {
      cb(null, track);
    }
  })
};

let deleteTrack = function (id) {
  Track.findOneAndDelete({song_id: id}, (err, track) => {
    if (err) {
      console.log(chalk.red('Could not delete track'));
    } else {
      console.log(chalk.magenta('Track deleted'));
    }
  })
};

module.exports.saveTrack = saveTrack;
module.exports.findTrack = findTrack;
module.exports.deleteTrack = deleteTrack;