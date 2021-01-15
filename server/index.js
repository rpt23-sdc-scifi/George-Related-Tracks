require('newrelic');
const express = require('express');
const path = require('path');
const chalk = require('chalk');
const axios = require('axios');
const db = require('../database/relatedData.js');
const expressStaticGzip = require('express-static-gzip');
const app = express();

const port = 3001;

// app.use(express.static(path.join(__dirname, '../public')));
app.use('/', expressStaticGzip(path.join(__dirname, '../public'), {
  enableBrotli: true,
  orderPreference: ['br', 'gz'],
  setHeaders: function (res, path) {
    res.setHeader("Cache-Control", "public, max-age=31536000");
  }
}))

app.post('/relatedTracks', (req, res) => {
  let data = req.query;
  db.saveTrack(data, (err, track) => {
    if (err) {
      res.status(400).send(err);
    } else if (track === null) {
      res.status(404).send(track);
    } else {
      res.status(201).send(track);
    }
  })
})

// app.get('/relatedTracks/:song', (req, res) => {
//   // console.log(chalk.bgWhite.black(req.params.song));
//   db.findTrack(req.params.song, (err, data) => {
//     if (err) {
//       // console.log(chalk.red(`Problem obtaining track info: `, err));
//       console.log(chalk.red(`Problem obtaining track info`));
//       res.status(500).send('There was a problem getting the track info');
//     } else {
//       let relatedInfo = [];
//       if (data.related.length === 0) {
//         res.send(relatedInfo);
//       }
//       for (let i = 0; i < data.related.length; i++) {
//         let trackInfo = {};
//         trackInfo.song_id = data.related[i];
//         db.findTrack(data.related[i], (err, info) => {
//           if (err) {
//             // console.log(chalk.red(`Can't find secondary track info: `, err));
//             console.log(chalk.red(`Can't find secondary track info`));
//             res.status(500).send('Problem locating related track data');
//           } else {
//             trackInfo.plays = info.plays;
//             trackInfo.likes = info.likes;
//             trackInfo.reposts = info.reposts;
//             axios.get(`localhost:3005/songdata/${trackInfo.song_id}`)
//               .then(function (response) {
//                 trackInfo.image = response.data.songImage;
//                 trackInfo.song = response.data.songName;
//               })
//               .catch(function (error) {
//                 // console.log('ERROR GETTING IMAGE AND SONG NAME', error);
//                 console.log('ERROR GETTING IMAGE AND SONG NAME');
//                 trackInfo.image = 'https://teamstructureshopping.s3.amazonaws.com/icons/error.png';
//                 trackInfo.song = `SongTitle ${trackInfo.song_id}`;
//               })
//               .then(function () {
//                 axios.get(`localhost:2000/artistBio/${trackInfo.song_id}`)
//                   .then(function (response) {
//                     trackInfo.band = response.data.data.bandName;
//                   })
//                   .catch(function (error) {
//                     // console.log('ERROR GETTING BAND NAME', error);
//                     console.log('ERROR GETTING BAND NAME');
//                     trackInfo.band = `BandName ${trackInfo.song_id}`;
//                   })
//                   .then(function () {
//                     relatedInfo.push(trackInfo);
//                     if (relatedInfo.length === data.related.length) {
//                       res.send(relatedInfo);
//                     }
//                   })
//               })
//           }
//         })
//       }
//     }
//   })
// })

app.get('/relatedTracks/:song', (req, res) => {

  db.findTrack(req.params.song, (err, data) => {
    if (err) {
      console.log(chalk.red(`Problem obtaining track info`));
      res.status(500).send('There was a problem getting the track info');
    } else {
      let relatedInfo = [];
      if (data.related.length === 0) {
        res.send(relatedInfo);
      }
      for (let i = 0; i < data.related.length; i++) {
        let trackInfo = {};
        trackInfo.song_id = data.related[i];
        db.findTrack(data.related[i], (err, info) => {
          if (err) {
            // console.log(chalk.red(`Can't find secondary track info: `, err));
            console.log(chalk.red(`Can't find secondary track info`));
            res.status(500).send('Problem locating related track data');
          } else {
            trackInfo.plays = info.plays;
            trackInfo.likes = info.likes;
            trackInfo.reposts = info.reposts;
            trackInfo.image = 'https://teamstructureshopping.s3.amazonaws.com/icons/error.png';
            trackInfo.song = `SongTitle ${trackInfo.song_id}`;
            trackInfo.band = `BandName ${trackInfo.song_id}`;

            relatedInfo.push(trackInfo);
            if (relatedInfo.length === data.related.length) {
              res.send(relatedInfo);
            }
          }
        })
      }
    }
  })
})

app.put('/relatedTracks/:songId', (req, res) => {
  let id = req.params.songId
  let data = req.query;
  db.updateTrack(id, data, (err, track) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(track)
    }
  })
})

app.delete('/relatedTracks/:songId', (req, res) => {
  let id = req.params.songId
  db.deleteTrack(id, (err, track) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(track)
    }
  })
})

app.get('/:current', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
})

app.listen(port, () => {
  console.log(chalk.yellow(`Listening on port ${port}`));
})

module.exports = app;