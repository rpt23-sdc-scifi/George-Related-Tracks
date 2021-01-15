require('newrelic');
const express = require('express');
const path = require('path');
const chalk = require('chalk');
const axios = require('axios');
const expressStaticGzip = require('express-static-gzip');
const redis = require('redis');

const db = require('../database/relatedData.js');
const { getTraceMetadata } = require('newrelic');

const port = process.env.PORT || 3001;
const redis_port = process.env.REDIS_PORT || 6379

const redisClient = redis.createClient(redis_port)
const app = express();

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

function cache(req, res, next) {
  console.log(`checking cache for song ${req.params.song}`);
  redisClient.get(req.params.song, (error, cachedData) => {
    if (error) throw error;
    if (cachedData != null) {
      res.send(cachedData)
    } else {
      next();
    }
  });
}

app.get('/relatedTracks/:song', cache, (req, res) => {

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
              redisClient.setex(data.song_id, 3600, JSON.stringify(relatedInfo));
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

// app.get('/:current', (req, res) => {
//   let current = req.params.current;
//   console.log('current: ', current);
//   if (current === 'loaderio-5977e7bcffae4332f6012075686385b8') {
//     console.log('loader.io route');
//     res.sendFile(path.join(__dirname, '../public/loaderio-5977e7bcffae4332f6012075686385b8.txt'))
//   } else {
//     res.sendFile(path.join(__dirname, '../public/index.html'));
//   }
// })

app.get('/:current', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
})

app.listen(port, () => {
  console.log(chalk.yellow(`Listening on port ${port}`));
})

module.exports = app;