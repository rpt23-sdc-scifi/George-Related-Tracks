const chalk = require('chalk');
const fs = require('fs');
const { dirname } = require('path');
const generateData = require('./generateData.js')


// async function seedByBatch(batchCount, recordsPerBatch) {
//   // 1,000 batches * 10,000 records/batch = 10 Million records
//   const grandTotal = batchCount * recordsPerBatch;
//   for (let i = 0; i < batchCount; i++) {
//     console.log('batch ', i)
//     await generateData.generateManyRecordPromises(recordsPerBatch, 10, grandTotal, i)
//       .then((records) => {
//         fs.writeFile(`${__dirname}/data/records${i}.json`, JSON.stringify(records), () => { });
//       })
//       .catch((err) => {
//         console.log(err)
//       });
//   }
// };

async function seedByBatch(batchCount, recordsPerBatch) {
  let writer1 = fs.createWriteStream(`${__dirname}/data/records1.json`);
  let writer2 = fs.createWriteStream(`${__dirname}/data/records2.json`);
  let writer3 = fs.createWriteStream(`${__dirname}/data/records3.json`);
  let writer = writer1;
  const grandTotal = batchCount * recordsPerBatch;
  for (let i = 1; i <= grandTotal; i++) {
    if (i >= 4000001 && i < 8000001) {
      writer = writer2
    }
    if (i >= 8000001) {
      writer = writer3
    }

    if (!writer.write('')) {
      await new Promise((resolve) => writer.once('drain', resolve));
    }

    if (i % 100000 === 0) {
      console.log(chalk.bgGreen(`JSON Seeding ${i / 100000}% Complete`));
    };

    await generateData.generateRecordPromise(i, 10, grandTotal)
      .then((record) => {
        let strings = JSON.stringify(record)
        if (i === 1 || i === 3999999 || i === 7999999) {
          strings = '[' + strings
        } else if (i === 4000000 || i === 8000000 || i === 10000000) {
          console.log('end stream');
          strings = ',' + strings + ']'
        } else {
          strings = ',' + strings
        }
        writer.write(strings)
      })
      .catch((err) => {
        throw err;
      });
  }
};

async function seed() {
  let batchCount = 10000;
  let recordsPerBatch = 1000;

  seedByBatch(batchCount, recordsPerBatch)
    .then(() => {
      console.log('succesfully seeded json')
    })
    .catch((err) => {
      throw err;
    })
}

seed();