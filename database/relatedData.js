const mongoose = require('mongoose');
const chalk = require('chalk');

mongoose.connect('mongodb://localhost/relatedTracks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

mongoose.connection.on('error', function () {
  console.log(chalk.red('mongoose connection error'));
});
mongoose.connection.once('open', function () {
  console.log(chalk.green('mongoose connected'));
});

const relatedSchema = new mongoose.Schema({
  song_id: Number,
  plays: Number,
  likes: Number,
  reposts: Number,
  related: [Number]
});

const Track = mongoose.model('Track', relatedSchema);

const saveTrack = function (trackData, cb) {
  let track = new Track(trackData);
  track.save((err, track) => {
    if (err) {
      console.log(chalk.red('Problem saving track', err));
      cb(err);
    } else {
      console.log(chalk.blue(`Track ${track.song_id} saved`));
      cb(null, track);
    }
  })
};

const saveManyTracks = function (tracksData, cb) {
  // console.log('tracksData');
  // console.log(tracksData);
  Track.insertMany(tracksData, (err, tracks) => {
    console.log('inserting Many')
    if (err) {
      console.log(chalk.red('Problem saving tracks', err));
      cb(err);
    } else {
      cb(null, tracks);
      // console.log(tracks);
      console.log(`saved tracks ${tracks[0].song_id}+`)
    }
  })
};

const findTrack = function (id, cb) {
  Track.findOne({ song_id: id }, (err, track) => {
    if (err) {
      cb(err);
    } else {
      cb(null, track);
    }
  })
};

const updateTrack = function (id, trackData, cb = () => { }) {
  Track.findOneAndUpdate({ song_id: id }, trackData, (err, track) => {
    if (err) {
      console.log(chalk.red('Could not update track'));
      cb(err);
    } else {
      console.log(chalk.magenta('Track updated'));
      cb(null, track);
    }
  })
};

const deleteTrack = function (id, cb) {
  Track.findOneAndDelete({ song_id: id }, (err, track) => {
    if (err) {
      console.log(chalk.red('Could not delete track'));
      cb(err);
    } else {
      console.log(chalk.magenta('Track deleted'));
      cb(null, track);
    }
  })
};

const drop = function (cb) {
  mongoose.connection.dropCollection('tracks', (err, result) => {
    if (err) {
      console.log(chalk.red('Could not drop collection tracks'));
      cb(err, null);
    } else {
      console.log(chalk.magenta('collection tracks dropped'));
      cb(null, result);
    };
  })
};

module.exports = { saveTrack, findTrack, deleteTrack, updateTrack, drop, saveManyTracks };