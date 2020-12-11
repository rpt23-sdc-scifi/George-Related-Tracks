const chalk = require('chalk');
const { dirname } = require('path');
const streamToMongoDB = require('stream-to-mongo-db').streamToMongoDB;
const JSONStream = require('JSONStream');
const fs = require('fs');
const Multistream = require('multistream');

const relatedData = require('./relatedData.js');
const json1 = require(`${__dirname}/data/records1.json`);
const json2 = require(`${__dirname}/data/records2.json`);
const json3 = require(`${__dirname}/data/records3.json`);

const outputDBConfig = {
  dbURL: 'mongodb://localhost:27017/relatedTracks',
  collection: 'tracks',
  batchSize: 100
}
const writableStream = streamToMongoDB(outputDBConfig);
const streams = [
  fs.createReadStream(__dirname + '/data/records1.json'),
  fs.createReadStream(__dirname + '/data/records2.json'),
  fs.createReadStream(__dirname + '/data/records3.json')
]

function seedMongo() {
  console.log('called seedMongo; attempting db drop')
  // relatedData.drop((err) => {
  //   if (err) {
  //     console.log(chalk.red(err));
  //   } else {
  //     console.log(chalk.blue('dropped'));
  //   }
  new Multistream(streams)
    .pipe(JSONStream.parse('*'))
    .pipe(writableStream)
    .on('error', (err) => {
      console.log(err);
    })
  // })
}

seedMongo();