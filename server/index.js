const express = require('express');
const path = require('path');
const chalk = require('chalk');
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

app.listen(port, () => {
  console.log(chalk.yellow(`Listening on port ${port}`));
})