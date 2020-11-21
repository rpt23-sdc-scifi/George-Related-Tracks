const relatedData = require('./relatedData.js');
const chalk = require('chalk');
const generateData = require('./generateData.js')

// const seedData = function (records) {
//   console.log('seeding data');
//   for (var record in records) {
//     relatedData.saveTrack(records[record], (record) => {
//       console.log(`saved record ${record}`)
//     });
//   }
// }

// const seedDatum = function (record) {
//   // console.log('seeding datum');
//   relatedData.saveTrack(record, (record) => {
//     console.log(`saved record ${record}`)
//   });
// }

async function seedByBatch(batchCount, recordsPerBatch) {
  // 10,000 batches * 1,000 records/batch = 10 Million records
  for (let i = 0; i < batchCount; i++) {
    let recordBatch = generateData.generateManyRecords(recordsPerBatch, 10)

    await recordBatch
      .save()
      .then(success => {
        console.log('saved batch ', i)
      })
      .catch(err => {
        console.log(err)
      });
  }
};

const seed = function () {
  relatedData.drop((err, result) => {
    if (err) {
      console.log(chalk.red(err));
    } else {
      console.log(chalk.blue(result));
    }
    seedByBatch(10000, 1000)
  });
};

seed();