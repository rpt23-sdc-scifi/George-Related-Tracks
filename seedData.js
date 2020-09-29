const relatedData = require('./relatedData.js');
const chalk = require('chalk');

let seedData = function() {
  let completed = 0;
  for (let i = 1; i <= 100; i++) {
    let id = i;
    relatedData.findTrack(id, (err, track) => {
      if (err) {
        console.log(chalk.red('No data: ', err));
        i += 100;
      } else {
        relatedData.deleteTrack(id, (err, track) => {
          if (err) {
            console.log(chalk.red('Problem deleting for seed data: ', err));
          } else {
            completed++;
            if (completed === 100) {
              let seeded = 0;
              for (let j = 1; j <= 100; j++) {
                let info = {song_id: j};
                info.plays = Math.floor(Math.random() * 11);
                info.likes = Math.floor(Math.random() * 11);
                info.reposts = Math.floor(Math.random() * 11);
                info.related = [];
                let similar = Math.floor(Math.random() * 4);
                for (let k = 1; k <= similar; k++) {
                  let num = Math.ceil(Math.random() * 100);
                  info.related.push(num);
                }
                relatedData.saveTrack(info, (err, data) => {
                  if (err) {
                    console.log(chalk.red('Problem seeding data: ', err));
                  } else {
                    seeded++;
                    console.log(chalk.blue(data));
                    if (seeded === 100) {
                      console.log(chalk.green('Seeding complete'));
                      return;
                    }
                  }
                })
              }
            }
          }
        })
      }
    })
  }
};

seedData();