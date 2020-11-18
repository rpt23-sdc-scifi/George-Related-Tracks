const express = require('express');
const path = require('path');
const chalk = require('chalk');
const axios = require('axios');
const db = require('../relatedData.js');
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
  let data = req.data;
  db.saveTrack(data, (err, track) => {
    if (err) {
      res.status(400).end();
    } else {
      res.status(201).send(track)
    }
  })
})

app.get('/relatedTracks/:song', (req, res) => {
  // console.log(chalk.bgWhite.black(req.params.song));
  db.findTrack(req.params.song, (err, data) => {
    if (err) {
      console.log(chalk.red(`Problem obtaining track info: `, err));
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
            console.log(chalk.red(`Can't find secondary track info: `, err));
            res.status(500).send('Problem locating related track data');
          } else {
            trackInfo.plays = info.plays;
            trackInfo.likes = info.likes;
            trackInfo.reposts = info.reposts;
            axios.get(`localhost:3005/songdata/${trackInfo.song_id}`)
              .then(function (response) {
                trackInfo.image = response.data.songImage;
                trackInfo.song = response.data.songName;
              })
              .catch(function (error) {
                console.log('ERROR GETTING IMAGE AND SONG NAME', error);
                trackInfo.image = 'https://i1.sndcdn.com/avatars-000153260008-nj3jj1-t200x200.jpg';
                trackInfo.song = 'Last Chance';
              })
              .then(function () {
                axios.get(`localhost:2000/artistBio/${trackInfo.song_id}`)
                  .then(function (response) {
                    trackInfo.band = response.data.data.bandName;
                  })
                  .catch(function (error) {
                    console.log('ERROR GETTING BAND NAME', error);
                    trackInfo.band = 'LionsBesideUs';
                  })
                  .then(function () {
                    relatedInfo.push(trackInfo);
                    if (relatedInfo.length === data.related.length) {
                      res.send(relatedInfo);
                    }
                  })
              })
          }
        })
      }
    }
  })
})

app.put('/relatedTracks/:songId', (req, res) => {
  let data = req.data;
  db.updateTrack(data, (err, track) => {
    if (err) {
      res.status(400).end();
    } else {
      res.status(200).send(track)
    }
  })
})

app.delete('/relatedTracks/:songId', (req, res) => {
  db.deleteTrack(data, (err, track) => {
    if (err) {
      res.status(400).end();
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