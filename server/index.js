const express = require('express');
const path = require('path');
const chalk = require('chalk');
const axios = require('axios');
const db = require('../relatedData.js');
const app = express();

const port = 3001;

app.use(express.static(path.join(__dirname, '../public')));

app.get('/relatedTracks/:song', (req, res) => {
  // console.log(chalk.bgWhite.black(req.params.song));
  db.findTrack(req.params.song, (err, data) => {
    if (err) {
      console.log(chalk.red(`Problem obtaining track info: `, err));
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
          } else {
            trackInfo.plays = info.plays;
            trackInfo.likes = info.likes;
            trackInfo.reposts = info.reposts;
            axios.get(`http://localhost:1000/songdata/${trackInfo.song_id}`)
            .then(function (response) {
              trackInfo.image = response.data.songImage;
              trackInfo.song = response.data.songName;
            })
            .catch(function (error) {
              console.log('ERROR GETTING IMAGE AND SONG NAME', error);
              trackInfo.image = 'https://i1.sndcdn.com/avatars-000153260008-nj3jj1-t200x200.jpg';
              trackInfo.song = 'Last Chance';
            })
            .then (function() {
              axios.get(`http://localhost:2000/artistBio/${trackInfo.song_id}`)
                .then(function (response) {
                  trackInfo.band = response.data.data.bandName;
                })
                .catch(function (error) {
                  console.log('ERROR GETTING BAND NAME', error);
                  trackInfo.band = 'LionsBesideUs';
                })
                .then (function() {
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

app.get('/:current', (req, res) => {
  res.sendFile(path.join(__dirname,'../public/index.html'));
})

app.listen(port, () => {
  console.log(chalk.yellow(`Listening on port ${port}`));
})