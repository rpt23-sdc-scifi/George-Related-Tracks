const relatedData = require('./relatedData.js');
const chalk = require('chalk');
const generateData = require('./generateData.js')

const seedData = function (records) {
  console.log('seeding data');
  for (var record in records) {
    relatedData.saveTrack(records[record], (record) => {
      console.log(`saved record ${record}`)
    });
  }
}

const seedDatum = function (record) {
  console.log('seeding datum');
  relatedData.saveTrack(record, (record) => {
    console.log(`saved record ${record}`)
  });
}

relatedData.drop((err, result) => {
  if (err) {
    console.log(chalk.red(err));
  } else {
    console.log(chalk.blue(result));
  }
  generateData.generateRecords(100, 10, (datum) => {
    seedDatum(datum)
  })
})